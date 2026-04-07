import { useState, useEffect, type ChangeEvent } from "react";

import { API_URL } from "./constants";
import type { House } from "./types";

import "./App.css";

type SearchInputProps = {
  searchQuery: string;
  handleSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type HouseProps = {
  house: House;
  traitSearchQuery: string;
  onTraitSearchChange: (houseId: string, value: string) => void;
};

const SearchInput = ({
  searchQuery,
  handleSearchQueryChange,
}: SearchInputProps) => {
  return <input value={searchQuery} onChange={handleSearchQueryChange} />;
};

const House = ({
  house,
  traitSearchQuery,
  onTraitSearchChange,
}: HouseProps) => {
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
};

function App() {
  const [houses, setHouses] = useState<House[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [traitSearchQueries, setTraitSearchQueries] = useState<
    Record<string, string>
  >({});

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTraitSearchChange = (houseId: string, value: string) => {
    setTraitSearchQueries((prev) => ({
      ...prev,
      [houseId]: value,
    }));
  };

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch(API_URL);
        const data: House[] = await res.json();
        setHouses(data);
      } catch (error) {}
    };

    fetchHouses();
  }, []);

  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="App">
      <SearchInput
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
      />

      {filteredHouses.map((house) => (
        <House
          key={house.id}
          house={house}
          traitSearchQuery={traitSearchQueries[house.id] ?? ""}
          onTraitSearchChange={handleTraitSearchChange}
        />
      ))}
    </div>
  );
}

export default App;
