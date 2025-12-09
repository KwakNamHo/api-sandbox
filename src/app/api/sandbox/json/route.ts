import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text } = await req.json()

  let explanations: string[] = []
  let fixedJson: string | null = null

  try {
    // 정상 파싱 → 정상 JSON
    const parsed = JSON.parse(text)
    return NextResponse.json({
      valid: true,
      pretty: JSON.stringify(parsed, null, 2),
      explanations: [],
      fixedJson: null,
    })
  } catch (err: any) {
    const message = err.message || ''

    //----------------------------------------------------
    // 1) KEY 오류 분석
    //----------------------------------------------------
    const keyRegex = /"([^"]*)"(?=\s*:)/g
    const rawKeys = [...text.matchAll(keyRegex)].map((m) => m[1])

    // invalid key: 영문자·숫자·_·- 외의 문자가 포함된 경우
    rawKeys.forEach((key) => {
      if (!/^[a-zA-Z0-9_\-]+$/.test(key)) {
        explanations.push(
          `Key "${key}" 에 허용되지 않는 문자가 포함되었습니다. key는 영문, 숫자, 밑줄(_), 대시(-)만 사용할 수 있습니다.`
        )
      }
    })

    //----------------------------------------------------
    // 2) VALUE 오류 분석
    //----------------------------------------------------
    // value 패턴 잡기 (완벽하진 않아도 대부분 잡힘)
    const valueRegex = /:\s*([^,\}\]]+)/g
    const rawValues = [...text.matchAll(valueRegex)].map((m) => m[1].trim())

    rawValues.forEach((value) => {
      // 숫자, 문자열(""), true, false, null 외는 오류
      if (
        !/^".*"$/.test(value) && // 문자열 ""
        !/^[0-9]+$/.test(value) && // 숫자
        !/^(true|false|null)$/.test(value) // true, false, null
      ) {
        explanations.push(
          `Value "${value}" 가 JSON 규칙에 맞지 않습니다. 문자열은 반드시 "문자열" 형태여야 하며, 숫자/true/false/null 만 허용됩니다.`
        )
      }
    })

    //----------------------------------------------------
    // 3) 쉼표 누락 오류
    //----------------------------------------------------
    if (
      message.includes('Unexpected string') ||
      message.includes('Unexpected number') ||
      message.includes("Expecting ','")
    ) {
      explanations.push(
        `속성과 속성 사이에 쉼표(,)가 누락된 것으로 보입니다. 각 key-value 뒤에는 반드시 쉼표가 필요합니다.`
      )
    }

    //----------------------------------------------------
    // 4) 따옴표 오류
    //----------------------------------------------------
    if (message.includes('Unexpected token') && text.includes("'")) {
      explanations.push(
        `JSON에서는 문자열을 반드시 쌍따옴표(")로 작성해야 합니다. 단일따옴표(')는 허용되지 않습니다.`
      )
    }

    //----------------------------------------------------
    // 5) 닫는 괄호 오류
    //----------------------------------------------------
    if (message.includes('Unexpected end of JSON input')) {
      explanations.push(
        `닫는 중괄호(}) 또는 대괄호(])가 누락되었습니다. 모든 { } 와 [ ] 는 반드시 짝이 맞아야 합니다.`
      )
    }

    //----------------------------------------------------
    // 6) 마지막 쉼표 오류
    //----------------------------------------------------
    if (text.match(/,\s*}/) || text.match(/,\s*]/)) {
      explanations.push(
        `마지막 속성 뒤에 있는 쉼표(,)는 JSON에서 허용되지 않습니다.`
      )
    }

    //----------------------------------------------------
    // 7) 자동 수정 시도 (key / value 가 정상일 때만)
    //----------------------------------------------------
    const hasInvalidKey = explanations.some((msg) => msg.includes('Key'))
    const hasInvalidValue = explanations.some((msg) => msg.includes('Value'))

    if (!hasInvalidKey && !hasInvalidValue) {
      try {
        const safe = text
          .replace(/(\w+)\s*:/g, '"$1":') // key 자동 쌍따옴표 보정
          .replace(/'/g, '"') // 단일 따옴표 → 쌍따옴표
          .replace(/,(\s*[}\]])/g, '$1') // 마지막 쉼표 제거
          .replace(/}\s*$/, '}') // 여분 공백 제거
          .replace(/]\s*$/, ']')

        const fixedParsed = JSON.parse(safe)
        fixedJson = JSON.stringify(fixedParsed, null, 2)
      } catch {
        fixedJson = null
      }
    } else {
      // 비정상 key/value 있으면 자동 수정 X
      fixedJson = null
    }

    //----------------------------------------------------
    // 최종 응답
    //----------------------------------------------------
    return NextResponse.json({
      valid: false,
      error: `JSON 문법 오류: ${message}`,
      explanations,
      fixedJson,
    })
  }
}
