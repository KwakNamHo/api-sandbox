'use client'

import React, { useEffect, useState } from 'react'

interface Quote {
  content: string
  author: string
}

// 팀원 데이터 (컴포넌트 바깥에 선언)
const teamMembers = [
  {
    name: '오소망',
    major: '정보보호학전공',
    studentId: '92307234',
    github: 'https://github.com/Oh-Somang',
    portfolio: 'https://somang-homepage.vercel.app/',
  },
  {
    name: '김민석',
    major: '정보보호학전공',
    studentId: '92113530',
    github: 'https://github.com/ms020704',
    portfolio: 'https://next-js-portfolio-2-teal.vercel.app/',
  },
  {
    name: '박성준',
    major: '정보보호학전공',
    studentId: '91913440',
    github: 'https://github.com/cark753',
    portfolio: 'https://cark753portfolio.vercel.app/',
  },
]

export default function AboutPage() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)

  // 팀 슬라이드 인덱스
  const [current, setCurrent] = useState(0)

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

  // 현재 팀원
  const member = teamMembers[current]

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
            <strong>목표:</strong>
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

        {/* 3️⃣ 팀원 소개 (슬라이드, 카드 안에 추가 박스 없음) */}
        <div className="relative p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition text-center overflow-hidden">
          <h2 className="text-xl font-semibold mb-4">팀원 소개</h2>

          <div className="space-y-1 text-mss text-gray-700 text-center">
            <p>
              <strong>이름:</strong> {member.name}
            </p>
            <p>
              <strong>학과:</strong> {member.major}
            </p>
            <p>
              <strong>학번:</strong> {member.studentId}
            </p>
            <p>
              <strong>GitHub:</strong>{' '}
              <a
                href={member.github}
                target="_blank"
                className="text-blue-600 underline break-all"
              >
                {member.github}
              </a>
            </p>
            <p>
              <strong>포트폴리오:</strong>{' '}
              <a
                href={member.portfolio}
                target="_blank"
                className="text-blue-600 underline break-all"
              >
                {member.portfolio}
              </a>
            </p>
          </div>

          {/* 좌우 화살표 (카드 양 옆, 카드 안에 박스 X) */}
          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === 0 ? teamMembers.length - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 
                       text-gray-700 rounded-full w-9 h-9 flex items-center justify-center shadow"
          >
            ←
          </button>

          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === teamMembers.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 
                       text-gray-700 rounded-full w-9 h-9 flex items-center justify-center shadow"
          >
            →
          </button>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-4">
            {teamMembers.map((_, idx) => (
              <div
                key={idx}
                className={`w-2.5 h-2.5 rounded-full ${
                  idx === current ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* 4️⃣ 오늘의 인용구 (한글) */}
        <div
          className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition 
     flex flex-col items-center justify-center text-center h-full"
        >
          <h2 className="text-xl font-semibold mb-3">오늘의 인용구</h2>
          {loading ? (
            <p className="text-gray-500">인용구를 불러오는 중...</p>
          ) : quote ? (
            <>
              <p className="italic tSext-gray-700 mb-2">{quote.content}</p>
              <p className="text-gray-500 text-sm">{quote.author}</p>
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
