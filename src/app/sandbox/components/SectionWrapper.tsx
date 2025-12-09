'use client'

import PostRequestSection from './PostRequestSection'

interface Props {
  id: number
  title: string
  desc: string
  openId: number | null
  toggle: (id: number) => void
  children: React.ReactNode
}

export default function SectionWrapper({
  id,
  title,
  desc,
  openId,
  toggle,
  children,
}: Props) {
  const open = openId === id

  return (
    <section
      onClick={() => toggle(id)}
      className="border rounded-xl shadow-sm bg-white dark:bg-neutral-900 p-6 cursor-pointer select-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
    >
      {/* 제목 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-neutral-500 mt-1">{desc}</p>
        </div>
        <span className="text-lg px-2 py-1">{open ? '▲' : '▼'}</span>
      </div>

      {/* 내용 */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 border-t pt-4 relative text-neutral-700 dark:text-neutral-300"
        >
          {children}
        </div>
      )}
    </section>
  )
}
