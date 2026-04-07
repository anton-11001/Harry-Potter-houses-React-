import { useState, useEffect, type ChangeEvent } from "react";

import { API_URL } from "./constants";
import type { HouseType } from "./types";

import "./App.css";

import SearchInput from "./components/SearchInput";
import House from "./components/House";

function App() {
  const [houses, setHouses] = useState<HouseType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [traitSearchQueries, setTraitSearchQueries] = useState<
    Record<string, string>
  >({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setIsLoading(true);
        setError(null);

        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data: HouseType[] = await res.json();
        setHouses(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
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
          isLoading={isLoading}
          error={error}
        />
      ))}
    </div>
  );
}

export default App;
