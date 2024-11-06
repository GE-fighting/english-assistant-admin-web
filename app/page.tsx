'use client';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">欢迎使用英语学习助手</h1>
        <a 
          href="/dashboard" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          进入管理系统
        </a>
      </div>
    </div>
  );
} 