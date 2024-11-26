"use client";

import { Form, Input, Button, message, InputNumber } from "antd";
import { useState } from "react";

const CreatePsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/ps/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create PS");
      }

      message.success("PS created successfully!");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to create PS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <h1>Create PS</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ kategori: "", harga: "", stok: "" }}
      >
        <Form.Item
          label="Kategori"
          name="kategori"
          rules={[{ required: true, message: "Please enter the kategori!" }]}
        >
          <Input placeholder="Enter kategori" />
        </Form.Item>

        <Form.Item
          label="Harga"
          name="harga"
          rules={[{ required: true, message: "Please enter the harga!" }]}
        >
          <Input placeholder="Enter harga" />
        </Form.Item>

        <Form.Item
          label="Stok"
          name="stok"
          rules={[
            { required: true, message: "Please enter the stok!" },
            { pattern: /^\d+$/, message: "Stok must be a number!" },
          ]}
        >
          <InputNumber placeholder="Enter stok" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePsPage;
