'use client';
import React from 'react';
import { Form, Input, FormInstance } from 'antd';

interface WordFormProps {
  form: FormInstance;
}

/**
 * 单词表单组件
 */
export function WordForm({ form }: WordFormProps) {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="word"
        label="单词"
        rules={[{ required: true, message: '请输入单词' }]}
      >
        <Input placeholder="请输入单词" />
      </Form.Item>
      <Form.Item
        name="meaning"
        label="释义"
        rules={[{ required: true, message: '请输入释义' }]}
      >
        <Input.TextArea placeholder="请输入释义" rows={4} />
      </Form.Item>
    </Form>
  );
} 