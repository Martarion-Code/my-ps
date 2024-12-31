'use client'
import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import ContentTitle from '@/components/Title/ContentTitle';

const TransactionDetail = ({ transaction }) => {
  if (!transaction) {
    return <p>Transaction not found</p>;
  }
  const formatPrice = (price, currency = 'Rp') => {
    if (typeof price !== 'number') {
      return 'Invalid price';
    }
    return `${currency} ${price.toLocaleString('id-ID')}`;
  };
  return (
    <Card style={{ margin: "20px" }}>
      <ContentTitle title="Transaction Details" showBack={true} />
      <Descriptions bordered>
        <Descriptions.Item label="Nama Customer">
          {transaction.nama_cust}
        </Descriptions.Item>
        <Descriptions.Item label="No HP">{transaction.no_hp}</Descriptions.Item>
        <Descriptions.Item label="Alamat Customer">
          {transaction.alamat_cust}
        </Descriptions.Item>
        <Descriptions.Item label="Waktu Pinjam">
          {dayjs(transaction.waktu_pinjam).format("DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Waktu Kembali">
          {dayjs(transaction.waktu_kembali).format("DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Waktu Pengembalian">
          {transaction.waktu_pengembalian
            ? dayjs(transaction.waktu_pengembalian).format("DD-MM-YYYY")
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Denda">
          {formatPrice({price:transaction.denda || 0})}
        </Descriptions.Item>
        <Descriptions.Item label="Harga Total">
          { formatPrice({price:transaction.harga_total || 0})}
        </Descriptions.Item>
        <Descriptions.Item label="Jenis Jaminan">
          {transaction.jenis_jaminan}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {transaction.is_returned ? "Sudah Dikembalikan" : "Belum Dikembalikan"}
        </Descriptions.Item>
      </Descriptions>

      <Card title="PS Details" style={{ marginTop: "20px" }}>
        <Descriptions bordered>
          <Descriptions.Item label="ID">{transaction.Ps.id}</Descriptions.Item>
          <Descriptions.Item label="Nama">
            {transaction.Ps.seri}
          </Descriptions.Item>
          <Descriptions.Item label="Harga">
            {transaction.Ps.harga}
          </Descriptions.Item>
          <Descriptions.Item label="Stok">
            {transaction.jumlah}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Card>
  );
};

export default TransactionDetail;