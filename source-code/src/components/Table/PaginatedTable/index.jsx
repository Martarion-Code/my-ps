'use client'

import { Table, Button } from 'antd';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PaginatedTable({ 
  initialData, 
  initialPagination, 
  onDelete, 
  fetchData, 
  columns, 
  ...rest 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [data, setData] = useState(initialData);
  const [pagination, setPagination] = useState({
    current: initialPagination.page,
    pageSize: initialPagination.limit,
    total: initialPagination.total,
  });

  // Modify columns to include delete action if onDelete is provided
  const enhancedColumns = onDelete 
    ? [
        ...columns,
        {
          key: 'action',
          title: 'Action',
          render: (_, record) => (
            <Button 
              type="primary" 
              danger 
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Button>
          ),
        }
      ]
    : columns;

  const handleDelete = async (id) => {
    if (onDelete) {
      await onDelete(id);
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleTableChange = async (newPagination) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPagination.current.toString());
    params.set('limit', newPagination.pageSize.toString());
    
    router.push(`${pathname}?${params.toString()}`)
    
    // If fetchData is provided, call it to update data
    if (fetchData) {
      await fetchData({
        page: newPagination.current,
        limit: newPagination.pageSize,
      });
    }
    
    setPagination(newPagination);
    // router.prefetch()
    // This will trigger a server-side re-render
  };

  return (
    <Table
      {...rest}
      columns={enhancedColumns}
      dataSource={data}
      pagination={{
        ...pagination,
        showSizeChanger: true,
      }}
      onChange={handleTableChange}
    />
  );
}