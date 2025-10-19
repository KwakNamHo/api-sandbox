import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import MouseGlow from '../../components/MouseGlow'
import ConditionalNavbar from '../../components/ConditionalNavbar'

export const metadata: Metadata = {
  title: 'API Sandbox',
  description: 'Next.js + Tailwind CSS + API 실습 포트폴리오',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <MouseGlow />
        <ConditionalNavbar />{' '}
        {/* ✅ Navbar 노출 조건은 클라이언트 컴포넌트에서 */}
        {children}
      </body>
    </html>
  )
}
