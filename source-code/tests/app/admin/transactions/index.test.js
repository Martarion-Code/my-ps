import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionsPage from "@/app/admin/transactions/page"; // Adjust the import path as needed
import { fetchTransactions, onDeleteTransaction } from "@/app/admin/transactions/actions"; // Server actions
import PaginatedTable from "@/app/admin/transactions/components/Table/PaginatedTable";
import { Suspense } from "react";

// Mocking components and server actions
jest.mock("@/app/admin/transactions/components/Table/PaginatedTable", () => {
  return function MockPaginatedTableTransaction(props) {
    return (
      <div data-testid="paginated-table">
        Mocked Paginated Table
        <div>Columns: {JSON.stringify(props.columns)}</div>
        <div>Initial Data: {JSON.stringify(props.initialData)}</div>
        <div>Pagination: {JSON.stringify(props.initialPagination)}</div>
      </div>
    );
  };
});
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/app/admin/transactions/actions", () => ({
  fetchTransactions: jest.fn(),
  onDeleteTransaction: jest.fn(),
}));

// Mock data for Transactions
const mockTransactionsData = {
  data: [
    { id: 1, nama_cust: "John", no_hp: "12345", alamat_cust: "Street 1" },
    { id: 2, nama_cust: "Jane", no_hp: "67890", alamat_cust: "Street 2" },
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 50,
    totalPages: 5,
  },
};

describe("TransactionsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TransactionsPage with data and pagination", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionsData);

    // Render TransactionsPage with mock data
    render(await TransactionsPage({ searchParams: { page: "1", limit: "10" } }));

    // Wait for the paginated table to be rendered
    await waitFor(() => screen.getByTestId("paginated-table"));

    // Verify the paginated table and data rendering
    expect(screen.getByTestId("paginated-table")).toBeInTheDocument();

    // Verify the content in the table (Customer names, etc.)
    const paginatedTable = screen.getByTestId("paginated-table");
    expect(paginatedTable).toHaveTextContent("John");
    expect(paginatedTable).toHaveTextContent("Jane");
    expect(paginatedTable).toHaveTextContent("12345");
    expect(paginatedTable).toHaveTextContent("67890");
    expect(paginatedTable).toHaveTextContent("Street 1");
    expect(paginatedTable).toHaveTextContent("Street 2");
  });

  it("calls fetchTransactions with the correct parameters based on searchParams", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionsData);

    // Render TransactionsPage with specific searchParams
    render(await TransactionsPage({ searchParams: { page: "2", limit: "20" } }));

    // Verify fetchTransactions is called with correct parameters
    await waitFor(() => {
      expect(fetchTransactions).toHaveBeenCalledWith({
        page: 2,
        limit: 20,
      });
    });
  });

  it("handles empty transaction data", async () => {
    // Simulate empty transaction data
    fetchTransactions.mockResolvedValue({
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    render(await TransactionsPage({ searchParams: { page: "1", limit: "10" } }));

    await waitFor(() => screen.getByTestId("paginated-table"));

    // Verify the table shows empty data
    const paginatedTable = screen.getByTestId("paginated-table");
    expect(paginatedTable).toHaveTextContent("[]"); // Empty data case
  });
});
