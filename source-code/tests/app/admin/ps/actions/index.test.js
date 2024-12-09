import { fetchPS, onDelete } from "@/app/admin/ps/actions";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";

// Mock database operations
jest.mock("@/lib/db", () => ({
  ps: {
    count: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock Next.js revalidation
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("fetchPS function - Unit and Path Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct pagination data with defaults", async () => {
    db.ps.count.mockResolvedValue(20);
    db.ps.findMany.mockResolvedValue([
      { id: 1, kategori: "PS5", harga: 500000, stok: 5 },
      { id: 2, kategori: "PS4", harga: 300000, stok: 3 },
    ]);

    const response = await fetchPS({});

    expect(db.ps.count).toHaveBeenCalledTimes(1);
    expect(db.ps.findMany).toHaveBeenCalledWith({
      take: 10,
      skip: 0,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/ps");
    expect(response).toEqual({
      data: [
        { id: 1, kategori: "PS5", harga: 500000, stok: 5 },
        { id: 2, kategori: "PS4", harga: 300000, stok: 3 },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 20,
        totalPages: 2,
      },
    });
  });

  it("should return correct pagination data with provided page and limit", async () => {
    db.ps.count.mockResolvedValue(30);
    db.ps.findMany.mockResolvedValue([
      { id: 3, kategori: "PS3", harga: 250000, stok: 4 },
    ]);

    const response = await fetchPS({ page: 3, limit: 5 });

    expect(db.ps.count).toHaveBeenCalledTimes(1);
    expect(db.ps.findMany).toHaveBeenCalledWith({
      take: 5,
      skip: 10,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/ps");
    expect(response).toEqual({
      data: [{ id: 3, kategori: "PS3", harga: 250000, stok: 4 }],
      pagination: {
        page: 3,
        limit: 5,
        total: 30,
        totalPages: 6,
      },
    });
  });
});

describe("onDelete function - Unit and Path Testing", () => {
  it("should delete a record with correct id", async () => {
    db.ps.delete.mockResolvedValue({ id: 1 });

    const response = await onDelete(1);

    expect(db.ps.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(response).toEqual({ id: 1 });
  });

  it("should handle deletion for invalid id", async () => {
    db.ps.delete.mockRejectedValue(new Error("Invalid ID"));

    await expect(onDelete(999)).rejects.toThrow("Invalid ID");
  });
});
