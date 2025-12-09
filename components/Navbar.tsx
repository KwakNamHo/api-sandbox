'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const links = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/sandbox', label: 'Sandbox' },
    { href: '/project-details', label: 'Project Details' },
  ]

  return (
    <nav
      className={`w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 
        transition-all duration-300 
        ${isHome ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* 로고 */}
        <Link
          href="/"
          className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition"
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
