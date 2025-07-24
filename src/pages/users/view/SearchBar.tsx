const SearchBar = ({
  inputRef,
  searchTerm,
  setSearchTerm,
  handlePageChange,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handlePageChange: (value: number) => void;
}) => {
  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search users by name or email..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        handlePageChange(1);
      }}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-600)] focus:outline-none focus:border-none"
    />
  );
};

export default SearchBar;
