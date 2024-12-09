import { fetchUsers, onDeleteUser } from "@/app/admin/users/actions";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

// Mock database methods and revalidation
jest.mock("@/lib/db", () => ({
  user: {
    count: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("fetchUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** Unit Test 1: Successful fetch with default pagination */
  it("fetches users with default page and limit", async () => {
    db.user.count.mockResolvedValue(50);
    db.user.findMany.mockResolvedValue([
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Doe", email: "jane@example.com" },
    ]);

    const result = await fetchUsers({ page: 1, limit: 2 });

    expect(db.user.count).toHaveBeenCalledTimes(1);
    expect(db.user.findMany).toHaveBeenCalledWith({
      take: 2,
      skip: 0,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/users");
    expect(result).toEqual({
      data: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" },
      ],
      pagination: {
        page: 1,
        limit: 2,
        total: 50,
        totalPages: 25,
      },
    });
  });

  /** Path Test 2: Fetch with custom pagination values */
  it("fetches users with custom pagination parameters", async () => {
    db.user.count.mockResolvedValue(100);
    db.user.findMany.mockResolvedValue([
      { id: 3, name: "Alice", email: "alice@example.com" },
      { id: 4, name: "Bob", email: "bob@example.com" },
    ]);

    const result = await fetchUsers({ page: 5, limit: 2 });

    expect(db.user.count).toHaveBeenCalledTimes(1);
    expect(db.user.findMany).toHaveBeenCalledWith({
      take: 2,
      skip: 8,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/users");
    expect(result).toEqual({
      data: [
        { id: 3, name: "Alice", email: "alice@example.com" },
        { id: 4, name: "Bob", email: "bob@example.com" },
      ],
      pagination: {
        page: 5,
        limit: 2,
        total: 100,
        totalPages: 50,
      },
    });
  });

  /** Path Test 3: Invalid pagination values */
  it("handles invalid pagination values gracefully", async () => {
    db.user.count.mockResolvedValue(50);
    db.user.findMany.mockResolvedValue([]);

    const result = await fetchUsers({ page: -1, limit: 100 });

    expect(db.user.count).toHaveBeenCalledTimes(1);
    expect(db.user.findMany).toHaveBeenCalledWith({
      take: 100,
      skip: -100, // Negative offset edge case
    });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/users");
    expect(result).toEqual({
      data: [],
      pagination: {
        page: -1,
        limit: 100,
        total: 50,
        totalPages: 1,
      },
    });
  });
});

describe("onDeleteUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** Unit Test 1: Successful deletion */
  it("deletes user successfully", async () => {
    db.user.delete.mockResolvedValue({ id: 1 });

    const result = await onDeleteUser(1);

    expect(db.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual({ id: 1 });
  });

  /** Path Test 2: Attempt deletion of a non-existent user */
  it("handles deletion of non-existent user", async () => {
    db.user.delete.mockRejectedValue(new Error("User not found"));

    await expect(onDeleteUser(99)).rejects.toThrow("User not found");

    expect(db.user.delete).toHaveBeenCalledWith({ where: { id: 99 } });
  });
});
