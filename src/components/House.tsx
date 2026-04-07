import SearchInput from "./SearchInput";

import type { HouseType } from "../types";

type HouseProps = {
  house: HouseType;
  traitSearchQuery: string;
  onTraitSearchChange: (houseId: string, value: string) => void;
};

function House({ house, traitSearchQuery, onTraitSearchChange }: HouseProps) {
  const filteredTraits =
    house.traits?.filter((trait) =>
      trait.name.toLowerCase().includes(traitSearchQuery.toLowerCase()),
    ) ?? [];

  return (
    <article className="house-card">
      <div className="house-card__header">
        <h2 className="house-card__title">{house.name}</h2>
        <p className="house-card__subtitle">{house.founder}</p>
      </div>

      <SearchInput
        searchQuery={traitSearchQuery}
        handleSearchQueryChange={(event) =>
          onTraitSearchChange(house.id, event.target.value)
        }
        placeholder="Search traits..."
      />

      {filteredTraits.length > 0 ? (
        <ul className="traits-list">
          {filteredTraits.map((trait) => (
            <li key={trait.id} className="traits-list__item">
              {trait.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="house-card__empty">No matching traits found</p>
      )}
    </article>
  );
}

export default House;
