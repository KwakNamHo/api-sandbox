import React from 'react'
import GithubProfile from '../../../components/GithubProfile'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* 소개 */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Project Overview</h1>
        <p className="text-gray-700 leading-relaxed">
          이번 프로젝트는 <strong>Next.js</strong>와{' '}
          <strong>Tailwind CSS</strong>를 기반으로 제작되었으며,
          <strong>GitHub API</strong>를 활용해 사용자 프로필 정보를 불러오고
          <br></br>공개 저장소 개수와 팔로워 수를 실시간으로 표시하도록
          구현했습니다.
          <br></br>
          아래에서 API 연동 결과와 주요 기술 스택, 그리고 팀 프로젝트 정보를
          확인할 수 있습니다.
        </p>
      </section>

      {/* My Projects */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-8">My Projects</h2>

        {/* 두 카드 동일 스타일을 위해 wrapper 통일 */}
        <div className="flex flex-col md:flex-row justify-center gap-12">
          {/* 왼쪽 GitHub 카드 */}
          <div className="w-full max-w-sm p-6 rounded-2xl border shadow-md bg-white dark:bg-neutral-900">
            <GithubProfile />
          </div>

          {/* 오른쪽 Score-URL 카드 */}
          <div className="w-full max-w-sm p-6 rounded-2xl border shadow-md bg-white dark:bg-neutral-900 text-center">
            <img
              src="/score-url-logo.png"
              alt="Score-URL Logo"
              className="w-full h-20 object-contain mx-auto mb-4 rounded-md"
            />

            <h2 className="text-xl font-semibold mb-2">
              Score-URL 팀 프로젝트
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              URL 보안 점수 분석 서비스. 다양한 보안 API(Google Safe Browsing,
              VirusTotal 등)를 연동하여 URL 위험도를 시각화하는 프로젝트입니다.
            </p>

            <div className="flex flex-col space-y-3">
              <Link
                href="https://score-url.vercel.app/"
                target="_blank"
                className="block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
              >
                Visit Website
              </Link>

              <Link
                href="https://github.com/KwakNamHo/score-url"
                target="_blank"
                className="block px-4 py-2 rounded border text-sm bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                GitHub Repository
              </Link>

              <Link
                href="https://github.com/KwakNamHo/score-url/tree/feature/frontend"
                target="_blank"
                className="block px-4 py-2 rounded border text-sm bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                My Branch (Frontend)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-8">Tech Stack</h2>

        <div className="flex justify-center gap-8 flex-wrap">
          <img src="/next.svg" className="w-12 h-12" />
          <img src="/tailwindcss.svg" className="w-12 h-12" />
          <img src="/api-icon.svg" className="w-12 h-12" />
        </div>
      </section>

      <footer className="mt-20 py-10 text-sm text-gray-500 text-center w-full">
        © 2025 API Sandbox — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  )
}
