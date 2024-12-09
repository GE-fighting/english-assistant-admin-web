'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  Book,
  GraduationCap,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const sidebarItems = [
  {
    title: '仪表盘',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: '教材管理',
    icon: BookOpen,
    defaultHref: '/dashboard/textbooks/manage', // 默认跳转路径
    items: [
      {
        title: '教材列表',
        href: '/dashboard/textbooks/manage',
        icon: Book
      },
      {
        title: '教材单词',
        href: '/dashboard/textbooks/words',
        icon: GraduationCap
      }
    ]
  },
  {
    title: '词典管理',
    href: '/dashboard/words',
    icon: Book
  },
  {
    title: '试卷管理',
    href: '/dashboard/papers',
    icon: Book
  },
  {
    title: '系统设置',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string, defaultHref?: string) => {
    if (defaultHref) {
      router.push(defaultHref);
    }
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isExpanded = (title: string) => expandedItems.includes(title);

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold">英语教学助手</h1>
      </div>
      <nav className="px-4 space-y-2">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            {item.items ? (
              <div className="space-y-2">
                <button
                  onClick={() => toggleExpand(item.title, item.defaultHref)}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-2 rounded-lg",
                    pathname.startsWith('/dashboard/textbooks')
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.title}</span>
                  </div>
                  {isExpanded(item.title) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {isExpanded(item.title) && (
                  <div className="ml-4 space-y-1">
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={cn(
                          "flex items-center px-2 py-2 text-sm rounded-lg",
                          pathname === subItem.href
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <subItem.icon className="w-4 h-4 mr-3" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-2 py-2 rounded-lg",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
} 