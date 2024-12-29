'use client'
import { Card, Form, Input, Button, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateTransaction } from '@/app/admin/transactions/actions';
import ContentTitle from '@/components/Title/ContentTitle';

const { TextArea } = Input;

const UpdateTransactionForm = ({ transaction }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const result = await updateTransaction(transaction.id, values);
    setLoading(false);
    if (result.status === 200) {
      message.success(result.message);
      router.push(`/admin/transactions`);
    } else {
      message.error(result.message);
    }
  };

  return (
    <Card style={{ margin: '20px' }}>
      <div style={{ width: "500px" }}>
        <ContentTitle title="Update Transaction" showBack={true} />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...transaction,
            waktu_pinjam: dayjs(transaction.waktu_pinjam),
            waktu_kembali: dayjs(transaction.waktu_kembali),
          }}
        >
          <Form.Item name="nama_cust" label="Nama Customer" rules={[{ required: true, message: 'Please input the customer name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="no_hp" label="No HP" rules={[{ required: true, message: 'Please input the phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="alamat_cust" label="Alamat Customer" rules={[{ required: true, message: 'Please input the customer address!' }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="waktu_pinjam" label="Waktu Pinjam" rules={[{ required: true, message: 'Please select the start date!' }]}>
            <DatePicker style={{width:"100%"}}/>
          </Form.Item>
          <Form.Item name="waktu_kembali" label="Waktu Kembali" rules={[{ required: true, message: 'Please select the end date!' }]}>
            <DatePicker style={{width:"100%"}}/>
          </Form.Item>
          {transaction.is_returned && (
            <Form.Item name="waktu_dikembalikan" label="Waktu Dikembalikan">
              <DatePicker style={{width:"100%"}}/>
            </Form.Item>
          )}
          <Form.Item name="jenis_jaminan" label="Jenis Jaminan" rules={[{ required: true, message: 'Please input the guarantee type!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default UpdateTransactionForm;