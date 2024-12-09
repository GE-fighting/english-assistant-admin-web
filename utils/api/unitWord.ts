import { API_CONFIG } from './config';

import { UnitWord } from '@/types/word';
import { ApiResponse } from '@/types/response';

export const UnitWordAPI = {
  async getWordsByUnit(unitId: number): Promise<ApiResponse<UnitWord[]>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/unit/words`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ unit_id: unitId })
    });
    return response.json();
  },

  async createWord(word:string, unit_id:number): Promise<ApiResponse<UnitWord>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/unit/createWord`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ word, unit_id })
    });
    return response.json();
  },

  async deleteWord(id: number): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/unit/deleteWord`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ id })
    });
    return response.json();
  }
}
