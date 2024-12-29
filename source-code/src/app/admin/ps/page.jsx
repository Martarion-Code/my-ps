import {  Card } from 'antd';
// import Title from 'antd/es/typography/Title';
import { Suspense } from 'react';
import Loading from '../loading';
import { fetchPS, onDelete } from './actions'; // Server action
import ButtonCreate from '@/components/Button/ButtonCreate';
import PaginatedTable from '@/components/Table/PaginatedTable'; // Client Component


export default async function PSPage({
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
  ];

  return (
    <Suspense fallback={<Loading/>}>
      <Card>
        {/* <Title level={2}>List of PS</Title> */}
       <ButtonCreate />
        <PaginatedTable
          columns={columns}
          fetchData={fetchPS}
          onDelete={onDelete}
          initialData={data}
          initialPagination={pagination}
        />
      </Card>
    </Suspense>
  );
}
