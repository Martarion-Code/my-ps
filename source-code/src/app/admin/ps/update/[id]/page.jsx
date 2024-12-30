import UpdatePSForm from '@/app/admin/ps/components/UpdateForm';
import db from '@/lib/db';

const UpdatePSPage = async ({ params }) => {
  const { id } = params;

  const ps = await db.ps.findUnique({
    where: { id: parseInt(id) },
  });

  if (!ps) {
    return <p>PS not found</p>;
  }

  return <UpdatePSForm ps={ps} />;
};

export default UpdatePSPage;