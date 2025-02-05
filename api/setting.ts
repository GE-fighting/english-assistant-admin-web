import { API_CONFIG } from './config';
import { ModelProvider } from '@/types/setting';
import { ApiResponse } from '@/types/response';

export const SettingAPI = {
    // 获取模型提供商列表
    async getModelProviders(): Promise<ApiResponse<ModelProvider[]>> {
        const response = await fetch(`${API_CONFIG.baseURL}/api/model/list`,
            {
                headers: API_CONFIG.headers,
            }
        );
        return response.json();
    },

    //设置要使用模型服务商
    async setModelProvider(name: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_CONFIG.baseURL}/api/system/model`, {
            method: 'POST',
            headers: API_CONFIG.headers,
            body: JSON.stringify({ name }),
        });
        return response.json();
    }
}