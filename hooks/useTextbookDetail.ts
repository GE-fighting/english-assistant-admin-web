import { useState, useEffect } from 'react';
import { TextbookAPI } from '@/utils/api/textbook';
import { TextbookDetail } from '@/types/textbook';
import { toast } from 'sonner';

export const useTextbookDetail = (id: string) => {
  const [textbook, setTextbook] = useState<TextbookDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTextbookDetail = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const textbookId = Number(id);
        if (isNaN(textbookId)) {
          throw new Error('无效的教材ID');
        }

        const response = await TextbookAPI.getTextbookDetail(textbookId);
        
        if (response.code === 200 && response.data) {
          setTextbook(response.data);
        } else {
          throw new Error(response.message || '获取教材详情失败');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '获取教材详情失败';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTextbookDetail();
  }, [id]);

  return { textbook, isLoading, error };
}; 