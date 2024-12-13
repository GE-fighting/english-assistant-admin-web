export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://115.120.238.73:7789',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
