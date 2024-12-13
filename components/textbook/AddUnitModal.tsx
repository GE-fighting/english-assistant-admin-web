'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUnit } from '@/services/unitService';
import { toast } from 'sonner';
import { TextbookAPI } from '@/api';

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  textbookId: number;
  onSuccess: () => void;
}

export function AddUnitModal({ isOpen, onClose, textbookId, onSuccess }: AddUnitModalProps) {
  const [name, setName] = useState('');
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await TextbookAPI.createUnit({
        id: 0, // 新建单元时通常传0或null
        name,
        textbook_id: textbookId,
        sequence_number: Number(sequenceNumber),
        created_at: new Date().toISOString(),
        word_count: 0
      });
      
      if (result.code === 200) {
        console.log('Create unit result:', result);
        
        onSuccess();
        setName('');
        setSequenceNumber('');
      } else {
        toast.error(result.message || '添加单元失败，请重试');
      }
    } catch (error) {
      console.error('Failed to create unit:', error);
      toast.error('添加单元失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setSequenceNumber('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加新单元</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">单元名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入单元名称"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sequenceNumber">单元序号</Label>
            <Input
              id="sequenceNumber"
              type="number"
              value={sequenceNumber}
              onChange={(e) => setSequenceNumber(e.target.value)}
              placeholder="请输入单元序号"
              required
              min="1"
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="min-w-[80px]"
            >
              {isLoading ? '添加中...' : '添加'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 