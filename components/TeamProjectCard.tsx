'use client'

import Link from 'next/link'

export default function TeamProjectCard() {
  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-2xl border shadow-md bg-white dark:bg-neutral-900 text-center">
      <img
        src="/project-icon.svg"
        alt="Project Icon"
        className="w-20 h-20 mx-auto mb-4 opacity-90"
      />

      <h2 className="text-xl font-semibold mb-1">Score-URL 프로젝트</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        URL 보안 점수 분석 서비스. 다양한 보안 API 연동하여 URL 위험도를
        시각적으로 분석합니다.
      </p>

      <Link
        href="/projects/score-url"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
      >
        Visit Project
      </Link>
    </div>
  )
}
