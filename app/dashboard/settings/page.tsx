'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalProfile } from './components/PersonalProfile';
import { SystemPreferences } from './components/SystemPreferences';
import { AIModelSettings } from './components/AIModelSettings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">系统设置</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-11">
          <TabsTrigger value="profile" className="text-sm">个人资料</TabsTrigger>
          <TabsTrigger value="preferences" className="text-sm">系统偏好</TabsTrigger>
          <TabsTrigger value="ai" className="text-sm">AI 模型设置</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <PersonalProfile />
        </TabsContent>

        <TabsContent value="preferences">
          <SystemPreferences />
        </TabsContent>

        <TabsContent value="ai">
          <AIModelSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
} 