'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TextbookAPI } from '@/api/textbook';
import { Version } from '@/types/textbook';

export default function TextbookVersionPage() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingVersion, setEditingVersion] = useState<Version | null>(null);

  const fetchVersions = async () => {
    setLoading(true);
    try {
      const response = await TextbookAPI.getVersions();
      if (response.code === 200) {
        setVersions(response.data);
      } else {
        message.error('获取版本列表失败');
      }
    } catch (error) {
      message.error('获取版本列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setEditingVersion(null);
    setModalVisible(true);
  };

  const handleEdit = (record: Version) => {
    form.setFieldsValue({ name: record.name });
    setEditingVersion(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await TextbookAPI.deleteVersion(id);
      if (response.code === 200) {
        message.success('删除成功');
        fetchVersions();
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingVersion) {
        const response = await TextbookAPI.updateVersion(editingVersion.id, values.name);
        if (response.code === 200) {
          message.success('更新成功');
        } else {
          message.error('更新失败');
        }
      } else {
        const response = await TextbookAPI.addVersion(values.name);
        if (response.code === 200) {
          message.success('添加成功');
        } else {
          message.error('添加失败');
        }
      }
      setModalVisible(false);
      fetchVersions();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      className: 'text-gray-600',
    },
    {
      title: '版本名称',
      dataIndex: 'name',
      key: 'name',
      className: 'text-gray-800',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Version) => (
        <div className="space-x-3">
          <Button
            type="link"
            icon={<EditOutlined className="mr-1" />}
            onClick={() => handleEdit(record)}
            className="text-blue-500 hover:text-blue-600 transition-colors px-0"
          >
            编辑
          </Button>
          <Popconfirm
            title="删除确认"
            description={
              <div className="py-2">
                <div className="font-medium mb-1">确定要删除这个版本吗？</div>
                <div className="text-gray-500 text-sm">此操作不可恢复</div>
              </div>
            }
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
            okButtonProps={{ 
              className: 'bg-red-500 hover:bg-red-600',
              size: 'middle'
            }}
            cancelButtonProps={{
              size: 'middle'
            }}
          >
            <Button 
              type="link"
              danger
              icon={<DeleteOutlined className="mr-1" />}
              className="px-0"
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-5">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">教材版本管理</h1>
              <p className="mt-1 text-sm text-gray-500">管理教材的不同版本信息</p>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              size="large"
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 flex items-center shadow-sm"
            >
              添加版本
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={versions}
            loading={loading}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`,
              className: 'pagination-elegant',
              pageSize: 10,
            }}
            className="border border-gray-100 rounded-lg"
          />
        </div>
      </div>

      <Modal
        title={
          <div className="text-lg font-medium pb-3 border-b">
            {editingVersion ? "编辑版本" : "添加版本"}
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
        className="modal-elegant"
        width={500}
        maskClosable={false}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="pt-6"
        >
          <Form.Item
            name="name"
            label={<span className="text-gray-700">版本名称</span>}
            rules={[
              { required: true, message: '请输入版本名称' },
              { max: 50, message: '版本名称不能超过50个字符' },
              { min: 2, message: '版本名称不能少于2个字符' }
            ]}
          >
            <Input 
              placeholder="请输入版本名称" 
              className="h-10 text-base"
              autoFocus
            />
          </Form.Item>
          
          <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
            <Button 
              onClick={() => setModalVisible(false)}
              className="min-w-[80px] h-9"
            >
              取消
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              className="min-w-[80px] h-9 bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              确定
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}