import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  let raw = ''
  try {
    raw = await req.text() // 🔥 JSON이든 문자열이든 안전하게 받는 방식
  } catch {
    return NextResponse.json(
      { success: false, error: '요청 Body를 읽을 수 없습니다.' },
      { status: 400 }
    )
  }

  let parsedJson: any = null
  let isJson = false

  // JSON 파싱 시도
  try {
    parsedJson = JSON.parse(raw)
    isJson = true
  } catch {
    isJson = false
  }

  return NextResponse.json({
    success: true,
    isJson,
    raw,
    parsedJson,
  })
}
