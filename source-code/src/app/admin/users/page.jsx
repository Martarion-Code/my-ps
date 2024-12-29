import {  Card } from 'antd';
// import Title from 'antd/es/typography/Title';
import { Suspense } from 'react';
import Loading from '../loading';
import { onDeleteUser } from './actions';
import { fetchUsers } from './actions';
import ButtonCreate from '@/components/Button/ButtonCreate';
import PaginatedTable from '@/components/Table/PaginatedTable'; // Client Component


export default async function UsersPage({
  searchParams,
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const { data, pagination } = await fetchUsers({ 
    page, 
    limit 
  });

    const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        {/* <Title level={2}>List of Users</Title> */}
       <ButtonCreate ></ButtonCreate>
        <PaginatedTable
          columns={columns}
          fetchData={fetchUsers}
          onDelete={onDeleteUser}
          initialData={data}
          initialPagination={pagination}
        />
      </Card>
    </Suspense>
  );
}
