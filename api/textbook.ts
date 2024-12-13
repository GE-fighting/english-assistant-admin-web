import { API_CONFIG } from './config';
import {  
  Version, 
  Grade, 
  Semester, 
  Textbook,
  CreateTextbookParams,
  Unit,
  TextbookDetail
} from '@/types/textbook';
import { ApiResponse } from '@/types/response';

export const TextbookAPI = {
  async getVersions(): Promise<ApiResponse<Version[]>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook-version/list`, {
      headers: API_CONFIG.headers,
    });
    return response.json();
  },

  async addVersion(name: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook-version/create`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({name}),
    });
    return response.json();
  },

  async deleteVersion(id: number): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook-version/delete`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ id }),
    });
    return response.json();
  },

  async updateVersion(id: number, name: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook-version/update`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ id, name }),
    });
    return response.json();
  },

  async getGrades(): Promise<ApiResponse<Grade[]>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/grade/list`, {
      headers: API_CONFIG.headers,
    });
    return response.json();
  },

  async getSemesters(): Promise<ApiResponse<Semester[]>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/semester/list`, {
      headers: API_CONFIG.headers,
    });
    return response.json();
  },

  async createTextbook(data: CreateTextbookParams): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook/create`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getTextbookList(): Promise<ApiResponse<Textbook[]>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook/list`, {
      headers: API_CONFIG.headers,
    });
    return response.json();
  },

  async getTextbookDetail(id: number): Promise<ApiResponse<TextbookDetail>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook/detail`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ id }),
    });
    return response.json();
  },

  async deleteTextbook(id: number): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/textbook/delete`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ id }),
    });
    return response.json();
  },

  async createUnit(data: Unit): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/unit/create`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getUnitList(textbookId: number): Promise<ApiResponse<Unit[]>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/unit/list`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ textbook_id: textbookId }),
    });
    return response.json();
  },

  async deleteUnit(id: number): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/unit/delete`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({ id }),
    });
    return response.json();
  },
};
