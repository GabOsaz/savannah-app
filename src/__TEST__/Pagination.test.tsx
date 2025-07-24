import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../components/Pagination';
import { vi } from 'vitest';

describe('Pagination component', () => {
  it('disables Previous button on first page and enables Next button', async () => {
    const onPageChange = vi.fn();
    const { getByRole } = render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

    const previousButton = getByRole('button', { name: /previous/i });
    const nextButton = getByRole('button', { name: /next/i });

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  it('renders correct visible page numbers on first page', () => {
    const onPageChange = vi.fn();
    const { getByRole, getAllByText } = render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

    // Visible pages should be 1,2,3,...,8,9,10
    [1, 2, 3, 8, 9, 10].forEach((page) => {
      expect(getByRole('button', { name: String(page) })).toBeInTheDocument();
    });
    expect(getAllByText('...').length).toBeGreaterThanOrEqual(1);
  });

  it('calls onPageChange with the correct value when Next or a page button is clicked', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    const { getByRole } = render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

    // Click page 2 button
    await user.click(getByRole('button', { name: '2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    // Click Next button
    await user.click(getByRole('button', { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(2); // currentPage + 1
  });
}); 