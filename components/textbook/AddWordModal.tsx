'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { toast } from 'sonner';
import { UnitWordAPI } from '@/api';
import { PlusCircle, Loader2 } from 'lucide-react';

interface AddWordModalProps {
  unitId: number;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

interface BatchProgress {
  total: number;
  current: number;
  success: number;
  failed: number;
  processing: string;
  failedWords: Map<string, string>;
}

export function AddWordModal({ unitId, trigger, onSuccess }: AddWordModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState('');
  const [batchWords, setBatchWords] = useState('');
  const [batchProgress, setBatchProgress] = useState<BatchProgress | null>(null);

  const handleSingleSubmit = async () => {
    if (!word?.trim()) {
      toast.error('请输入单词');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('正在添加单词...');

    try {
      const result = await UnitWordAPI.createWord(word, unitId);
      if (result.code === 200) {
        toast.dismiss(toastId);
        toast.success('单词添加成功！');
        setIsOpen(false);
        setWord('');
        onSuccess?.();
      } else {
        toast.dismiss(toastId);
        toast.error('添加失败: ' + result.message);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error('添加单词失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchSubmit = async () => {
    const lines = batchWords.split('\n');
    const wordsWithIndices = lines
      .map((line, index) => ({ 
        word: line.trim(), 
        index 
      }))
      .filter(({ word }) => word.length > 0);

    if (wordsWithIndices.length === 0) {
      toast.error('请输入要添加的单词');
      return;
    }

    setLoading(true);
    let successCount = 0;
    let failedCount = 0;
    const failedWords = new Map<string, string>();

    setBatchProgress({
      total: wordsWithIndices.length,
      current: 0,
      success: 0,
      failed: 0,
      processing: '',
      failedWords: new Map(),
    });

    try {
      for (const { word } of wordsWithIndices) {
        setBatchProgress(prev => ({
          ...prev!,
          processing: word,
        }));

        try {
          const response = await UnitWordAPI.createWord(word, unitId);
          if (response.code === 200) {
            successCount++;
          } else {
            failedCount++;
            failedWords.set(word, response.message || '添加失败');
          }
        } catch {
          failedCount++;
          failedWords.set(word, '网络错误，请检查网络连接');
        }
        
        setBatchProgress(prev => ({
          ...prev!,
          current: prev!.current + 1,
          success: successCount,
          failed: failedCount,
          failedWords: failedWords,
        }));
      }

      if (failedCount === 0) {
        toast.success(`成功添加 ${successCount} 个单词！`);
      } else {
        toast.error(`添加完成，${successCount} 个成功，${failedCount} 个失败`);
      }
    } catch {
      toast.error('批量添加过程中发生错误');
    } finally {
      setBatchWords('');
      onSuccess?.();
      setLoading(false);
      setBatchProgress(prev => ({
        ...prev!,
        processing: '',
      }));
    }
  };

  const defaultTrigger = (
    <Button 
      className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600"
      onClick={() => setIsOpen(true)}
    >
      <PlusCircle className="w-5 h-5" />
      <span>添加单词</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl 
                               sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
            添加新单词
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="single" disabled={loading} 
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              单个添加
            </TabsTrigger>
            <TabsTrigger value="batch" disabled={loading}
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              批量添加
            </TabsTrigger>
          </TabsList>
          <TabsContent value="single" className="space-y-6">
            <div className="space-y-2">
              <Input 
                placeholder="请输入单词..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="text-lg px-4 py-6 border-2 border-gray-200 focus:border-indigo-500 
                         rounded-xl transition-all duration-200 placeholder:text-gray-400
                         focus:ring-2 focus:ring-indigo-200"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSingleSubmit();
                  }
                }}
                disabled={loading}
              />
              <p className="text-sm text-gray-500 pl-2">
                按回车键快速添加
              </p>
            </div>
            <Button 
              onClick={handleSingleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 
                       hover:from-indigo-600 hover:to-indigo-700 text-white py-6 
                       rounded-xl text-lg font-medium transition-all duration-200
                       shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? '添加中...' : '添加'}
            </Button>
          </TabsContent>
          <TabsContent value="batch" className="space-y-6">
            <div className="space-y-4">
              <Textarea 
                placeholder="请输入要批量添加的单词，每行一个..."
                value={batchWords}
                onChange={(e) => setBatchWords(e.target.value)}
                className="min-h-[200px] text-lg px-4 py-3 border-2 border-gray-200 
                         focus:border-indigo-500 rounded-xl transition-all duration-200 
                         placeholder:text-gray-400 resize-none focus:ring-2 
                         focus:ring-indigo-200 font-mono"
                disabled={loading}
              />
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>每行输入一个单词</span>
                {batchProgress && (
                  <span className="text-indigo-600 font-medium">
                    已处理: {batchProgress.current}/{batchProgress.total}
                  </span>
                )}
              </div>
            </div>
            {batchProgress && (
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <div className="space-y-2">
                  <Progress 
                    value={(batchProgress.current / batchProgress.total) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between items-center text-sm">
                    <div className="space-x-3">
                      <span className="text-green-600 font-medium">成功: {batchProgress.success}</span>
                      {batchProgress.failed > 0 && (
                        <span className="text-red-600 font-medium">失败: {batchProgress.failed}</span>
                      )}
                    </div>
                    <span className="text-indigo-600 font-medium">
                      {Math.round((batchProgress.current / batchProgress.total) * 100)}%
                    </span>
                  </div>
                </div>
                {batchProgress.processing && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>正在处理: {batchProgress.processing}</span>
                  </div>
                )}
                {batchProgress.failed > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      <p className="text-sm font-medium text-gray-700">添加失败的单词：</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 max-h-[120px] overflow-y-auto space-y-1">
                      {Array.from(batchProgress.failedWords.entries()).map(([word, errorMessage]) => (
                        <div
                          key={word}
                          className="text-sm py-1.5 px-2 flex items-center justify-between bg-red-50 rounded"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-red-500 font-medium">{word}</span>
                          </div>
                          <span className="text-gray-500 text-xs">
                            {errorMessage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <Button 
              onClick={handleBatchSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 
                       hover:from-indigo-600 hover:to-indigo-700 text-white py-6 
                       rounded-xl text-lg font-medium transition-all duration-200
                       shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? '添加中...' : '批量添加'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 