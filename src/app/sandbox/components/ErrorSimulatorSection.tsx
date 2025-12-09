'use client'

import { useState } from 'react'

type Props = {
  open: boolean
  onToggle: () => void
}

const ERROR_CODES = [
  { code: 400, label: 'Bad Request', color: 'bg-yellow-200' },
  { code: 401, label: 'Unauthorized', color: 'bg-orange-200' },
  { code: 403, label: 'Forbidden', color: 'bg-orange-300' },
  { code: 404, label: 'Not Found', color: 'bg-yellow-300' },
  { code: 409, label: 'Conflict', color: 'bg-yellow-400' },
  { code: 418, label: "I'm a Teapot", color: 'bg-purple-200' },
  { code: 422, label: 'Unprocessable Entity', color: 'bg-yellow-200' },
  { code: 429, label: 'Too Many Requests', color: 'bg-red-200' },
  { code: 500, label: 'Internal Server Error', color: 'bg-red-300' },
  { code: 503, label: 'Service Unavailable', color: 'bg-red-400' },
]

export default function ErrorSimulatorSection({ open, onToggle }: Props) {
  const [selectedCode, setSelectedCode] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [responseTime, setResponseTime] = useState<number | null>(null)

  const handleRequest = async (code: number) => {
    setSelectedCode(code)
    setLoading(true)
    setResponse(null)

    const start = performance.now()
    const res = await fetch(`/api/sandbox/errors/${code}`)
    const result = await res.json()
    const end = performance.now()

    setResponse(result)
    setResponseTime(Math.round(end - start))
    setLoading(false)
  }

  return (
    <section
      onClick={onToggle}
      className="border rounded-xl shadow-sm bg-white dark:bg-neutral-900 p-6 cursor-pointer select-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">에러 응답 시뮬레이터</h2>
        <span className="text-lg px-2">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div
          className="mt-4 border-t pt-4 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 버튼 목록 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ERROR_CODES.map(({ code, label, color }) => (
              <button
                key={code}
                onClick={() => handleRequest(code)}
                className={`
                  p-3 rounded-md border shadow-sm text-sm font-medium
                  transition-all duration-150 
                  hover:scale-105 active:scale-95 
                  ${color}
                  ${selectedCode === code ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                {code} {label}
              </button>
            ))}
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="flex justify-center py-6">
              <div className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* 응답 결과 */}
          {response && !loading && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 shadow-inner animate-fadeIn">
              <div className="mb-2 text-ms text-neutral-600 dark:text-neutral-300">
                <strong>Status:</strong> {selectedCode}
                <br />
                <strong>Response Time:</strong> {responseTime}ms
              </div>

              <pre className="mt-2 p-3 bg-black/80 text-green-300 rounded-lg text-ms overflow-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
