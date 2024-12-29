'use async'

import CreateTransactionForm from "./components/Form"
import db from "@/lib/db"

const CreateTransactionPage = async () => {
  const dataPs = await db.ps.findMany()
  return <>
    <CreateTransactionForm dataPS={dataPs}></CreateTransactionForm>
  </>
}

export default CreateTransactionPage