import db from '@/lib/db';
import TransactionDetail from '@/components/TransactionDetail';

const TransactionDetailPage = async ({ params }) => {
  const { id } = params;

  const transaction = await db.transaksi.findUnique({
    where: { id: parseInt(id) },
    include: { Ps: true },
  });

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  return <TransactionDetail transaction={transaction} />;
};

export default TransactionDetailPage;