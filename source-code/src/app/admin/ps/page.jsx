'use client'

// app/offering/page.tsx
import { debounce } from "lodash";
import { redirect } from "next/navigation";
import db from "@/lib/db"; // Import Prisma client
// import { Offering, Role } from "@prisma/client"; // Assume Prisma types are generated
import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
// const Button = dynamic(() => import('antd').then((mod) => mod.Button), { ssr: false });
// const Input = dynamic(() => import('antd').then((mod) => mod.Input), { ssr: false });
import {
  Button,
  Input,
  Typography,
  Row,
  Col,
  Form,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
// import MainStatusComponent from "@/components/Tag/Status";

const { Text, Title } = Typography;

// Fetch offerings data directly from Prisma
async function fetchPS ({
  search,
  status,
  startDate,
  endDate,
}) {
  const where = {};

  // if (search) where.OR = [{ document_number: { contains: search } }, { isp_customer_company_name: { contains: search } }];
  // if (status) where.status = status;
  // if (startDate && endDate) where.date = { gte: startDate, lte: endDate };

  return await db.ps.findMany({
    // where,
    // orderBy: { date },
  });
}

// Server component for the Offering page
export default  function Page() {
  const [ps, setPs] = useState([])
  const getPS = async () => {
    const response = await fetch('/api/ps/list', {
      method: 'GET',
    });
    console.log(response)
    

  }

  useEffect(() => {
    getPS()
  
    return () => {
      
    }
  }, [])
  
  // const offerings = await fetchOfferings({});
  const STATUS_OPTIONS = [
    { label: "New", value: "new" },
    { label: "Sent", value: "sent" },
    { label: "Expired", value: "expired" },
    { label: "Negotiated", value: "negotiation" },
    { label: "Negotiation Accepted", value: "negotiation_accepted" },
    { label: "Unused", value: "unused" },
    { label: "Done", value: "done" },
  ];

  const columns = [
    {
      key: "document_number",
      title: "Document Number",
      dataIndex: "document_number",
      // render: (value) => <Text strong>{value}</Text>,
    },
    {
      key: "isp_customer_company_name",
      title: "ISP / Customer Name",
      dataIndex: "isp_customer_company_name",
    },
    {
      key: "date",
      title: "Date",
      dataIndex: "date",
      // render: (value) => {
      //   const [year, month, day] = value.split("T")[0].split("-");
      //   const monthNames = [
      //     "Januari",
      //     "Februari",
      //     "Maret",
      //     "April",
      //     "Mei",
      //     "Juni",
      //     "Juli",
      //     "Agustus",
      //     "September",
      //     "Oktober",
      //     "November",
      //     "Desember",
      //   ];
      //   const monthName = monthNames[parseInt(month, 10) - 1];
      //   return `${day} ${monthName} ${year}`;
      // },
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      // render: (value) => <MainStatusComponent value={value} />,
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      // render: (_, record) => (
      //   <Button
      //     type="primary"
      //     ghost
      //     icon={<FileTextOutlined />}
      //     onClick={() => {
      //       redirect(`/offering/detail/${record.id}`);
      //     }}
      //   >
      //     Detail
      //   </Button>
      // ),
    },
  ];

  return (
    <div>
      <Title level={2}>List PS</Title>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Form>
            <Row gutter={[20, 20]}>
              <Col span={6}>
                {/* <Form.Item name="search">
                  <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={(e) => debounce(fetchOfferings({ search: e.target.value }), 1400)}
                  />
                </Form.Item> */}
              </Col>
              {/* <Col span={6}>
                <Form.Item name="status">
                  <Select
                    options={STATUS_OPTIONS}
                    placeholder="Status"
                    allowClear
                    onChange={(value) => fetchOfferings({ status: value })}
                  />
                </Form.Item>
              </Col> */}
            </Row>
          </Form>
        </Col>
      </Row>
      <Table columns={columns} dataSource={[]} rowKey="id" />
    </div>
  );
}
