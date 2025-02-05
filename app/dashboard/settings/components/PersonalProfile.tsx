'use client';

import React from 'react';
import { Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

export function PersonalProfile() {
  const handleSave = () => {
    toast.success('个人资料已保存');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">个人资料</h2>
        <Button
          onClick={handleSave}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          保存资料
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>用户名</Label>
            <Input
              placeholder="请输入用户名"
              className="max-w-md"
            />
          </div>
          <div className="space-y-2">
            <Label>邮箱</Label>
            <Input
              type="email"
              placeholder="请输入邮箱"
              className="max-w-md"
            />
          </div>
          <div className="space-y-2">
            <Label>手机号码</Label>
            <Input
              type="tel"
              placeholder="请输入手机号码"
              className="max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 