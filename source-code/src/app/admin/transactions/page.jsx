import {  Card } from 'antd';
import Title from 'antd/es/typography/Title';
import { Suspense } from 'react';
import { onDeleteTransaction } from './actions';
import { fetchTransactions } from './actions';
import ButtonCreate from '@/components/Button/ButtonCreate';
import PaginatedTable from '@/components/Table/PaginatedTable'; // Client Component


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
      key: "nama_cust",
      title: "Nama Customer",
      dataIndex: "nama_cust",
    },
    {
      key: "no_hp",
      title: "No HP",
      dataIndex: "no_hp",
    },
    {
      key: "alamat_cust",
      title: "Alamat Customer",
      dataIndex: "alamat_cust",
    },
    {
      key: "waktu_pinjam",
      title: "Waktu Pinjam",
      dataIndex: "waktu_pinjam",
    },
    {
      key: "waktu_kembali",
      title: "Waktu Kembali",
      dataIndex: "waktu_kembali",
    },
    {
      key: "harga_total",
      title: "Harga Total",
      dataIndex: "harga_total",
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card>
        <Title level={2}>List of Transactions</Title>
       <ButtonCreate />
        <PaginatedTable
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
