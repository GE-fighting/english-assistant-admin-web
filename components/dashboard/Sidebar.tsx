'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Book, BookOpen, Settings, Home } from 'lucide-react';

export const Sidebar: FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          English Assistant
        </h1>
      </div>
      
      <nav className="space-y-2">
        <NavItem href="/dashboard" icon={<Home />} label="Dashboard" />
        <NavItem href="/dashboard/textbooks" icon={<Book />} label="Textbooks" />
        <NavItem href="/dashboard/words" icon={<BookOpen />} label="Words" />
        <NavItem href="/dashboard/settings" icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  );
};

const NavItem: FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-600">{icon}</span>
        <span className="text-gray-700 font-medium">{label}</span>
      </motion.div>
    </Link>
  );
}; 