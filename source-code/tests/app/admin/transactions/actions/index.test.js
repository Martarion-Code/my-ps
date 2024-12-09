import {
  fetchTransactions,
  onDeleteTransaction,
} from "@/app/admin/transactions/actions";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

// Mock database and revalidation
jest.mock("@/lib/db", () => ({
  transaksi: {
    count: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("fetchTransactions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** Unit Test 1: Successful fetch with default pagination */
  it("fetches transactions with default page and limit", async () => {
    db.transaksi.count.mockResolvedValue(50);
    db.transaksi.findMany.mockResolvedValue([
      { id: 1, nama_cust: "John", no_hp: "12345", alamat_cust: "Street 1" },
      { id: 2, nama_cust: "Jane", no_hp: "67890", alamat_cust: "Street 2" },
    ]);

    const result = await fetchTransactions({ page: 1, limit: 2 });

    expect(db.transaksi.count).toHaveBeenCalledTimes(1);
    expect(db.transaksi.findMany).toHaveBeenCalledWith({
      take: 2,
      skip: 0,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/transactions");
    expect(result).toEqual({
      data: [
        { id: 1, nama_cust: "John", no_hp: "12345", alamat_cust: "Street 1" },
        { id: 2, nama_cust: "Jane", no_hp: "67890", alamat_cust: "Street 2" },
      ],
      pagination: {
        page: 1,
        limit: 2,
        total: 50,
        totalPages: 25,
      },
    });
  });

  /** Path Test 2: Fetch transactions with custom pagination */
  it("fetches transactions with a custom page/limit", async () => {
    db.transaksi.count.mockResolvedValue(100);
    db.transaksi.findMany.mockResolvedValue([
      { id: 3, nama_cust: "Alice", no_hp: "54321", alamat_cust: "Street 3" },
      { id: 4, nama_cust: "Bob", no_hp: "98765", alamat_cust: "Street 4" },
    ]);

    const result = await fetchTransactions({ page: 5, limit: 2 });

    expect(db.transaksi.count).toHaveBeenCalledTimes(1);
    expect(db.transaksi.findMany).toHaveBeenCalledWith({
      take: 2,
      skip: 8,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/transactions");
    expect(result).toEqual({
      data: [
        { id: 3, nama_cust: "Alice", no_hp: "54321", alamat_cust: "Street 3" },
        { id: 4, nama_cust: "Bob", no_hp: "98765", alamat_cust: "Street 4" },
      ],
      pagination: {
        page: 5,
        limit: 2,
        total: 100,
        totalPages: 50,
      },
    });
  });
});

describe("onDeleteTransaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** Unit Test 1: Successful deletion */
  it("deletes transaction successfully", async () => {
    db.transaksi.delete.mockResolvedValue({ id: 1 });

    const result = await onDeleteTransaction(1);

    expect(db.transaksi.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual({ id: 1 });
  });

  /** Path Test 2: Attempt to delete a non-existent transaction */
  it("handles deletion of a non-existent transaction", async () => {
    db.transaksi.delete.mockRejectedValue(new Error("Transaction not found"));

    await expect(onDeleteTransaction(99)).rejects.toThrow(
      "Transaction not found"
    );

    expect(db.transaksi.delete).toHaveBeenCalledWith({ where: { id: 99 } });
  });
});
