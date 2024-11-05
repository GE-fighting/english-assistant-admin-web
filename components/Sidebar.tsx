'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { href: '/textbooks', label: 'Textbooks' },
  { href: '/words', label: 'Words' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <div className="text-xl font-bold mb-8">Admin Dashboard</div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block p-2 rounded hover:bg-gray-700 ${
              pathname.includes(item.href) ? 'bg-gray-700' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
} 