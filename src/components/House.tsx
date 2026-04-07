import SearchInput from "./SearchInput";

import type { HouseType } from "../types";

type HouseProps = {
  house: HouseType;
  traitSearchQuery: string;
  onTraitSearchChange: (houseId: string, value: string) => void;
  isLoading: boolean;
  error: string | null;
};

function House({
  house,
  traitSearchQuery,
  onTraitSearchChange,
  isLoading,
  error,
}: HouseProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredTraits =
    house.traits?.filter((trait) =>
      trait.name.toLowerCase().includes(traitSearchQuery.toLowerCase()),
    ) ?? [];

  return (
    <div style={{ border: "1px solid", padding: "8px", margin: "8px" }}>
      <h3>{house.name}</h3>
      <SearchInput
        searchQuery={traitSearchQuery}
        handleSearchQueryChange={(event) =>
          onTraitSearchChange(house.id, event.target.value)
        }
      />
      <ul>
        {filteredTraits.map((trait) => (
          <li key={trait.id}>{trait.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default House;
