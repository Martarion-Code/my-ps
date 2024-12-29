import db from '@/lib/db';
import dayjs from 'dayjs';
import { Card, Descriptions } from 'antd';

const TransactionDetail = ({ transaction }) => {
  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  return (
    <Card title="Transaction Details" style={{ margin: '20px' }}>
      <Descriptions bordered>
        <Descriptions.Item label="Nama Customer">{transaction.nama_cust}</Descriptions.Item>
        <Descriptions.Item label="No HP">{transaction.no_hp}</Descriptions.Item>
        <Descriptions.Item label="Alamat Customer">{transaction.alamat_cust}</Descriptions.Item>
        <Descriptions.Item label="Waktu Pinjam">{dayjs(transaction.waktu_pinjam).format('DD-MM-YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Waktu Kembali">{dayjs(transaction.waktu_kembali).format('DD-MM-YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Harga Total">{transaction.harga_total}</Descriptions.Item>
        <Descriptions.Item label="Jenis Jaminan">{transaction.jenis_jaminan}</Descriptions.Item>
        <Descriptions.Item label="Status">{transaction.is_returned ? 'Returned' : 'Not Returned'}</Descriptions.Item>
      </Descriptions>

      <Card title="PS Details" style={{ marginTop: '20px' }}>
        <Descriptions bordered>
          <Descriptions.Item label="ID">{transaction.Ps.id}</Descriptions.Item>
          <Descriptions.Item label="Nama">{transaction.Ps.nama}</Descriptions.Item>
          <Descriptions.Item label="Harga">{transaction.Ps.harga}</Descriptions.Item>
          <Descriptions.Item label="Stok">{transaction.Ps.stok}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Card>
  );
};

export default TransactionDetail;