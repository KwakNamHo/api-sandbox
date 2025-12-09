'use client'

import { useState } from 'react'

type Props = {
  open: boolean
  onToggle: () => void
}

/* JSON 예제 (팝업용) */
const jsonExamples = {
  valid: `{
  "name": "Namho",
  "age": 25,
  "isStudent": true,
  "skills": ["JS", "Next.js", "Security"]
}`,
  invalid: [
    {
      title: 'Key에 따옴표 없음',
      example: `{name: "Namho", age: 25}`,
      reason: `JSON에서는 key도 반드시 "key" 형태로 작성해야 합니다.`,
    },
    {
      title: '쉼표 누락',
      example: `{
  "name": "Namho"
  "age": 25
}`,
      reason: `속성 간에는 반드시 쉼표가 필요합니다.`,
    },
    {
      title: '문자열 따옴표 오류',
      example: `{
  "message": 'hello'
}`,
      reason: `JSON에서는 문자열에 반드시 쌍따옴표(")를 사용해야 합니다.`,
    },
    {
      title: '닫는 괄호 누락',
      example: `{
  "user": {
    "name": "Namho",
    "age": 25`,
      reason: `모든 { } 괄호는 반드시 짝이 맞아야 합니다.`,
    },
  ],
}

export default function JsonValidatorSection({ open, onToggle }: Props) {
  const [jsonInput, setJsonInput] = useState('')
  const [jsonResult, setJsonResult] = useState<any>(null)
  const [showJsonExamples, setShowJsonExamples] = useState(false)

  const handleJsonCheck = async () => {
    const res = await fetch('/api/sandbox/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: jsonInput }),
    })
    const data = await res.json()
    setJsonResult(data)
  }

  return (
    <section
      onClick={onToggle}
      className="border rounded-xl shadow-sm bg-white dark:bg-neutral-900 p-6 cursor-pointer select-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
    >
      {/* 카드 제목 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">JSON 구조 검사기</h2>
          <p className="text-sm text-neutral-500 mt-1">
            JSON 문법 오류 분석 및 자동 수정 제안 기능을 제공합니다.
          </p>
        </div>
        <span className="text-lg px-2 py-1">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="mt-4 border-t pt-4 relative text-neutral-700 dark:text-neutral-300">
          {/* 상단 라벨 + 예제 버튼 */}
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-sm">JSON 검사 실습</h4>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowJsonExamples((prev) => !prev)
              }}
              className="px-3 py-1 text-xs rounded border bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              예제 보기
            </button>
          </div>

          {/* 예제 팝업 */}
          {showJsonExamples && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-9 z-10 w-96 max-h-64 overflow-y-auto border rounded bg-white dark:bg-neutral-900 shadow-lg p-3 text-sm"
            >
              <div className="mb-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                올바른 JSON 예시와 오류 사례입니다.
              </div>

              <div className="mb-4">
                <div className="font-medium text-base mb-1">
                  올바른 JSON 예시
                </div>
                <pre className="text-xs bg-neutral-100 dark:bg-neutral-800 rounded p-2 whitespace-pre-wrap">
                  {jsonExamples.valid}
                </pre>
              </div>

              <div className="font-medium text-sm mb-2">자주 발생하는 오류</div>
              {jsonExamples.invalid.map((item, idx) => (
                <div key={idx} className="mb-3">
                  <div className="font-semibold text-xs mb-1">
                    • {item.title}
                  </div>
                  <pre className="text-xs bg-neutral-100 dark:bg-neutral-800 rounded p-2 whitespace-pre-wrap mb-1">
                    {item.example}
                  </pre>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {item.reason}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 아래 영역: 클릭 방지 */}
          <div onClick={(e) => e.stopPropagation()}>
            {/* 입력창 */}
            <textarea
              className="w-full p-2 border rounded mb-3 bg-white dark:bg-neutral-800 h-32"
              placeholder="검사할 JSON 문자열을 입력하세요..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />

            {/* 검사 결과 */}
            {jsonResult && (
              <div className="mt-4 space-y-4">
                {/* 기존 JSON 결과 원본 출력 (그대로 둠) */}
                <pre className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded whitespace-pre-wrap text-sm">
                  {JSON.stringify(jsonResult, null, 2)}
                </pre>

                {/* 성공 결과 UI (추가된 부분) */}
                {jsonResult.valid && (
                  <div className="p-4 rounded border bg-green-50 dark:bg-green-900 text-ms">
                    <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                      JSON 구조가 올바릅니다
                    </h4>

                    <pre className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded text-ms whitespace-pre-wrap">
                      {jsonResult.pretty}
                    </pre>
                  </div>
                )}

                {/* 오류 설명 */}
                {jsonResult.explanations &&
                  jsonResult.explanations.length > 0 && (
                    <div className="p-4 rounded border bg-red-50 dark:bg-red-950 text-sm">
                      <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">
                        오류 설명
                      </h4>
                      <ul className="list-disc ml-5 space-y-1">
                        {jsonResult.explanations.map(
                          (msg: string, idx: number) => (
                            <li key={idx}>{msg}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* 자동 수정 결과 */}
                {jsonResult.fixedJson && !jsonResult.valid && (
                  <div className="p-4 rounded border bg-green-50 dark:bg-green-900 text-sm">
                    <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                      자동 수정된 JSON (예상)
                    </h4>
                    <pre className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded whitespace-pre-wrap text-xs">
                      {jsonResult.fixedJson}
                    </pre>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleJsonCheck}
              className="mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              검사하기
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
