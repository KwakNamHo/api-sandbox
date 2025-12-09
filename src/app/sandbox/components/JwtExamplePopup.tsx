'use client'

import { jwtExamples } from '../data/jwtExamples'

type Props = {
  onClose: () => void
}

export default function JwtExamplePopup({ onClose }: Props) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-10 z-20 w-96 max-h-[500px] overflow-y-auto 
                 bg-white dark:bg-neutral-900 border rounded shadow-lg p-4 text-ms"
    >
      <h3 className="font-semibold mb-2">JWT 예제 및 설명</h3>

      <p className="text-sm text-neutral-500 mb-3 whitespace-pre-wrap">
        {jwtExamples.explanation}
      </p>

      <div className="mb-3">
        <strong className="text-ms">Header 예시</strong>
        <pre className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded text-xs whitespace-pre-wrap">
          {jwtExamples.header}
        </pre>
      </div>

      <div className="mb-3">
        <strong className="text-xs">Payload 예시</strong>
        <pre className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded text-xs whitespace-pre-wrap">
          {jwtExamples.payload}
        </pre>
      </div>

      <div className="mb-3">
        <strong className="text-ms">Secret Key 예시</strong>
        <pre className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded text-xs whitespace-pre-wrap">
          {jwtExamples.secret}
        </pre>
      </div>

      <div className="mb-3">
        <strong className="text-ms">JWT 토큰 예시</strong>
        <pre className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded text-xs whitespace-pre-wrap break-all">
          {jwtExamples.sampleToken}
        </pre>
      </div>

      <button
        onClick={onClose}
        className="mt-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-ms"
      >
        닫기
      </button>
    </div>
  )
}
