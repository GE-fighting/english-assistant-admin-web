'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  BookText, 
  Volume2, 
  Edit, 
  Trash2, 
  ArrowLeft,
  LayoutGrid,
  List
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { UnitWord } from '@/types/word';
import { UnitWordAPI } from '@/api';
import { AddWordModal } from '@/components/textbook/AddWordModal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WordManagePage() {
  const router = useRouter();
  const params = useParams();
  const unitId = Number(params.id);
  const [words, setWords] = useState<UnitWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const fetchWords = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await UnitWordAPI.getWordsByUnit(unitId);
      if (result.code === 200) {
        setWords(result.data);
      }
    } catch {
      toast.error('获取单词列表失败');
    } finally {
      setIsLoading(false);
    }
  }, [unitId]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const handleDeleteWord = async (wordId: number) => {
    const toastId = toast.loading('正在删除单词...');

    try {
      const result = await UnitWordAPI.deleteWord(wordId);
      if (result.code === 200) {
        toast.dismiss(toastId);
        toast.success('单词已成功删除！');
        fetchWords();
      } else {
        toast.dismiss(toastId);
        toast.error('删除失败: ' + result.message);
      }
    } catch {
      toast.dismiss(toastId);
      toast.error('删除单词失败，请稍后重试');
    }
  };

  const playPronunciation = (url: string) => {
    if (!url) {
      toast.error('暂无发音音频');
      return;
    }

    const audio = new Audio(url);
    audio.play().catch(() => {
      toast.error('播放发音失败，请稍后重试');
    });
  };

  const TableView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">单词</TableHead>
            <TableHead>美式音标</TableHead>
            <TableHead>英式音标</TableHead>
            <TableHead>添加时间</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word) => (
            <TableRow key={word.word_id}>
              <TableCell className="font-medium">{word.word}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{word.phonetic_us}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => playPronunciation(word.pronunciation_us)}
                  >
                    <Volume2 className="h-4 w-4 text-indigo-400" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{word.phonetic_uk}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => playPronunciation(word.pronunciation_uk)}
                  >
                    <Volume2 className="h-4 w-4 text-blue-400" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{new Date(word.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      // 编辑逻辑
                    }}
                  >
                    <Edit className="h-4 w-4 text-green-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeleteWord(word.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {words.map((word) => (
        <div 
          key={word.word_id} 
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all 
                     border border-gray-100 p-6 space-y-4 group"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {word.word}
            </h2>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => playPronunciation(word.pronunciation_us)}
                title="美式发音"
              >
                <Volume2 className="w-5 h-5 text-indigo-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => playPronunciation(word.pronunciation_uk)}
                title="英式发音"
              >
                <Volume2 className="w-5 h-5 text-blue-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  // 编辑逻辑
                }}
              >
                <Edit className="w-5 h-5 text-green-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDeleteWord(word.id)}
              >
                <Trash2 className="w-5 h-5 text-red-400" />
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">美式音标</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-indigo-600">{word.phonetic_us}</span>
                <Volume2 
                  className="w-4 h-4 text-indigo-400 cursor-pointer" 
                  onClick={() => playPronunciation(word.pronunciation_us)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">英式音标</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-blue-600">{word.phonetic_uk}</span>
                <Volume2 
                  className="w-4 h-4 text-blue-400 cursor-pointer" 
                  onClick={() => playPronunciation(word.pronunciation_uk)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-500">添加时间</span>
              <span className="text-gray-600">
                {new Date(word.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <BookText className="w-10 h-10 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">单词管理</h1>
              <p className="text-sm text-gray-500">
                共 {words.length} 个单词
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'card' | 'table')}>
              <TabsList className="grid w-24 grid-cols-2">
                <TabsTrigger value="card" className="p-2">
                  <LayoutGrid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="table" className="p-2">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <AddWordModal unitId={unitId} onSuccess={fetchWords} />
          </div>
        </div>

        {isLoading ? (
          <div className="grid place-items-center h-64">
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : words.length === 0 ? (
          <div className="grid place-items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <BookText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">暂无单词，点击&quot;添加单词&quot;按钮添加单词</p>
            </div>
          </div>
        ) : viewMode === 'card' ? (
          <CardView />
        ) : (
          <TableView />
        )}
      </div>
    </div>
  );
} 