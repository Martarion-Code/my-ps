import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PSPage from "@/app/admin/ps/page.jsx"; // Ganti dengan path yang sesuai
import { fetchPS, onDelete } from "@/app/admin/ps/actions"; // Server actions
import ButtonCreate from "@/components/Button/ButtonCreate";
import PaginatedTable from "@/components/Table/PaginatedTable";
import { Suspense } from "react";

// Mocking komponen dan server actions
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
        <div>Pagination: {JSON.stringify(props.initialPagination)}</div>
      </div>
    );
  };
});

jest.mock("@/app/admin/ps/actions", () => ({
  fetchPS: jest.fn(),
  onDelete: jest.fn(),
}));

// Mock data untuk PS
const mockPSData = {
  data: [
    { id: 1, kategori: "PS5", seri: "Slim", harga: 8000000, stok: 10 },
    { id: 2, kategori: "PS4", seri: "Pro", harga: 5000000, stok: 15 },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 3,
    totalItems: 30,
  },
};

describe("PSPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the PS page with data and pagination", async () => {
    fetchPS.mockResolvedValue(mockPSData);

    // Use await to wait for the component to finish rendering
     render(await PSPage({searchParams:{ page: "1", limit: "10" }}));

    // Tunggu sampai data dan komponen ter-render
    await waitFor(() => screen.getByTestId("paginated-table"));

    // Verifikasi bahwa tombol create dan tabel ter-render dengan data yang benar
    expect(screen.getByTestId("button-create")).toBeInTheDocument();
    const paginatedTable = screen.getByTestId("paginated-table");
    expect(paginatedTable).toBeInTheDocument();

    // Verifikasi apakah data PS ada di tabel
    expect(paginatedTable).toHaveTextContent("PS5");
    expect(paginatedTable).toHaveTextContent("PS4");
    expect(paginatedTable).toHaveTextContent("8000000");
    expect(paginatedTable).toHaveTextContent("5000000");
    expect(paginatedTable).toHaveTextContent("10");
    expect(paginatedTable).toHaveTextContent("15");
  });

  it("calls fetchPS with the correct parameters based on searchParams", async () => {
    fetchPS.mockResolvedValue(mockPSData);

    // Use await to ensure fetchPS is called with the correct parameters after rendering
    render(await PSPage({searchParams:{ page: "2", limit: "20" }}));

    // Verifikasi bahwa fetchPS dipanggil dengan parameter yang benar
    await waitFor(() => expect(fetchPS).toHaveBeenCalledWith({ page: 2, limit: 20 }));
  });

  it("handles empty PS data", async () => {
    // Simulasikan data kosong
    fetchPS.mockResolvedValue({ data: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0 } });

    render(await PSPage({searchParams:{ page: "1", limit: "10" }}));

    await waitFor(() => screen.getByTestId("paginated-table"));

    // Verifikasi bahwa tabel menampilkan data kosong
    const paginatedTable = screen.getByTestId("paginated-table");
    expect(paginatedTable).toHaveTextContent("[]"); // Data kosong
  });
});
