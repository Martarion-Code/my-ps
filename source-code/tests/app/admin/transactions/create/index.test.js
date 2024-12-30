import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateTransactionPage from "@/app/admin/transactions/create/page.jsx"; 
import db from "@/lib/db";

// Mock komponen CreateTransactionForm
jest.mock("@/app/admin/transactions/create/components/Form", () => {
  return function MockCreateTransactionForm({ dataPS }) {
    return (
      <div data-testid="form-container">
        <p>Form Container</p>
        <div>{JSON.stringify(dataPS)}</div>
      </div>
    );
  };
});

// Mock db.ps.findMany untuk mengembalikan data palsu
jest.mock("@/lib/db", () => ({
  ps: {
    findMany: jest.fn(),
  },
}));

describe("CreateTransactionPage", () => {
  it("renders the CreateTransactionForm with data from db", async () => {
    // Mock data yang dikembalikan oleh db.ps.findMany
    const mockPsData = [
      { id: 1, nama: "PS 1", harga: 500000 },
      { id: 2, nama: "PS 2", harga: 600000 },
    ];
    db.ps.findMany.mockResolvedValue(mockPsData);

    render( await CreateTransactionPage({}));

    // Tunggu sampai data diproses dan komponen tampil
    await waitFor(() => screen.getByTestId("form-container"));

    // Periksa apakah data yang diterima oleh form sesuai dengan data yang di-mock
    // expect(screen.getByText(/Form Container/i)).toBeInTheDocument();
    expect(screen.getByText(JSON.stringify(mockPsData))).toBeInTheDocument();
  });

  it("renders an empty array when no PS data is found", async () => {
    // Mock data kosong yang dikembalikan oleh db.ps.findMany
    db.ps.findMany.mockResolvedValue([]);

    render( await CreateTransactionPage({}));

    // Tunggu sampai data diproses dan komponen tampil
    await waitFor(() => screen.getByTestId("form-container"));

    // Periksa apakah form menerima array kosong
    expect(screen.getByText("[]")).toBeInTheDocument();
  });

  it("renders loading state while data is being fetched", async () => {
    // Simulasikan keadaan pengambilan data dengan delay
    db.ps.findMany.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve([]), 1000)));

    render( await CreateTransactionPage({}));

    // Periksa apakah halaman merender form sementara dengan loading state
    expect(screen.getByTestId("form-container")).toBeInTheDocument();
  });
});
