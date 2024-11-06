'use client';

import React from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">系统设置</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={() => alert('设置已保存')}
        >
          <Save className="w-4 h-4" />
          保存设置
        </button>
      </div>

      <div className="grid gap-6">
        {/* 个人资料设置 */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">个人资料</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="请输入用户名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="请输入邮箱"
              />
            </div>
          </div>
        </section>

        {/* 系统偏好设置 */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">系统偏好</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>开启邮件通知</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                默认语言
              </label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="zh">中文</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                每页显示数量
              </label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 