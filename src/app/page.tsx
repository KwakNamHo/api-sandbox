import React from 'react'

export default function HomePage() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen text-center 
                 bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-900 px-6"
    >
      {/* Hero Section */}
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-6 
                   bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600"
      >
        API Sandbox
      </h1>

      <p className="text-lg text-gray-700 max-w-xl leading-relaxed mb-4">
        이번 학기 배운 <strong>Next.js</strong>와 <strong>Tailwind CSS</strong>
        를 기반으로 한<strong> API 실습용 포트폴리오</strong> 사이트입니다.
      </p>
      <p className="text-gray-600 mb-12">
        아래 섹션에서 프로젝트 세부 내용과 학습 결과를 확인할 수 있습니다.
      </p>

      {/* 메인 버튼 (About으로 이동) */}
      <a
        href="/projects"
        className="px-7 py-3 rounded-xl bg-blue-600 text-white shadow-md 
                   hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mb-20"
      >
        Learn More Project
      </a>

      {/* 3 Cards Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-8">Explore the Pages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1 - About */}
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">About</h3>
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              나와 전공, 그리고 웹 개발과 보안에 대한 관심을 소개하는
              페이지입니다.
            </p>
            <a
              href="/about"
              className="text-blue-600 font-medium hover:underline"
            >
              Go to About →
            </a>
          </div>

          {/* Card 2 - Project Details */}
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Project Details
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              이 페이지에서는 이번 프로젝트 제작에 사용된 <strong>API</strong>와
              <strong>JavaScript 함수 구조</strong>를 구체적으로 설명합니다.
            </p>
            <a
              href="/projects"
              className="text-blue-600 font-medium hover:underline"
            >
              View Details →
            </a>
          </div>

          {/* Card 3 - Sandbox */}
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              API Sandbox
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              기말 프로젝트로 완성할 API 보안 실험 페이지입니다. 인증, 입력
              검증, 에러 처리 등의 기능을 다룰 예정입니다.
            </p>
            <a
              href="/sandbox"
              className="text-blue-600 font-medium hover:underline"
            >
              Preview →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-6 text-sm text-gray-500">
        © 2025 API Sandbox — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  )
}
