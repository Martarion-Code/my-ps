"use client";

import { Table, Button, Modal, Tag, Col, Row, Typography } from "antd";
import dayjs from "dayjs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  onApproveTransaction,
  onRejectTransaction,
  onReturnTransaction,
} from "@/app/admin/transactions/actions";
import SearchTransactions from "@/app/admin/transactions/components/Input/Search";
import ButtonCreate from "@/components/Button/ButtonCreate";
const { Title } = Typography;
export default function PaginatedTableTransaction({
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

  const [isLoadingApprove, setIsLoadingApprove] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);

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
          key: "created_at",
          title: "Dibuat Pada",
          dataIndex: "created_at",
          render: (a) => {
            return dayjs(a).format("DD-MM-YYYY");
          },
          width: 200,
        },

        {
          key: "approved/rejected",
          align: "center",
          width: 200,
          title: "Diterima / Ditolak",
          render: (_, record) => {
            if (record.is_approve) {
              return <Tag color="green">Diterima</Tag>;
            } else if (record.is_approve === false) {
              return <Tag color="red">Ditolak</Tag>;
            } else {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="primary"
                    ghost
                    // icon={}
                    // loading={isLoadingApprove}
                    onClick={async () => {
                      setIsLoadingApprove(true);
                      const res = await onApproveTransaction(record.id);
                      if (res.status === 200) {
                        Modal.success({
                          title: res.message || "Approve Success",
                        });
                        const { data: newData } = await fetchData({
                          page: pagination.current,
                          limit: pagination.pageSize,
                        });
                        setData(newData);
                      }
                      setIsLoadingApprove(false);
                    }}
                  >
                    Diterima
                  </Button>
                  <Button
                    type="primary"
                    danger
                    ghost
                    // icon={}
                    onClick={async () => {
                      setIsLoadingReject(true);
                      const res = await onRejectTransaction(record.id);
                      if (res.status === 200) {
                        Modal.success({
                          title: res.message || "Reject Success",
                        });
                        const { data: newData } = await fetchData({
                          page: pagination.current,
                          limit: pagination.pageSize,
                        });
                        setData(newData);
                      }
                      setIsLoadingReject(false);
                    }}
                  >
                    Ditolak
                  </Button>
                </div>
              );
            }
          },
        },
        {
          width: 200,
          key: "dikembalikan/belum",
          align: "center",
          title: "Sudah Dikembalikan / Belum",
          render: (_, record) => {
            if(record.is_approve ===false){
              return '-'
            }
            if (record.is_returned) {
              return <Tag color="green">Sudah Dikembalikan</Tag>;
            } else {
              console.log(record);
              return (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="primary"
                    ghost
                    disabled={!record.is_approve}
                    onClick={async () => {
                      setIsLoadingApprove(true);
                      const res = await onReturnTransaction(record.id);
                      if (res.status === 200) {
                        Modal.success({
                          title: res.message || "Return Success",
                        });
                        const { data: newData } = await fetchData({
                          page: pagination.current,
                          limit: pagination.pageSize,
                        });
                        setData(newData);
                      }
                      setIsLoadingApprove(false);
                    }}
                  >
                    Sudah Dikembalikan ?
                  </Button>
                </div>
              );
            }
          },
        },
        {
          key: "action",
          align: "center",
          width: 300,
          title: "Action",
          render: (_, record) => {
            return (
              <Row gutter={8} justify="center">
              <Col>
                <Button
                // type="primary"
                style={{backgroundColor:"#FFD700", borderColor: "#FFD700", color:"#000" }}
                onClick={() => {
                  router.push(`/admin/transactions/update/${record.id}`);
                }}
                >
                Update
                </Button>
              </Col>
              <Col>
                <Button
                type="primary"
                onClick={() => {
                  router.push(`/admin/transactions/detail/${record.id}`);
                }}
                >
                Detail
                </Button>
              </Col>
              </Row>
            );
          },
        },
      ]
    : columns;


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

  const handleSearch = ({ data, pagination }) => {
    setData(data);
    setPagination({
      current: pagination.page,
      pageSize: pagination.limit,
      total: pagination.total,
    });
  };

  return (
    <>
      <Title level={1}>Transactions List</Title>
      <Row style={{ justifyContent: "space-between" }}>
        <Col span={6}>
          <ButtonCreate />
        </Col>
        <Col span={18}>
          <SearchTransactions onSearch={handleSearch} />
        </Col>
      </Row>
      <Table
        {...rest}
        columns={enhancedColumns}
        dataSource={data}
        pagination={{
          ...pagination,
          showSizeChanger: true,
        }}
        scroll={{ x: 1400 }}
        onChange={handleTableChange}
      />
    </>
  );
}
