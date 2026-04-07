import { useState, type ChangeEvent } from "react";

import "./App.css";

import SearchInput from "./components/SearchInput";
import House from "./components/House";
import useHouses from "./hooks/useHouses";

function App() {
  const { data: houses, isLoading, error } = useHouses();

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

  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
