"use client";

import { Table, Button, Row, Col } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

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
  
  const handleUpdate = async (id) => {
    router.push(`/update/${id}`)
  };

  // Modify columns to include delete action if onDelete is provided
  const enhancedColumns = onDelete
    ? [
        ...columns,
        {
          key: "action",
          title: "Action",
          render: (_, record) => (
          <Row gutter={[8, 8]} gap={20}>
            <Col>
              <Button
                style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "#000" }}
                onClick={() => {
                  router.push(`/admin/ps/update/${record.id}`);
                }}
              >
                Update
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ),
        },
      ]
    : columns;

  const handleDelete = async (id) => {
    console.log(id);
    if (onDelete) {
      await onDelete(id);
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleTableChange = async (pagination) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pagination.current.toString());
    params.set("limit", pagination.pageSize.toString());

    router.push(`${pathname}?${params.toString()}`);

    const { data: newData, pagination: newPagination } = await fetchData({
      page: pagination.current,
      limit: pagination.pageSize,
    });

    // Update client-side state
    setData(newData);
    setPagination({
      current: newPagination.page,
      pageSize: newPagination.limit,
      total: newPagination.total,
    });

    // Trigger server-side revalidation
    router.refresh();
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
