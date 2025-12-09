'use client'

import { useState } from 'react'
import JwtExamplePopup from './JwtExamplePopup'

type Props = {
  open: boolean
  onToggle: () => void
}

export default function JwtSection({ open, onToggle }: Props) {
  const [payload, setPayload] = useState('{"name": "Namho", "role": "admin"}')
  const [secret, setSecret] = useState('my-secret-key')
  const [token, setToken] = useState('')
  const [verifyToken, setVerifyToken] = useState('')
  const [verifySecret, setVerifySecret] = useState('')
  const [result, setResult] = useState<any>(null)

  const [showExample, setShowExample] = useState(false)

  const handleGenerate = async () => {
    const res = await fetch('/api/sandbox/jwt/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload, secret }),
    })

    const data = await res.json()
    setToken(data.token)
  }

  const handleVerify = async () => {
    const res = await fetch('/api/sandbox/jwt/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: verifyToken, secret: verifySecret }),
    })

    const data = await res.json()
    setResult(data)
  }

  return (
    <section
      onClick={onToggle}
      className="border rounded-xl shadow-sm bg-white dark:bg-neutral-900 p-6 cursor-pointer select-none hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
    >
      {/* 제목 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">JWT 토큰 생성 & 검증</h2>
          <p className="text-sm text-neutral-500 mt-1">
            HS256 알고리즘으로 JWT를 생성하고, 유효성을 검증합니다.
          </p>
        </div>

        <span className="text-lg px-2 py-1">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 border-t pt-4 relative"
        >
          {/* 예제 보기 버튼 */}
          <div className="flex justify-end mb-3">
            <button
              className="px-3 py-1 text-xs border rounded bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              onClick={() => setShowExample((prev) => !prev)}
            >
              예제 보기
            </button>
          </div>

          {showExample && (
            <JwtExamplePopup onClose={() => setShowExample(false)} />
          )}

          {/* JWT 생성 */}
          <h3 className="font-semibold mb-2 text-sm">JWT 생성</h3>
          <textarea
            className="w-full p-2 border rounded mb-3 bg-white dark:bg-neutral-800 h-24"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />

          <input
            type="text"
            className="w-full p-2 border rounded mb-3 bg-white dark:bg-neutral-800"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="secret key"
          />

          <button
            onClick={handleGenerate}
            className="px-4 py-2 mb-4 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            토큰 생성
          </button>

          {token && (
            <div className="p-3 rounded border bg-neutral-100 dark:bg-neutral-800 text-xs whitespace-pre-wrap select-text">
              <strong>Generated Token:</strong>
              <br />
              {token}
            </div>
          )}

          {/* JWT 검증 */}
          <h3 className="font-semibold mt-6 mb-2 text-sm">JWT 검증</h3>

          <textarea
            className="w-full p-2 border rounded mb-3 bg-white dark:bg-neutral-800 h-20"
            value={verifyToken}
            onChange={(e) => setVerifyToken(e.target.value)}
            placeholder="검증할 JWT 입력"
          />

          <input
            type="text"
            className="w-full p-2 border rounded mb-3 bg-white dark:bg-neutral-800"
            value={verifySecret}
            onChange={(e) => setVerifySecret(e.target.value)}
            placeholder="secret key"
          />

          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
          >
            검증하기
          </button>

          {/* ===== 결과 UI 개선된 형태 ===== */}
          {result && (
            <div className="mt-4 p-4 rounded-lg border bg-neutral-50 dark:bg-neutral-800">
              {/* valid true/false 표시 */}
              <div
                className={`mb-3 px-3 py-2 rounded text-sm font-semibold ${
                  result.valid
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}
              >
                {result.valid ? '검증 성공' : '검증 실패'}
              </div>

              {/* payload */}
              {result.payload && (
                <div className="mb-4">
                  <h4 className="font-semibold text-ms mb-1"> Payload</h4>
                  <pre className="p-3 rounded bg-neutral-900 text-neutral-200 text-ms whitespace-pre-wrap overflow-x-auto">
                    {JSON.stringify(result.payload, null, 2)}
                  </pre>
                </div>
              )}

              {/* Signature 비교 */}
              <h4 className="font-semibold text-ms mb-1"> Signature 비교</h4>
              <pre className="p-3 rounded bg-neutral-900 text-neutral-200 text-ms whitespace-pre-wrap overflow-x-auto">
                Expected: {result.expectedSignature}
                <br></br>
                Received: {result.receivedSignature}
              </pre>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
