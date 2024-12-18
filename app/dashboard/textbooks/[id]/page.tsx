'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookOpen, FolderPlus, BookText, ArrowLeft, Plus, List, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AddUnitModal } from '@/components/textbook/AddUnitModal';
import { TextbookAPI } from '@/api';
import { Unit } from '@/types/textbook';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { UnitWordAPI } from '@/api';

export default function TextbookDetailPage() {
  const router = useRouter();
  const params = useParams();
  const textbookId = Number(params.id);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unitToDelete, setUnitToDelete] = useState<number | null>(null);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<{ word?: string }>({});
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  const fetchUnits = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await TextbookAPI.getUnitList(textbookId);
      if (result.code === 200) {
        setUnits(result.data);
      }
    } catch {
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

  const handleGoBack = () => {
    router.push('/dashboard/textbooks')//
  };

  const handleUnitClick = (unitId: number) => {
    router.push(`/dashboard/textbooks/${unitId}/words`);
  };

  const handleDeleteUnit = async (unitId: number) => {
    try {
      const result = await TextbookAPI.deleteUnit(unitId);
      if (result.code === 200) {
        toast.success('单元删除成功');
        fetchUnits();
      }
    } catch {
      toast.error('删除单元失败');
    }
  };

  const handleAddWord = async () => {
    if (!currentWord.word?.trim()) {
      toast.error('请输入单词');
      return;
    }

    const toastId = toast.loading('正在添加单词...');

    try {
      const result = await UnitWordAPI.createWord(currentWord.word || '', selectedUnitId || 0);
      if (result.code === 200) {
        toast.dismiss(toastId);
        toast.success('单词添加成功！');
        fetchUnits();
        setIsAddWordModalOpen(false);
        setCurrentWord({});
      } else {
        toast.dismiss(toastId);
        toast.error('添加失败: ' + result.message);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error('添加单词失败，请稍后重试');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleGoBack}
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
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
                           border border-gray-100 p-6 space-y-4 group relative"
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

                {/* New Action Buttons */}
                <div className="flex justify-center gap-3 pt-4 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => handleUnitClick(unit.id)}
                  >
                    <List className="w-4 h-4 mr-2" />
                    单词列表
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:bg-green-50 hover:text-green-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddWordModalOpen(true);
                      setSelectedUnitId(unit.id);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    添加单词
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUnitToDelete(unit.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除单元
                  </Button>
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

        {/* Simplified Delete Confirmation Dialog */}
        <AlertDialog open={!!unitToDelete} onOpenChange={() => setUnitToDelete(null)}>
          <AlertDialogContent className="max-w-[400px]">
            <AlertDialogHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <AlertDialogTitle>删除单元</AlertDialogTitle>
              </div>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                <span className="font-medium text-gray-900">
                  {units.find(u => u.id === unitToDelete)?.name}
                </span>
                <span className="text-gray-500 ml-2">
                  ({units.find(u => u.id === unitToDelete)?.word_count} 个单词)
                </span>
              </div>
              <AlertDialogDescription className="mt-3 text-gray-600">
                删除后将无法恢复单元内的所有数据，是否确认删除？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="hover:bg-gray-100">
                取消
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                  if (unitToDelete) {
                    handleDeleteUnit(unitToDelete);
                    setUnitToDelete(null);
                  }
                }}
              >
                删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog 
          open={isAddWordModalOpen} 
          onOpenChange={setIsAddWordModalOpen}
        >
          <DialogContent className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
                添加新单词
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Input 
                  placeholder="请输入单词..."
                  value={currentWord.word || ''}
                  onChange={(e) => setCurrentWord({
                    ...currentWord, 
                    word: e.target.value
                  })}
                  className="text-lg px-4 py-6 border-2 border-gray-200 focus:border-indigo-500 
                             rounded-xl transition-all duration-200 placeholder:text-gray-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddWord();
                    }
                  }}
                />
                <p className="text-sm text-gray-500 pl-2">
                  按回车键快速添加
                </p>
              </div>
              <Button 
                onClick={handleAddWord}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 
                         hover:from-indigo-600 hover:to-indigo-700 text-white py-6 
                         rounded-xl text-lg font-medium transition-all duration-200
                         shadow-md hover:shadow-lg"
              >
                添加
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 