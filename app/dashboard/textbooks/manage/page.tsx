'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextbookAPI } from '@/utils/api/textbook';
import { formatRFC3339Date, formatRelativeTime } from '@/utils/date';
import { 
  Edit2, 
  Trash2, 
  BookOpen, 
  PlusCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Textbook } from '@/types/textbook';
import { toast } from 'sonner';
import { AddTextbookModal } from '@/components/textbook/AddTextbookModal';

export default function TextbookManagePage() {
  const router = useRouter();
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    }
  };

  useEffect(() => {
    fetchTextbooks();
  }, []);

  const handleTextbookClick = (textbookId: number) => {
    router.push(`/dashboard/textbooks/${textbookId}`);
  };

  const handleAddTextbookSuccess = () => {
    fetchTextbooks();
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">教材列表</h1>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5" />
          <span>添加教材</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 border-b">
            <TableRow>
              <TableHead className="py-4 px-6 text-gray-600 font-medium">教材名称</TableHead>
              <TableHead className="py-4 px-6 text-gray-600 font-medium">单词数量</TableHead>
              <TableHead className="py-4 px-6 text-gray-600 font-medium">单元数量</TableHead>
              <TableHead className="py-4 px-6 text-gray-600 font-medium">创建时间</TableHead>
              <TableHead className="py-4 px-6 text-gray-600 font-medium">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {textbooks.map((textbook, index) => (
              <motion.tr
                key={textbook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3 
                }}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell 
                  className="py-4 px-6 cursor-pointer" 
                  onClick={() => handleTextbookClick(textbook.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">{textbook.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                    {textbook.word_count}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-xs">
                    {textbook.unit_count}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div>
                    <div className="text-sm text-gray-800">
                      {formatRFC3339Date(textbook.created_at, 'YYYY-MM-DD')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatRelativeTime(textbook.created_at)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddTextbookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddTextbookSuccess}
      />
    </div>
  );
} 