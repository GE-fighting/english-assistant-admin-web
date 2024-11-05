import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/textbooks" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              教材管理
            </Link>
          </li>
          <li>
            <Link 
              href="/words" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              单词管理
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
} 