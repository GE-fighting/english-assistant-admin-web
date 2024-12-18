import { Button, Space } from 'antd';
import type { Word } from '@/types/word';

export const getColumns = (
  handleEdit: (record: Word) => void,
  handleDelete: (id: string) => void
) => [
  {
    title: '单词',
    dataIndex: 'word',
    key: 'word',
    width: '30%',
  },
  {
    title: '释义',
    dataIndex: 'meaning',
    key: 'meaning',
    width: '50%',
  },
  {
    title: '操作',
    key: 'action',
    width: '20%',
    render: (_: unknown, record: Word) => (
      <Space size="middle">
        <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
        <Button type="link" danger onClick={() => handleDelete(record.word_id)}>删除</Button>
      </Space>
    ),
  },
]; 