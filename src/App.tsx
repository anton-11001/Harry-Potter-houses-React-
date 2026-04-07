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
    return <p className="status-message">Loading...</p>;
  }

  if (error) {
    return <p className="status-message status-message--error">{error}</p>;
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Houses Explorer</h1>
        <p className="app__description">
          Browse wizard houses and filter their traits
        </p>
      </header>

      <section className="app__search">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
          placeholder="Search houses..."
        />
      </section>

      <section className="houses-grid">
        {filteredHouses.map((house) => (
          <House
            key={house.id}
            house={house}
            traitSearchQuery={traitSearchQueries[house.id] ?? ""}
            onTraitSearchChange={handleTraitSearchChange}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
