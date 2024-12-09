// import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PSPage from "@/app/admin/ps/page.jsx";
import { fetchPS, onDelete } from "@/app/admin/ps/actions";
import { Card } from "antd";

// Mock dependencies
jest.mock("antd", () => ({
  Card: jest.fn(({ children }) => (
    <div data-testid="mock-card">{children}</div>
  )),
  Typography: {
    Title: jest.fn(({ children, level }) => <h1>{children}</h1>),
  },
}));

jest.mock("@/components/Button/ButtonCreate", () => {
  return function MockButtonCreate() {
    return <button data-testid="create-button">Create</button>;
  };
});

jest.mock("@/components/Table/PaginatedTable", () => {
  return function MockPaginatedTable(props) {
    return (
      <div data-testid="paginated-table">
        {props.initialData.map((item) => (
          <div key={item.id}>
            {item.kategori} - {item.harga} - {item.stok}
          </div>
        ))}
      </div>
    );
  };
});

// Mock server actions
jest.mock("@/app/admin/ps/actions", () => ({
  fetchPS: jest.fn(),
  onDelete: jest.fn(),
}));

describe("PSPage Component", () => {
  const mockData = [
    {
      id: 1,
      kategori: "PlayStation 5",
      harga: 500000,
      stok: 5,
    },
    {
      id: 2,
      kategori: "PlayStation 4",
      harga: 300000,
      stok: 3,
    },
  ];

  const mockPagination = {
    page: 1,
    limit: 10,
    total: 2,
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementations
    fetchPS.mockResolvedValue({
      data: mockData,
      pagination: mockPagination,
    });
  });

  it("renders the page with correct components", async () => {
    await render(await PSPage({ searchParams: {} }));

    // Check for key components
    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    // expect(screen.getByText('List of PS')).toBeInTheDocument();
    expect(screen.getByTestId("create-button")).toBeInTheDocument();
    expect(screen.getByTestId("paginated-table")).toBeInTheDocument();
  });

  it("passes correct props to PaginatedTable", async () => {
    const renderResult = await render(await PSPage({ searchParams: {} }));

    // Verify PaginatedTable receives correct props
    const paginatedTable = screen.getByTestId("paginated-table");

    // Check if data is rendered
    expect(paginatedTable).toHaveTextContent("PlayStation 5");
    expect(paginatedTable).toHaveTextContent("PlayStation 4");
  });

  it("handles pagination from search params", async () => {
    const searchParams = { page: "2", limit: "5" };
    await render(await PSPage({ searchParams }));

    // Verify fetchPS was called with correct parameters
    expect(fetchPS).toHaveBeenCalledWith({
      page: 2,
      limit: 5,
    });
  });

  it("uses default pagination when no search params provided", async () => {
    await render(await PSPage({ searchParams: {} }));

    // Verify fetchPS was called with default parameters
    expect(fetchPS).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });

  it("renders fallback when loading", async () => {
    // Simulate a slow data fetch by making fetchPS return a pending promise
    const fetchPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockData,
          pagination: mockPagination,
        });
      }, 3000); // Simulate 3 seconds delay
    });

    fetchPS.mockImplementation(() => fetchPromise);

    // Render the component
    const { getByText, queryByText } = render(
      await PSPage({ searchParams: {} })
    );

    // Check that the loading text is shown
    expect(getByText("Loading...")).toBeInTheDocument();

    // Wait for the data to be rendered
    await screen.findByText("PlayStation 5"); // Check that the data has rendered

    // Ensure that the loading state is no longer displayed
    expect(queryByText("Loading...")).toBeNull();
  }, 10000); // Increase timeout to 10 seconds for this test

  /**
   * Path 1: Both page and limit are defined.
   */
  it("should fetch data with page=2 and limit=5", async () => {
    const searchParams = { page: "2", limit: "5" };
    await render(await PSPage({ searchParams }));

    expect(fetchPS).toHaveBeenCalledWith({ page: 2, limit: 5 });
    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("paginated-table")).toHaveTextContent(
      "PlayStation 5 - 500000 - 5"
    );
  });

  /**
   * Path 2: Only page is defined.
   */
  it("should fetch data with page=3 and default limit=10", async () => {
    const searchParams = { page: "3" };
    await render(await PSPage({ searchParams }));

    expect(fetchPS).toHaveBeenCalledWith({ page: 3, limit: 10 });
    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
  });

  /**
   * Path 3: Only limit is defined.
   */
  it("should fetch data with limit=7 and default page=1", async () => {
    const searchParams = { limit: "7" };
    await render(await PSPage({ searchParams }));

    expect(fetchPS).toHaveBeenCalledWith({ page: 1, limit: 7 });
    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
  });

  /**
   * Path 4: Neither page nor limit are defined, defaults apply.
   */
  it("should use default pagination when no params are provided", async () => {
    await render(await PSPage({ searchParams: {} }));

    expect(fetchPS).toHaveBeenCalledWith({ page: 1, limit: 10 });
    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("paginated-table")).toHaveTextContent(
      "PlayStation 5 - 500000 - 5"
    );
  });

  /**
   * Path 5: Simulate slow fetch to test fallback loading behavior.
   */
  it("should show loading state during async fetch", async () => {
    const fetchPromise = new Promise((resolve) => {
      setTimeout(
        () => resolve({ data: mockData, pagination: mockPagination }),
        3000
      );
    });
    fetchPS.mockImplementation(() => fetchPromise);

    const { getByText, queryByText } = render(
      await PSPage({ searchParams: {} })
    );

    expect(getByText("Loading...")).toBeInTheDocument();

    await screen.findByText("PlayStation 5");
    expect(queryByText("Loading...")).toBeNull();
  }, 10000);

  it("has correct column configuration", async () => {
    await render(await PSPage({ searchParams: {} }));

    const paginatedTable = screen.getByTestId("paginated-table");

    // Verify columns are displayed
    expect(paginatedTable).toHaveTextContent("PlayStation 5 - 500000 - 5");
    expect(paginatedTable).toHaveTextContent("PlayStation 4 - 300000 - 3");
  });
});
