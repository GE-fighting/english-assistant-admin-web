'use client';

import React from 'react';
import { Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

export function SystemPreferences() {
  const handleSave = () => {
    toast.success('系统偏好已保存');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">系统偏好</h2>
        <Button
          onClick={handleSave}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          保存设置
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between max-w-md">
            <Label>开启邮件通知</Label>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label>默认语言</Label>
            <Select defaultValue="zh">
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder="选择默认语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>每页显示数量</Label>
            <Select defaultValue="20">
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder="选择每页显示数量" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
} 