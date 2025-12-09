import React from 'react'
import GithubProfile from '../../../components/GithubProfile'

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      {/*소개*/}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Project Overview</h1>
        <p className="text-gray-700 leading-relaxed">
          이번 프로젝트는 <strong>Next.js</strong>와{' '}
          <strong>Tailwind CSS</strong>를 기반으로 제작되었으며,
          <strong>GitHub API</strong>를 활용해 사용자 프로필 정보를 불러오고,
          공개 저장소 개수와 팔로워 수를 실시간으로 표시하도록 구현했습니다.
          아래에서 API 연동 결과와 주요 기술 스택을 확인할 수 있습니다.
        </p>
      </section>

      {/*git 프로필*/}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-6"> My GitHub Profiles</h2>
      </section>
      <GithubProfile />

      {/*사용 기술*/}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-8">Tech Stack</h2>

        <div className="flex justify-center gap-8 flex-wrap">
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 hover:scale-110 transition-transform duration-300"
          >
            <img src="/next.svg" alt="Next.js" className="w-12 h-12" />
            <span className="text-gray-700 font-medium">Next.js</span>
          </a>

          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 hover:scale-110 transition-transform duration-300"
          >
            <img
              src="/tailwindcss.svg"
              alt="Tailwind CSS"
              className="w-12 h-12"
            />
            <span className="text-gray-700 font-medium">Tailwind CSS</span>
          </a>
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 hover:scale-110 transition-transform duration-300"
          >
            <img src="/api-icon.svg" alt="API" className="w-12 h-12" />
            <span className="text-gray-700 font-medium">API</span>
          </a>
        </div>
      </section>
      <footer className="mt-20 py-10 text-sm text-gray-500 text-center w-full">
        © 2025 API Sandbox — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  )
}
