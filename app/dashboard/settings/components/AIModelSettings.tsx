'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { ModelProvider } from '@/types/setting';
import { SettingAPI } from '@/api/setting';

export function AIModelSettings() {
  const [providers, setProviders] = useState<ModelProvider[]>([]);
  const [selectedProviderId, setSelectedProviderId] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 获取服务商列表
  const fetchProviders = async () => {
    try {
      setIsLoading(true);
      const response = await SettingAPI.getModelProviders();
      if (response.code === 200) {
        setProviders(response.data);
        
        // 如果有激活的提供商，选择第一个
        const activeProvider = response.data.find(p => p.is_active);
        if (activeProvider) {
          setSelectedProviderId(activeProvider.provider_id);
        }
      }
    } catch {
      toast.error('获取服务商列表失败');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleSave = async () => {
    if (!selectedProviderId) {
      toast.error('请选择要使用的 AI 模型服务商');
      return;
    }

    // 获取选中的服务商信息
    const selectedProvider = providers.find(p => p.provider_id === selectedProviderId);
    if (!selectedProvider?.provider_name) {
      toast.error('服务商信息不完整');
      return;
    }

    try {
      setIsSaving(true);
      const response = await SettingAPI.setModelProvider(selectedProvider.provider_name);
      
      if (response.code === 200) {
        toast.success('AI 模型设置已保存');
        // 刷新服务商列表
        await fetchProviders();
      } else {
        toast.error(response.message || '保存失败');
      }
    } catch {
      toast.error('保存设置失败，请稍后重试');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleProvider = (providerId: number) => {
    setProviders(prev => 
      prev.map(provider => 
        provider.provider_id === providerId 
          ? { ...provider, is_active: !provider.is_active }
          : provider
      )
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">AI 模型设置</h2>
        <Button
          onClick={handleSave}
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              保存中...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              保存设置
            </>
          )}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        {/* 当前使用的模型 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">当前使用的模型</h3>
          <div className="grid grid-cols-2 gap-4">
            {providers.map((provider) => (
              <div
                key={provider.provider_id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedProviderId === provider.provider_id
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedProviderId(provider.provider_id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium">{provider.provider_name}</h4>
                    {provider.model_types && (
                      <p className="text-sm text-gray-500 mt-1">
                        支持的模型类型: {provider.model_types}
                      </p>
                    )}
                  </div>
                  {selectedProviderId === provider.provider_id && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 服务商配置 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">服务商配置</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              添加服务商
            </Button>
          </div>
          
          <div className="space-y-4">
            {providers.map((provider) => (
              <div
                key={provider.provider_id}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-medium">{provider.provider_name}</h4>
                    {provider.model_types && (
                      <p className="text-sm text-gray-500 mt-1">
                        支持的模型类型: {provider.model_types}
                      </p>
                    )}
                  </div>
                  <Switch 
                    checked={provider.is_active}
                    onCheckedChange={() => handleToggleProvider(provider.provider_id!)}
                  />
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>API 基础地址</Label>
                    <Input 
                      value={provider.api_base_url || ''} 
                      placeholder="请输入 API 基础地址"
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  {provider.api_key_required && (
                    <div className="space-y-2">
                      <Label>API 密钥</Label>
                      <Input 
                        type="password"
                        placeholder="请输入 API 密钥"
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 