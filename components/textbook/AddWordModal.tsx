'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  textbookId: number;
  onSuccess: () => void;
}

export function AddWordModal({ isOpen, onClose, textbookId, onSuccess }: AddWordModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    word: '',
    phonetic: '',
    translation: '',
    unit_id: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('添加单词成功');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('添加单词失败');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加新单词</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="word">单词</Label>
            <Input
              id="word"
              name="word"
              value={formData.word}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phonetic">音标</Label>
            <Input
              id="phonetic"
              name="phonetic"
              value={formData.phonetic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="translation">释义</Label>
            <Input
              id="translation"
              name="translation"
              value={formData.translation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit_id">单元</Label>
            <Input
              id="unit_id"
              name="unit_id"
              type="number"
              value={formData.unit_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '添加中...' : '添加'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 