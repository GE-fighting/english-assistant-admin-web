'use client';

import { useState, useEffect } from 'react';
import TextbookList from '@/components/textbook/TextbookList';
import { TextbookDetailDrawer } from '@/components/textbook/TextbookDetailDrawer';
import { TextbookAPI } from '@/utils/api/textbook';
import { Textbook } from '@/types/textbook';
import { toast } from 'sonner';

export default function TextbooksPage() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [selectedTextbookId, setSelectedTextbookId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const response = await TextbookAPI.getTextbookList();
        if (response.code === 200) {
          setTextbooks(response.data);
        } else {
          toast.error(response.message || '获取教材列表失败');
        }
      } catch (error) {
        toast.error('获取教材列表失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTextbooks();
  }, []);

  const handleTextbookClick = (textbookId: number) => {
    setSelectedTextbookId(textbookId);
  };

  const handleCloseDrawer = () => {
    setSelectedTextbookId(null);
  };

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="p-6">
      <TextbookList 
        textbooks={textbooks} 
        onTextbookClick={handleTextbookClick} 
      />
      
      <TextbookDetailDrawer
        textbookId={selectedTextbookId}
        isOpen={selectedTextbookId !== null}
        onClose={handleCloseDrawer}
      />
    </div>
  );
} 