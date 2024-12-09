import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, Button } from 'antd';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import PaginatedTable from '../../../../src/components/Table/PaginatedTable';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('antd', () => ({
  Table: jest.fn(({ columns, dataSource, pagination, onChange }) => (
    <div data-testid="mock-table">
      {dataSource.map((item, index) => (
        <div key={index}>
          {columns.map((col) => (
            <span key={col.key}>
              {col.render ? col.render(item, item) : item[col.dataIndex]}
            </span>
          ))}
        </div>
      ))}
    </div>
  )),
  Button: jest.fn(({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>{children}</button>
  )),
}));

describe('PaginatedTable Component', () => {
  const mockInitialData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const mockInitialPagination = {
    page: 1,
    limit: 10,
    total: 20,
  };

  const mockColumns = [
    { 
      key: 'name', 
      title: 'Name', 
      dataIndex: 'name' 
    },
    { 
      key: 'email', 
      title: 'Email', 
      dataIndex: 'email' 
    },
  ];

  const mockFetchData = jest.fn().mockResolvedValue({
    data: mockInitialData,
    pagination: mockInitialPagination,
  });

  const mockOnDelete = jest.fn();
  const mockRouterPush = jest.fn();
  const mockRouterRefresh = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock implementations
    (useRouter).mockReturnValue({
      push: mockRouterPush,
      refresh: mockRouterRefresh,
    });
    (usePathname).mockReturnValue('/test-path');
    (useSearchParams).mockReturnValue(new URLSearchParams());
  });

  it('renders the table with initial data', () => {
    render(
      <PaginatedTable
        initialData={mockInitialData}
        initialPagination={mockInitialPagination}
        columns={mockColumns}
        fetchData={mockFetchData}
      />
    );

    // Verify table rendering
    const table = screen.getByTestId('mock-table');
    expect(table).toBeInTheDocument();
  });

  it('renders delete column when onDelete is provided', () => {
    render(
      <PaginatedTable
        initialData={mockInitialData}
        initialPagination={mockInitialPagination}
        columns={mockColumns}
        fetchData={mockFetchData}
        onDelete={mockOnDelete}
      />
    );

    // Verify delete buttons are rendered
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(mockInitialData.length);
  });

  it('handles delete action correctly', async () => {
    mockOnDelete.mockResolvedValue(true);

    render(
      <PaginatedTable
        initialData={mockInitialData}
        initialPagination={mockInitialPagination}
        columns={mockColumns}
        fetchData={mockFetchData}
        onDelete={mockOnDelete}
      />
    );

    // Find and click the first delete button
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Verify delete function was called with correct ID
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
  });

  it('handles table pagination change', async () => {
    render(
      <PaginatedTable
        initialData={mockInitialData}
        initialPagination={mockInitialPagination}
        columns={mockColumns}
        fetchData={mockFetchData}
      />
    );

    // Simulate table change
    const tableChangeArgs = {
      current: 2,
      pageSize: 10,
      total: 20,
    };

    // Find the Table component and trigger onChange
    const tableProps = (Table).mock.calls[0][0];
    await tableProps.onChange(tableChangeArgs);

    // Verify router methods and fetch data were called
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/test-path?page=2&limit=10');
      expect(mockFetchData).toHaveBeenCalledWith({
        page: 2,
        limit: 10,
      });
      expect(mockRouterRefresh).toHaveBeenCalled();
    });
  });
});