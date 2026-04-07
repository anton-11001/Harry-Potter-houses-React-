import { type ChangeEvent } from "react";

type SearchInputProps = {
  searchQuery: string;
  handleSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function SearchInput({
  searchQuery,
  handleSearchQueryChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <input
      className="search-input"
      value={searchQuery}
      onChange={handleSearchQueryChange}
      placeholder={placeholder}
    />
  );
}

export default SearchInput;
