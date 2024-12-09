import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionsPage from "@/app/admin/transactions/page.jsx";
import {
  fetchTransactions,
  onDeleteTransaction,
} from "@/app/admin/transactions/actions";

// Mock the imported components and actions
jest.mock("@/components/Button/ButtonCreate", () => {
  return function MockButtonCreate() {
    return <div data-testid="button-create">Create Button</div>;
  };
});

jest.mock("@/components/Table/PaginatedTable", () => {
  return function MockPaginatedTable(props) {
    return (
      <div data-testid="paginated-table">
        Mocked Paginated Table
        <div>Columns: {JSON.stringify(props.columns)}</div>
        <div>Initial Data: {JSON.stringify(props.initialData)}</div>
      </div>
    );
  };
});

jest.mock("@/app/admin/transactions/actions", () => ({
  fetchTransactions: jest.fn(),
  onDeleteTransaction: jest.fn(),
}));

describe("TransactionsPage", () => {
  const mockTransactionData = {
    data: [
      {
        nama_cust: "John Doe",
        no_hp: "1234567890",
        alamat_cust: "Test Address",
        waktu_pinjam: "2023-01-01",
        waktu_kembali: "2023-01-07",
        harga_total: 500000,
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 5,
      totalItems: 50,
    },
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });
  /** Test Path 1: Default Rendering with default search params */
  it("renders the page title and fetches data with default pagination", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(await TransactionsPage({ searchParams: {} }));

    expect(screen.getByText("List of Transactions")).toBeInTheDocument();
    expect(screen.getByTestId("button-create")).toBeInTheDocument();

    // Ensure fetchTransactions was called with defaults
    expect(fetchTransactions).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });

  /** Test Path 2: Custom pagination with searchParams */
  it("fetches transactions with custom searchParams", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(
      await TransactionsPage({ searchParams: { page: "3", limit: "15" } })
    );

    // expect(screen.getByText("List of Transactions")).toBeInTheDocument();
    expect(screen.getByTestId("button-create")).toBeInTheDocument();

    expect(fetchTransactions).toHaveBeenCalledWith({
      page: 3,
      limit: 15,
    });
  });

  /** Test Path 3: Edge case with invalid query values */
  it("handles invalid query parameters gracefully", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(
      await TransactionsPage({
        searchParams: { page: "invalid", limit: "invalid" },
      })
    );

    // expect(screen.getByText("List of Transactions")).toBeInTheDocument();
    expect(screen.getByTestId("button-create")).toBeInTheDocument();

    expect(fetchTransactions).toHaveBeenCalledWith({
      page: 1, // Fallback to default page
      limit: 10, // Fallback to default limit
    });
  });

  /** Test Path 4: Verifies the correct PaginatedTable props are passed */
  it("passes correct columns & data to PaginatedTable", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(await TransactionsPage({ searchParams: {} }));

    const paginatedTable = screen.getByTestId("paginated-table");
    expect(paginatedTable).toBeInTheDocument();

    expect(paginatedTable).toHaveTextContent("Mocked Paginated Table");
    expect(paginatedTable).toHaveTextContent("Columns");
    expect(paginatedTable).toHaveTextContent(
      JSON.stringify(mockTransactionData.data)
    );
  });

  it("renders the create button", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(await TransactionsPage({ searchParams: {} }));

    const createButton = screen.getByTestId("button-create");
    expect(createButton).toBeInTheDocument();
  });

  it("passes correct columns to PaginatedTable", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(await TransactionsPage({ searchParams: {} }));

    const paginatedTable = screen.getByTestId("paginated-table");
    expect(paginatedTable).toBeInTheDocument();

    // Check if columns are correctly defined
    expect(paginatedTable).toHaveTextContent("Nama Customer");
    expect(paginatedTable).toHaveTextContent("No HP");
    expect(paginatedTable).toHaveTextContent("Alamat Customer");
    expect(paginatedTable).toHaveTextContent("Waktu Pinjam");
    expect(paginatedTable).toHaveTextContent("Waktu Kembali");
    expect(paginatedTable).toHaveTextContent("Harga Total");
  });

  it("fetches transactions with default pagination", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(await TransactionsPage({ searchParams: {} }));

    // Verify fetchTransactions was called with default values
    expect(fetchTransactions).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });

  it("fetches transactions with custom pagination", async () => {
    fetchTransactions.mockResolvedValue(mockTransactionData);

    render(
      await TransactionsPage({
        searchParams: {
          page: "2",
          limit: "20",
        },
      })
    );

    // Verify fetchTransactions was called with custom values
    expect(fetchTransactions).toHaveBeenCalledWith({
      page: 2,
      limit: 20,
    });
  });
});
