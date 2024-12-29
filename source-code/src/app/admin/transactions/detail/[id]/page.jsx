import TransactionDetail from '@/app/admin/transactions/components/TransactionDetail';
import db from '@/lib/db';


const TransactionDetailPage = async ({ params }) => {
  const { id } = params;

  const transaction = await db.transaksi.findUnique({
    where: { id: parseInt(id) },
    include: { Ps: true },
  });

  return <TransactionDetail transaction={transaction} />;
};

export default TransactionDetailPage;