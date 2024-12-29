
import UpdateTransactionForm from "@/app/admin/transactions/components/TransactionUpdate";
import db from "@/lib/db";

const UpdateTransactionPage = async ({ params }) => {
  const { id } = params;

  const transaction = await db.transaksi.findUnique({
    where: { id: parseInt(id) },
  });

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  return <UpdateTransactionForm transaction={transaction} />;
};

export default UpdateTransactionPage;
