import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SearchBar from '../pages/users/view/SearchBar';

describe('SearchBar component', () => {
  it('renders with placeholder text', () => {
    const setSearchTerm = vi.fn();
    const handlePageChange = vi.fn();
    const inputRef = { current: null };

    const { getByPlaceholderText } = render(
      <SearchBar
        inputRef={inputRef}
        searchTerm=""
        setSearchTerm={setSearchTerm}
        handlePageChange={handlePageChange}
      />
    );

    expect(getByPlaceholderText(/search users by name or email/i)).toBeInTheDocument();
  });

  it('calls setSearchTerm and handlePageChange when input changes', async () => {
    const setSearchTerm = vi.fn();
    const handlePageChange = vi.fn();
    const inputRef = { current: null };
    const user = userEvent.setup();

    const { getByPlaceholderText } = render(
      <SearchBar
        inputRef={inputRef}
        searchTerm=""
        setSearchTerm={setSearchTerm}
        handlePageChange={handlePageChange}
      />
    );

    const input = getByPlaceholderText(/search users by name or email/i);
    await user.type(input, 'john');

    // Check that setSearchTerm was called for each character
    expect(setSearchTerm).toHaveBeenCalledTimes(4);
    expect(setSearchTerm).toHaveBeenNthCalledWith(1, 'j');
    expect(setSearchTerm).toHaveBeenNthCalledWith(2, 'o');
    expect(setSearchTerm).toHaveBeenNthCalledWith(3, 'h');
    expect(setSearchTerm).toHaveBeenNthCalledWith(4, 'n');
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('displays the current search term', () => {
    const setSearchTerm = vi.fn();
    const handlePageChange = vi.fn();
    const inputRef = { current: null };

    const { getByDisplayValue } = render(
      <SearchBar
        inputRef={inputRef}
        searchTerm="test search"
        setSearchTerm={setSearchTerm}
        handlePageChange={handlePageChange}
      />
    );

    expect(getByDisplayValue('test search')).toBeInTheDocument();
  });
}); 