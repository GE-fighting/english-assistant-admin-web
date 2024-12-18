'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Word } from '@/types/word';

interface WordListProps {
  textbookId: number;
}

// 模拟数据
const mockWords: Word[] = [
  {
    word_id: '1',
    word: 'apple',
    phonetic_us: '/ˈæp.əl/',
    phonetic_uk: '/ˈæp.əl/',
    meaning: 'n. 苹果',
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z',
    pronunciation_us: '/ˈæp.əl/',
    pronunciation_uk: '/ˈæp.əl/',
    example: 'I like apples.',
  },
  {
    word_id: '2',
    word: 'banana',
    phonetic_us: '/bəˈnɑː.nə/',
    phonetic_uk: '/bəˈnɑː.nə/',
    meaning: 'n. 香蕉',
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z',
    pronunciation_us: '/bəˈnɑː.nə/',
    pronunciation_uk: '/bəˈnɑː.nə/',
    example: 'I like bananas.',
  },
  {
    word_id: '3',
    word: 'orange',
    phonetic_uk: '/ˈɒr.ɪndʒ/',
    phonetic_us: '/ˈɒr.ɪndʒ/',
    meaning: 'n. 橙子',
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z',
    pronunciation_us: '/ˈɒr.ɪndʒ/',
    pronunciation_uk: '/ˈɒr.ɪndʒ/',
    example: 'I like oranges.',
  }
];

export function WordList({ }: WordListProps) {
  const [words] = useState<Word[]>(mockWords);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>单词</TableHead>
            <TableHead>音标</TableHead>
            <TableHead>释义</TableHead>
            <TableHead>例句</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word, index) => (
            <motion.tr
              key={word.word_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50"
            >
              <TableCell className="font-medium">{word.word}</TableCell>
              <TableCell>{word.phonetic_us }</TableCell>
              <TableCell>{word.meaning}</TableCell>
              <TableCell>{word.example}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 