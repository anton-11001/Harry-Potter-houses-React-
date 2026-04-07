import { type ChangeEvent } from "react";

type SearchInputProps = {
  searchQuery: string;
  handleSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function SearchInput({
  searchQuery,
  handleSearchQueryChange,
}: SearchInputProps) {
  return <input value={searchQuery} onChange={handleSearchQueryChange} />;
}

export default SearchInput;
