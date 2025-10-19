'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const hideNavbar = pathname === '/' // ✅ 홈에서는 숨김

  if (hideNavbar) return null

  const links = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/project-details', label: 'Project Details' },
    { href: '/sandbox', label: 'Sandbox' },
  ]

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* 로고 */}
        <Link
          href="/"
          className="font-bold text-xl text-blue-600 hover:text-indigo-600 transition"
        >
          API Sandbox
        </Link>

        {/* 메뉴 */}
        <div className="flex space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition ${
                pathname === href
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
