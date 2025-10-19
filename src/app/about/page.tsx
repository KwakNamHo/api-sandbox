'use client'

import React, { useEffect, useState } from 'react'

interface Quote {
  content: string
  author: string
}

export default function AboutPage() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)

  // ✅ 한글 인용구 API (korean-advice-open-api)
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(
          'https://korean-advice-open-api.vercel.app/api/advice',
          { cache: 'no-store' }
        )
        if (!res.ok) throw new Error('API Error')
        const data = await res.json()
        setQuote({
          content: data.message,
          author: '익명의 조언가',
        })
      } catch (err) {
        console.error('Quote API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuote()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* 1️⃣ 기본 정보 */}
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">기본 정보</h2>
          <p>
            <strong>이름:</strong> 곽남호
          </p>
          <p>
            <strong>전공:</strong> 정보보호학과 2학년
          </p>
          <p>
            <strong>전화번호:</strong> 010-7454-3904
          </p>
          <p>
            <strong>목표:</strong> 고민중
          </p>
        </div>

        {/* 2️⃣ 학습 철학 */}
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">학습 철학</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            저는 새로운 기술을 배우는 데 있어{' '}
            <strong>직접 만들어보며 이해하는 것</strong>을 중요하게 생각합니다.
            단순히 코드를 따라 치는 것이 아니라,{' '}
            <strong>“왜 이렇게 동작하는가”</strong>를 고민하며 학습하는 것을
            좋아합니다.
          </p>
        </div>

        {/* 3️⃣ 관심 분야 */}
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">관심 분야</h2>
          <div className="flex flex-wrap gap-2">
            {['보안', '웹 개발', '자동화'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 4️⃣ 오늘의 인용구 (한글) */}
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition text-center">
          <h2 className="text-xl font-semibold mb-3">오늘의 인용구</h2>
          {loading ? (
            <p className="text-gray-500">인용구를 불러오는 중...</p>
          ) : quote ? (
            <>
              <p className="italic text-gray-700 mb-2">{quote.content}</p>
              <p className="text-gray-500 text-sm"> {quote.author}</p>
            </>
          ) : (
            <p className="text-red-500 text-sm">
              인용구를 불러오지 못했습니다.
            </p>
          )}
        </div>
      </div>

      <footer className="mt-20 py-10 text-sm text-gray-500 text-center">
        © 2025 Namho Kwak — Information Security Major
      </footer>
    </main>
  )
}
