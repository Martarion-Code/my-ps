// 'use client'

// // app/offering/page.tsx
// import { debounce } from "lodash";
// import { redirect } from "next/navigation";
// import db from "@/lib/db"; // Import Prisma client
// // import { Offering, Role } from "@prisma/client"; // Assume Prisma types are generated
// import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";
// import dynamic from "next/dynamic";
// // const Button = dynamic(() => import('antd').then((mod) => mod.Button), { ssr: false });
// // const Input = dynamic(() => import('antd').then((mod) => mod.Input), { ssr: false });
// import {
//   Button,
//   Input,
//   Typography,
//   Row,
//   Col,
//   Form,
//   Select,
//   Table,
// } from "antd";
// import { useEffect, useState } from "react";
// // import MainStatusComponent from "@/components/Tag/Status";

// const { Text, Title } = Typography;

// // Fetch offerings data directly from Prisma
// async function fetchPS ({
//   search,
//   status,
//   startDate,
//   endDate,
// }) {
//   const where = {};

//   // if (search) where.OR = [{ document_number: { contains: search } }, { isp_customer_company_name: { contains: search } }];
//   // if (status) where.status = status;
//   // if (startDate && endDate) where.date = { gte: startDate, lte: endDate };

//   return await db.ps.findMany({
//     // where,
//     // orderBy: { date },
//   });
// }

// // Server component for the Offering page
// export default  function Page() {
//   const [ps, setPs] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [pagination, setPagination] = useState({
//     current:1,
//     pageSize:10,
//     total: 0
//   })

//   const getPS = async ({page, limit}) => {
//     console.log("limit", limit)
//     try {
//       const response = await fetch(`/api/ps/list?page=${page}?limit=${limit}`, {
//         method: 'GET',
//       });
//       const {data, pagination: pag} = await response.json();
//       console.log(data)      
//       setPs(data)
//       setPagination({
//         current: pag.page,
//         pageSize: pag.limit,
//         total: pag.total,
//       });
//     } catch (error) {
//       console.log(error)
//     }

//   }

//   useEffect(() => {
//     getPS({page:pagination.current,
//       limit: pagination.pageSize
//     })
  
//     return () => {
      
//     }
//   }, [pagination.current, pagination.pageSize])
  
//   // const offerings = await fetchOfferings({});
//   const STATUS_OPTIONS = [
//     { label: "New", value: "new" },
//     { label: "Sent", value: "sent" },
//     { label: "Expired", value: "expired" },
//     { label: "Negotiated", value: "negotiation" },
//     { label: "Negotiation Accepted", value: "negotiation_accepted" },
//     { label: "Unused", value: "unused" },
//     { label: "Done", value: "done" },
//   ];

//   const columns = [
//     {
//       key: "kategori",
//       title: "Kategori",
//       dataIndex: "kategori",
//       // render: (value) => <Text strong>{value}</Text>,
//     },
//     {
//       key: "harga",
//       title: "Harga",
//       dataIndex: "harga",
//     },
//     {
//       key: "stok",
//       title: "Stok",
//       dataIndex: "stok",
    
//     },
//     {
//       key: "action",
//       title: "Action",
//       dataIndex: "action",
//       render: (_, record) => (
//         <Button
//           color="danger"
//           // icon={<FileTextOutlined />}
//           onClick={() => {
//             redirect(`/offering/detail/${record.id}`);
//           }}
//         >
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Title level={2}>List PS</Title>
//       <Row gutter={[20, 20]}>
//         <Col span={24}>
//           <Form>
//             <Row gutter={[20, 20]}>
//               <Col span={6}>
//                 {/* <Form.Item name="search">
//                   <Input
//                     placeholder="Search"
//                     prefix={<SearchOutlined />}
//                     onChange={(e) => debounce(fetchOfferings({ search: e.target.value }), 1400)}
//                   />
//                 </Form.Item> */}
//               </Col>
//               {/* <Col span={6}>
//                 <Form.Item name="status">
//                   <Select
//                     options={STATUS_OPTIONS}
//                     placeholder="Status"
//                     allowClear
//                     onChange={(value) => fetchOfferings({ status: value })}
//                   />
//                 </Form.Item>
//               </Col> */}
//             </Row>
//           </Form>
//         </Col>
//       </Row>
//       <Table columns={columns} dataSource={ps} rowKey="id" pagination={{
//         current:pagination.current,
//         pageSize:pagination.pageSize,
//         total: pagination.total,
//         showSizeChanger: true,
//         onShowSizeChange: (page, pageSize) => {
//           console.log(pageSize)
//           setPagination({...pagination, pageSize})
//         },
//         onChange: (page, pageSize) => {
//           setPagination({...pagination, current: page, pageSize})
//         }

//       }}/>
//     </div>
//   );
// }






import { Suspense } from 'react';
import { fetchPS, onDelete } from './actions'; // Server action
import PaginatedTable from '@/components/Table/PaginatedTable'; // Client Component

export default async function OfferingPage({
  searchParams,
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  
  const { data, pagination } = await fetchPS({ 
    page, 
    limit 
  });


    const columns = [
    {
      key: "kategori",
      title: "Kategori",
      dataIndex: "kategori",
      // render: (value) => <Text strong>{value}</Text>,
    },
    {
      key: "harga",
      title: "Harga",
      dataIndex: "harga",
    },
    {
      key: "stok",
      title: "Stok",
      dataIndex: "stok",
    
    },
    // {
    //   key: "action",
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (_, record) => (
    //     <Button
    //       color="danger"
    //       // icon={<FileTextOutlined />}
    //       onClick={() => {
    //         redirect(`/offering/detail/${record.id}`);
    //       }}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaginatedTable 
        columns={columns}
        fetchData={fetchPS}
        onDelete={onDelete}
        initialData={data} 
        initialPagination={pagination} 
      />
    </Suspense>
  );
}
