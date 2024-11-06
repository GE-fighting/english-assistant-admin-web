'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
}

export function WordList() {
  const words: Word[] = [
    {
      id: '1',
      word: 'hello',
      translation: '你好',
      pronunciation: '/həˈləʊ/',
      example: 'Hello, how are you?'
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>单词</TableHead>
            <TableHead>翻译</TableHead>
            <TableHead>音标</TableHead>
            <TableHead>示例</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word) => (
            <TableRow key={word.id}>
              <TableCell>{word.word}</TableCell>
              <TableCell>{word.translation}</TableCell>
              <TableCell>{word.pronunciation}</TableCell>
              <TableCell>{word.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 