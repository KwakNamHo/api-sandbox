'use client'

import { useState } from 'react'
import InputValidatorSection from './components/InputValidationSection'
import JsonValidatorSection from './components/JsonValidatorSection'
import PostRequestSection from './components/PostRequestSection'
import ErrorSimulatorSection from './components/ErrorSimulatorSection'
import JwtSection from './components/JwtSection'

export default function SandboxPage() {
  const [openId, setOpenId] = useState<number | null>(1)

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <main className="w-full max-w-3xl mx-auto flex flex-col gap-6 py-10">
      {/* 1번: 입력 검증 API */}
      <InputValidatorSection
        open={openId === 1}
        onToggle={() => handleToggle(1)}
      />

      {/* 2번: JSON 구조 검사기 */}
      <JsonValidatorSection
        open={openId === 2}
        onToggle={() => handleToggle(2)}
      />

      {/* 3번: POST 요청 테스트 */}
      <PostRequestSection
        open={openId === 3}
        onToggle={() => handleToggle(3)}
      />

      {/* 4번: 에러 시뮬레이터 */}
      <ErrorSimulatorSection
        open={openId === 4}
        onToggle={() => handleToggle(4)}
      />
      {/* 5번: 에러 시뮬레이터 */}
      <JwtSection open={openId === 5} onToggle={() => handleToggle(5)} />
    </main>
  )
}
