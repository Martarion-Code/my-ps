import {  Card } from 'antd';
import Title from 'antd/es/typography/Title';
import { Suspense } from 'react';
import Loading from '../loading';
import { fetchPS, onDelete } from './actions'; // Server action
import PaginatedTable from '@/app/admin/ps/components/PaginatedTable'; // Client Component
import ButtonCreate from '@/components/Button/ButtonCreate';


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
      key: "seri",
      title: "Seri",
      dataIndex: "seri",
    },
  
  ];

  return (
    <Suspense fallback={<Loading/>}>
      <Card>
        <Title level={2}>List of Console</Title>
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
