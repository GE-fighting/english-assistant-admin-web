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
import { toast } from 'sonner';
import { Word } from '@/types/word';

interface WordListProps {
  textbookId: number;
}

// 模拟数据
const mockWords: Word[] = [
  {
    id: 1,
    word: 'apple',
    phonetic: '/ˈæp.əl/',
    translation: 'n. 苹果',
    unit_id: 1,
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z'
  },
  {
    id: 2,
    word: 'banana',
    phonetic: '/bəˈnɑː.nə/',
    translation: 'n. 香蕉',
    unit_id: 1,
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z'
  },
  {
    id: 3,
    word: 'orange',
    phonetic: '/ˈɒr.ɪndʒ/',
    translation: 'n. 橙子',
    unit_id: 1,
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z'
  }
];

export function WordList({ textbookId }: WordListProps) {
  const [words] = useState<Word[]>(mockWords);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>单词</TableHead>
            <TableHead>音标</TableHead>
            <TableHead>释义</TableHead>
            <TableHead>所属单元</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word, index) => (
            <motion.tr
              key={word.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50"
            >
              <TableCell className="font-medium">{word.word}</TableCell>
              <TableCell>{word.phonetic}</TableCell>
              <TableCell>{word.translation}</TableCell>
              <TableCell>Unit {word.unit_id}</TableCell>
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