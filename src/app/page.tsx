'use client'

import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen text-center 
                     bg-gray-50 text-gray-900 px-6"
    >
      {/* Hero Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
        API Sandbox
      </h1>

      <p className="text-lg text-gray-700 max-w-xl leading-relaxed mb-3">
        이번 학기 학습 내용을 기반으로 제작한
        <strong className="font-semibold text-gray-900">
          {' '}
          웹 개발 & 보안 실습용 프로젝트
        </strong>
        입니다.
      </p>

      <p className="text-gray-600 mb-12 text-sm md:text-base">
        API 요청 처리, 입력 검증, JWT, JSON 분석 등 API를 사용하여 핵심 기능을
        구현한 포트폴리오 사이트 입니다.
      </p>

      {/* 메인 버튼 */}
      <Link
        href="/projects"
        className="px-7 py-3 rounded-xl bg-gray-900 text-white text-sm md:text-base
                   shadow-sm hover:bg-gray-800 transition-all duration-200 mb-20"
      >
        View Projects
      </Link>

      {/* 3 Cards Section */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">
          Explore the Pages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card: About */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">About</h3>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              개발자 소개와 전공, 그리고 웹·보안 분야에 대한 관심을 담은
              페이지입니다.
            </p>
            <Link
              href="/about"
              className="text-blue-600 font-medium hover:underline"
            >
              Go to About →
            </Link>
          </div>

          {/* Card: Project Details */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Project Details
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              프로젝트 제작에 사용된 <strong>API</strong> 구조와
              <strong> 핵심 기능 구현 방식</strong>을 설명합니다.
            </p>
            <Link
              href="/project-details"
              className="text-blue-600 font-medium hover:underline"
            >
              View Details →
            </Link>
          </div>

          {/* Card: Sandbox */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              API Sandbox
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              직접 API 요청을 보내보고, JWT·JSON 검사·에러 응답 처리 등을 실습할
              수 있습니다.
            </p>
            <Link
              href="/sandbox"
              className="text-blue-600 font-medium hover:underline"
            >
              Preview →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 text-sm text-gray-500">
        © 2025 API Sandbox — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  )
}
