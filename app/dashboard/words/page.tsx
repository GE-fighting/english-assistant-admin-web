import React, { Suspense } from 'react';
import { WordList } from '@/components/word/WordList';
import Loading from './loading';

export default function WordsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">单词管理</h1>
      <Suspense fallback={<Loading />}>
        <WordList />
      </Suspense>
    </div>
  );
} 