'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  BookText, 
  PlusCircle, 
  Volume2, 
  Edit, 
  Trash2, 
  ArrowLeft 
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { WordAPI } from '@/utils/api/word';
import { Word } from '@/types/word';

export default function WordManagePage() {
  const router = useRouter();
  const params = useParams();
  const unitId = Number(params.id);
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<Partial<Word>>({});

  const fetchWords = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await WordAPI.getWordsByUnit(unitId);
      if (result.code === 200) {
        setWords(result.data);
      }
    } catch (error) {
      toast.error('获取单词列表失败');
    } finally {
      setIsLoading(false);
    }
  }, [unitId]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const handleAddWord = async () => {
    try {
      const result = await WordAPI.createWord({
        ...currentWord,
        unit_id: unitId
      });
      if (result.code === 200) {
        toast.success('单词添加成功');
        fetchWords();
        setIsAddWordModalOpen(false);
        setCurrentWord({});
      }
    } catch (error) {
      toast.error('添加单词失败');
    }
  };

  const handleDeleteWord = async (wordId: number) => {
    try {
      const result = await WordAPI.deleteWord(wordId);
      if (result.code === 200) {
        toast.success('单词删除成功');
        fetchWords();
      }
    } catch (error) {
      toast.error('删除单词失败');
    }
  };

  const playPronunciation = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

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
          <Dialog 
            open={isAddWordModalOpen} 
            onOpenChange={setIsAddWordModalOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600">
                <PlusCircle className="w-5 h-5" />
                <span>添加单词</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新单词</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  placeholder="单词" 
                  value={currentWord.word || ''}
                  onChange={(e) => setCurrentWord({
                    ...currentWord, 
                    word: e.target.value
                  })}
                />
                <Input 
                  placeholder="美式音标" 
                  value={currentWord.phonetic_us || ''}
                  onChange={(e) => setCurrentWord({
                    ...currentWord, 
                    phonetic_us: e.target.value
                  })}
                />
                <Button onClick={handleAddWord}>确认添加</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid place-items-center h-64">
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : words.length === 0 ? (
          <div className="grid place-items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <BookText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">暂无单词，点击添加单词</p>
            </div>
          </div>
        ) : (
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
                    >
                      <Volume2 className="w-5 h-5 text-indigo-400" />
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
                      onClick={() => handleDeleteWord(word.word_id)}
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>美式音标</span>
                    <span className="font-medium">{word.phonetic_us}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>添加时间</span>
                    <span>
                      {new Date(word.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 