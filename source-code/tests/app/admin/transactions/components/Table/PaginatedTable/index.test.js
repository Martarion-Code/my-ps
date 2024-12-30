import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaginatedTableTransaction from '@/app/admin/transactions/components/Table/PaginatedTable';
import { Table, Button, Modal } from 'antd';
import dayjs from 'dayjs';

// Mocking the necessary functions
jest.mock('@/app/admin/transactions/actions', () => ({
  onApproveTransaction: jest.fn(),
  onRejectTransaction: jest.fn(),
  onReturnTransaction: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockFetchData = jest.fn();

const mockPagination = {
  page: 1,
  limit: 10,
  total: 50,
};

const mockInitialData = [
  {
    id: '1',
    created_at: '2024-12-01',
    is_approve: null,
    is_returned: false,
  },
  {
    id: '2',
    created_at: '2024-12-02',
    is_approve: false,
    is_returned: false,
  },
];

describe('PaginatedTableTransaction', () => {
  beforeEach(() => {
    mockFetchData.mockResolvedValue({
      data: mockInitialData,
      pagination: mockPagination,
    });
  });

  it('renders table correctly with initial data', async () => {
    render(
      <PaginatedTableTransaction
        initialData={mockInitialData}
        initialPagination={mockPagination}
        fetchData={mockFetchData}
        columns={[
          { title: 'Created At', dataIndex: 'created_at' },
        ]}
      />
    );

    // Check if the table rows are rendered
    await waitFor(() => {
      expect(screen.getByText(dayjs(mockInitialData[0].created_at).format('DD-MM-YYYY'))).toBeInTheDocument();
      expect(screen.getByText(dayjs(mockInitialData[1].created_at).format('DD-MM-YYYY'))).toBeInTheDocument();
    });
  });

  it('handles pagination correctly when page changes', async () => {
    render(
      <PaginatedTableTransaction
        initialData={mockInitialData}
        initialPagination={mockPagination}
        fetchData={mockFetchData}
        columns={[
          { title: 'Created At', dataIndex: 'created_at' },
        ]}
      />
    );

    // Simulate changing the page
    fireEvent.click(screen.getByText('2'));

    // Check if the fetchData function was called with correct parameters
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith({
        page: 2,
        limit: 10,
      });
    });
  });

  it('handles search functionality', async () => {
    render(
      <PaginatedTableTransaction
        initialData={mockInitialData}
        initialPagination={mockPagination}
        fetchData={mockFetchData}
        columns={[
          { title: 'Created At', dataIndex: 'created_at' },
        ]}
      />
    );

    // Simulate searching
    const searchInput = screen.getByPlaceholderText('Search');
    userEvent.type(searchInput, '2024-12-01');
    userEvent.click(screen.getByText('Search'));

    // Check if the fetchData was called with the search term
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });
});
