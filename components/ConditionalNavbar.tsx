'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) return null

  return (
    <>
      <Navbar />
      {/* ✅ Navbar가 있을 때만 여백 추가 */}
      <div className="h-16" />
    </>
  )
}
