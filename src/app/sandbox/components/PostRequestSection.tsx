'use client'

import { useState } from 'react'

type Props = {
  open: boolean
  onToggle: () => void
}

export default function PostRequestSection({ open, onToggle }: Props) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showExamples, setShowExamples] = useState(false)
  const [showRaw, setShowRaw] = useState(false)

  const handleSend = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    const start = performance.now()

    try {
      const res = await fetch('/api/sandbox/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: input,
      })

      const time = Math.round(performance.now() - start)

      let json: any = null
      try {
        json = await res.json()
      } catch {
        json = null
      }

      setResult({
        ok: res.ok,
        status: res.status,
        time,
        json,
        raw: json ? JSON.stringify(json, null, 2) : '(no body)',
      })
    } catch (err: any) {
      setError(err.message || '요청 중 오류 발생')
    }

    setLoading(false)
  }

  return (
    <section
      onClick={onToggle}
      className="border rounded-xl shadow-sm bg-white dark:bg-neutral-900 p-6 cursor-pointer select-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
    >
      {/* 제목 영역 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">POST 요청 테스트</h2>
          <p className="text-sm text-neutral-500 mt-1">
            입력 데이터를 서버로 전송하고 서버 응답을 확인합니다.
          </p>
        </div>
        <span className="text-lg px-2">{open ? '▲' : '▼'}</span>
      </div>

      {/* 펼쳐진 영역 */}
      {open && (
        <div
          className="mt-4 border-t pt-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 라벨 + 예제 보기 */}
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">POST 요청 실습</h4>

            <button
              onClick={() => setShowExamples(!showExamples)}
              className="px-3 py-1 text-xs rounded border bg-white dark:bg-neutral-900 hover:bg-neutral-50"
            >
              예제 보기
            </button>
          </div>

          {/* 예제 팝업 */}
          {showExamples && (
            <div className="absolute right-0 top-9 z-20 w-96 max-h-64 overflow-y-auto border rounded bg-white dark:bg-neutral-900 p-3 shadow-lg text-sm">
              <div className="mb-2 text-[11px] text-neutral-500">
                POST 요청에 사용할 JSON 예시입니다.
              </div>

              <pre className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded text-xs whitespace-pre-wrap">
                {`{
  "name": "Namho",
  "age": 25,
  "message": "Hello!"
}`}
              </pre>

              <div className="font-medium mt-3 mb-1 text-sm">주의사항</div>
              <ul className="text-xs ml-4 list-disc space-y-1 text-neutral-600 dark:text-neutral-400">
                <li>POST body는 JSON 또는 일반 텍스트 모두 전송 가능합니다.</li>
                <li>
                  JSON을 보낼 때는 Content-Type: application/json 헤더가
                  필요합니다.
                </li>
              </ul>
            </div>
          )}

          {/* 입력창 */}
          <textarea
            className="w-full p-2 border rounded bg-white dark:bg-neutral-800 h-32 mb-3"
            placeholder="POST 요청에 포함할 JSON 또는 텍스트 입력"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* 버튼 */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? '전송 중...' : '전송하기'}
          </button>

          {/* 에러 출력 */}
          {error && (
            <div className="mt-4 p-4 border rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm">
              <strong>요청 실패</strong>
              <div>{error}</div>
            </div>
          )}

          {/* 응답 출력 */}
          {result && (
            <div className="mt-6 space-y-4">
              {/* 요청 요약 */}
              <div className="p-4 border rounded bg-neutral-50 dark:bg-neutral-800 text-sm">
                <h4 className="font-semibold mb-2">📤 보낸 요청</h4>

                <div>
                  <strong>Method:</strong> POST
                </div>
                <div>
                  <strong>URL:</strong> /api/sandbox/post
                </div>

                <div className="mt-2 font-semibold">Body:</div>
                <pre className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-xs whitespace-pre-wrap">
                  {input || '(empty)'}
                </pre>
              </div>

              {/* 응답 요약 */}
              <div className="p-4 border rounded bg-green-50 dark:bg-green-900 text-sm">
                <h4 className="font-semibold mb-2">📥 서버 응답</h4>
                <div>
                  <strong>Status:</strong> {result.status}
                </div>
                <div>
                  <strong>Response Time:</strong> {result.time}ms
                </div>
              </div>

              {/* 응답 Body */}
              <div className="p-4 border rounded bg-neutral-50 dark:bg-neutral-800 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">응답 Body</h4>

                  <button
                    onClick={() => setShowRaw(!showRaw)}
                    className="px-2 py-1 text-xs rounded border bg-white dark:bg-neutral-700 hover:bg-neutral-100"
                  >
                    {showRaw ? 'Pretty 보기' : 'Raw 보기'}
                  </button>
                </div>

                {showRaw ? (
                  <pre className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-xs whitespace-pre-wrap">
                    {result.raw}
                  </pre>
                ) : (
                  <pre className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded text-xs whitespace-pre-wrap">
                    {JSON.stringify(result.json, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
