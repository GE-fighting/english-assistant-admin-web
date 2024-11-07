'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { BookOpen, FolderPlus, BookText } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AddUnitModal } from '@/components/textbook/AddUnitModal';
import { TextbookAPI } from '@/utils/api/textbook';
import { Unit } from '@/types/textbook';

export default function TextbookDetailPage() {
  const params = useParams();
  const textbookId = Number(params.id);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUnits = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await TextbookAPI.getUnitList(textbookId);
      if (result.code === 200) {
        setUnits(result.data);
      }
    } catch (error) {
      toast.error('获取单元列表失败');
    } finally {
      setIsLoading(false);
    }
  }, [textbookId]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const handleUnitAddSuccess = () => {
    fetchUnits();
    setIsAddUnitModalOpen(false);
    toast.success('单元添加成功');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">教材详情</h1>
              <p className="text-sm text-gray-500">
                共 {units.length} 个单元
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setIsAddUnitModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            <FolderPlus className="w-5 h-5" />
            <span>添加单元</span>
          </Button>
        </div>

        {/* Units Grid */}
        {isLoading ? (
          <div className="grid place-items-center h-64">
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : units.length === 0 ? (
          <div className="grid place-items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <BookText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">暂无单元，点击添加单元</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <div 
                key={unit.id} 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all 
                           border border-gray-100 p-6 space-y-4 group cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {unit.name}
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    No. {unit.sequence_number}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <BookText className="w-4 h-4 text-blue-400" />
                    <span>{unit.word_count} 个单词</span>
                  </div>
                  <span>{new Date(unit.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <AddUnitModal
          isOpen={isAddUnitModalOpen}
          onClose={() => setIsAddUnitModalOpen(false)}
          textbookId={textbookId}
          onSuccess={handleUnitAddSuccess}
        />
      </div>
    </div>
  );
} 