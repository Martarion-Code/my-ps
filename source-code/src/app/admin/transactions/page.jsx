import {  Card } from 'antd';
// import Title from 'antd/es/typography/Title';
import { Suspense } from 'react';
import Loading from '../loading';
import { onDeleteTransaction } from './actions';
import { fetchTransactions } from './actions';
import PaginatedTableTransaction from './components/Table/PaginatedTable';

export default async function TransactionsPage({
  searchParams,
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const { data, pagination } = await fetchTransactions({ 
    page, 
    limit 
  });

    const columns = [
      {
        key: "id",
        title: "ID",
        dataIndex: "id",
        width: 150,
      },
      {
        key: "nama_cust",
        title: "Nama Customer",
        dataIndex: "nama_cust",
        width: 150,
      },
      {
        key: "no_hp",
        title: "No HP",
        dataIndex: "no_hp",
        width: 150,
      },
      {
        key: "alamat_cust",
        title: "Alamat Customer",
        dataIndex: "alamat_cust",
        width: 150,
      },
    ];

  return (
    <Suspense fallback={<Loading></Loading>}>
      <Card>
       
        <PaginatedTableTransaction
          columns={columns}
          fetchData={fetchTransactions}
          onDelete={onDeleteTransaction}
          initialData={data}
          initialPagination={pagination}
        />
      </Card>
    </Suspense>
  );
}
