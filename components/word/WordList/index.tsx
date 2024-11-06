'use client';
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, message, Card } from 'antd';
import type { Word, WordFormData } from '@/types/word';
import { getColumns } from './columns';
import { WordForm } from './WordForm';

/**
 * 单词列表组件
 */
export function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [form] = Form.useForm<WordFormData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    setLoading(true);
    try {
      // TODO: 替换为实际API调用
      const mockData = [
        { id: '1', word: 'hello', meaning: '你好' },
        { id: '2', word: 'world', meaning: '世界' },
      ];
      setWords(mockData);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: Word) => {
    setEditingWord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: 调用API删除单词
      setWords(words.filter(word => word.id !== id));
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingWord) {
        const updatedWords = words.map(word =>
          word.id === editingWord.id ? { ...word, ...values } : word
        );
        setWords(updatedWords);
        message.success('更新成功');
      } else {
        const newWord: Word = {
          id: Date.now().toString(),
          ...values
        };
        setWords([...words, newWord]);
        message.success('添加成功');
      }
      handleModalCancel();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingWord(null);
    form.resetFields();
  };

  return (
    <Card>
      <div className="mb-4">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          添加单词
        </Button>
      </div>
      
      <Table 
        columns={getColumns(handleEdit, handleDelete)} 
        dataSource={words} 
        rowKey="id"
        loading={loading}
        pagination={{
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
          defaultPageSize: 10,
        }}
      />

      <Modal
        title={editingWord ? "编辑单词" : "添加单词"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        maskClosable={false}
      >
        <WordForm form={form} />
      </Modal>
    </Card>
  );
} 