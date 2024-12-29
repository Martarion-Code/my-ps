"use client";

import {
  Button,
  DatePicker,
  Form,
  Typography,
  InputNumber,
  Modal,
  Select,
  Input,
} from "antd";
import React, { useMemo, useState } from "react";
import { createTransaction } from "@/app/admin/transactions/actions";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { TextArea } = Input;
const InputSearchPS = ({ dataPS }) => {
  const [selectedPS, setSelectedPS] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm()
  const optionsPS = useMemo(
    () =>
      dataPS.map((ps) => ({
        label: ps.seri,
        value: ps.id,
      })),
    [dataPS]
  );
  return (
    <div className="flex flex-col w-[300px]">
      <p>Pilih konsol : </p>
      <Select
        allowClear
        showSearch
        size="large"
        optionFilterProp="label"
        className=""
        placeholder="Pilih Konsol"
        options={optionsPS}
        onChange={(val) => setSelectedPS(val)}
      />

      <button
        style={{
          backgroundColor:  selectedPS ? "#ff5e1e" : "#ffb299",
          marginTop: "0.7rem",
          padding: "0.5rem",
          borderRadius:"0.3rem",
          color: "#fff",
          fontStyle: "bold",
          cursor: !selectedPS && 'no-drop'
        }}
        disabled={!selectedPS}
        onClick={() => setIsModalOpen(true)}
      >
        Pemesanan
      </button>

      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        // title="Form Pemesanan"
      >
        <Title level={2}>Form Pemesanan</Title>
        <Form
        form={form}
          initialValues={{
            seri_ps: selectedPS,
          }}
          onFinish={async (values) => {
            setIsLoading(true)
            const res = await createTransaction(values)
            if(res.status === 201){
              Modal.success({
                title: res.message,
                onOk: () => {
                  setIsModalOpen(false)
                  form.resetFields()
                }
              })
            }
            setIsLoading(false)

          }}
          layout="vertical"
        >
          <Title level={3}>Informasi Konsol</Title>
          <Form.Item
            name="seri_ps"
            label="Seri PS"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Select
              allowClear
              showSearch
              size="large"
              optionFilterProp="label"
              className=""
              placeholder="Pilih Konsol"
              options={optionsPS}
              onChange={(val) => setSelectedPS(val)}
            />
          </Form.Item>
          <Form.Item
            name="jumlah_ps"
            label="Jumlah"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Masukkan Jumlah"
            />
          </Form.Item>
          <Form.Item
            name="waktu_sewa"
            label="Waktu Sewa"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Title level={3}>Informasi Customer</Title>
          <Form.Item
            name="nama_cust"
            label="Nama Customer"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Input
              style={{ width: "100%" }}
              rules={[{ required: true, message: "This field is required!" }]}
              placeholder="Masukkan Nama Customer"
            />
          </Form.Item>
          <Form.Item
            name="no_hp"
            label="No HP"
            // noStyle
            style={{marginBottom:0}}
            rules={[{ required: true, message: "This field is required!" },
              {
                pattern: /^(62\d{9,})$/,
                message: 'Phone number must start with 62 and have at least 12 digits.',
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Masukkan No HP"
              maxLength={13}
            />
          </Form.Item>
          <p  style={{marginBottom:"0.5rem", color:"#848484"}}>Pembayaran akan melalui Whatsapp</p>
          <Form.Item
            name="alamat_cust"
            label="Alamat Customer"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <TextArea
              rows={3}
              style={{ width: "100%" }}
              placeholder="Masukan Alamat"
          />
          </Form.Item>
          <Form.Item
            name="jenis_jaminan"
            label="Jenis Jaminan"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Select
              allowClear
              showSearch
              // size="large"
              optionFilterProp="label"
              placeholder="Pilih Jaminan"
              options={[
                {
                  key:"1",
                  label: "KK",
                  value: "kk",
                },
                {
                  key:"2",
                  label: "KTP",
                  value: "ktp",
                },
              ]}
            />
          </Form.Item>
          <div className="flex justify-end">
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InputSearchPS;
