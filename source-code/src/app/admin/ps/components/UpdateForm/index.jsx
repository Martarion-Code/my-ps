'use client'
import { Card, Form, Input, Button, InputNumber, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updatePS } from '@/app/admin/ps/actions';
import ContentTitle from '@/components/Title/ContentTitle';

const UpdatePSForm = ({ ps }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const result = await updatePS(ps.id, values);
    setLoading(false);
    if (result.status === 200) {
      message.success(result.message);
      router.push(`/admin/ps/update/${ps.id}`);
    } else {
      message.error(result.message);
    }
  };

  return (
    <Card style={{ margin: '20px' }}>
      <ContentTitle title="Update PS" showBack={true} />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={ps}
      >
        <Form.Item name="kategori" label="Kategori" rules={[{ required: true, message: 'Please input the category!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="seri" label="Seri" rules={[{ required: true, message: 'Please input the Seri!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="harga" label="Harga" rules={[{ required: true, message: 'Please input the price!' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="stok" label="Stok" rules={[{ required: true, message: 'Please input the stock!' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdatePSForm;