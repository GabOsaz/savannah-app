import { render } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

/*
  We'll mock the usersCompLogic hook so that the Users component receives predictable props.
  The mock will be mutated per test via Object.assign.
*/

interface MockLogicReturnType {
  isInitialLoading: boolean;
  error: { message: string } | null;
  isLoading: boolean;
  users: Array<{ id: string; name: string; email: string; address: string }>;
  totalPages: number;
  searchTerm: string;
  currentPage: number;
  handleRowClick: (id: string) => void;
  handlePageChange: (page: number) => void;
  setSearchTerm: (value: string) => void;
  inputRef: { current: HTMLInputElement | null };
}

// A mutable object whose properties will be changed in individual tests
const mockLogicReturn: MockLogicReturnType = {} as unknown as MockLogicReturnType;

vi.mock('../pages/users/controller/usersCompLogic', () => {
  return {
    useUsersCompLogic: () => mockLogicReturn,
  };
});

// Because we mocked above, we can import Users afterwards so it picks up the mock
import Users from '../pages/users/index';

const createBaseLogic = () => ({
  isInitialLoading: false,
  error: null,
  isLoading: false,
  users: [],
  totalPages: 0,
  searchTerm: '',
  currentPage: 1,
  handleRowClick: vi.fn(),
  handlePageChange: vi.fn(),
  setSearchTerm: vi.fn(),
  inputRef: { current: null },
});

describe('Users page', () => {
  beforeEach(() => {
    // Reset mock object for every test
    Object.assign(mockLogicReturn, createBaseLogic());
  });

  it('renders Loader when in initial loading state', () => {
    mockLogicReturn.isInitialLoading = true;

    const { getByText } = render(<Users />);

    expect(getByText(/loading users/i)).toBeInTheDocument();
  });

  it('renders Error component when there is an error', () => {
    mockLogicReturn.error = { message: 'Failed to fetch' };

    const { getByText } = render(<Users />);

    expect(getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });

  it('renders heading and pagination when data is loaded', async () => {
    mockLogicReturn.users = [
      { id: '1', name: 'John Doe', email: 'john@example.com', address: '123 Ave' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', address: '456 Road' },
    ];
    mockLogicReturn.totalPages = 3;

    const { getByRole } = render(<Users />);

    // Heading
    expect(getByRole('heading', { name: /users/i })).toBeInTheDocument();

    // Pagination should be visible because totalPages > 1
    expect(getByRole('button', { name: /next/i })).toBeInTheDocument();

    // Test that clicking a pagination button calls handlePageChange
    const user = userEvent.setup();
    await user.click(getByRole('button', { name: /next/i }));
    expect(mockLogicReturn.handlePageChange).toHaveBeenCalled();
  });
}); 