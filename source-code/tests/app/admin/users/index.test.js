import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersPage from "@/app/admin/users/page.jsx";
import { fetchUsers, onDeleteUser } from "@/app/admin/users/actions";

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

jest.mock("@/app/admin/users/actions", () => ({
  fetchUsers: jest.fn(),
  onDeleteUser: jest.fn(),
}));

describe("UsersPage", () => {
  const mockUserData = {
    data: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
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


  it("renders the create button", async () => {
    fetchUsers.mockResolvedValue(mockUserData);

    render(await UsersPage({ searchParams: {} }));

    const createButton = screen.getByTestId("button-create");
    expect(createButton).toBeInTheDocument();
  });

  it("passes correct columns to PaginatedTable", async () => {
    fetchUsers.mockResolvedValue(mockUserData);

    render(await UsersPage({ searchParams: {} }));

    const paginatedTable = screen.getByTestId("paginated-table");
    expect(paginatedTable).toBeInTheDocument();

    // Check if columns are correctly defined
    expect(paginatedTable).toHaveTextContent("Name");
    expect(paginatedTable).toHaveTextContent("Email");
  });

  it("fetches users with default pagination", async () => {
    fetchUsers.mockResolvedValue(mockUserData);

    render(await UsersPage({ searchParams: {} }));

    // Verify fetchUsers was called with default values
    expect(fetchUsers).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
    });
  });

  it("fetches users with custom pagination", async () => {
    fetchUsers.mockResolvedValue(mockUserData);

    render(
      await UsersPage({
        searchParams: {
          page: "2",
          limit: "20",
        },
      })
    );

    // Verify fetchUsers was called with custom values
    expect(fetchUsers).toHaveBeenCalledWith({
      page: 2,
      limit: 20,
    });
  });
});
