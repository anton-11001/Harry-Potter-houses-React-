import "./styles.css";
import { useState, useEffect } from "react";

const API_URL = "https://wizard-world-api.herokuapp.com/houses";

const SearchInput = ({ searchQuery, handleSearchQueryChange }) => {
  return <input value={searchQuery} onChange={handleSearchQueryChange} />;
};

const House = ({ house, traitSearchQuery, onTraitSearchChange }) => {
  const filteredTraits =
    house.traits?.filter((trait) =>
      trait.name.toLowerCase().includes(traitSearchQuery.toLowerCase())
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

export default function App() {
  const [houses, setHouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [traitSearchQueries, setTraitSearchQueries] = useState({});

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTraitSearchChange = (houseId, value) => {
    setTraitSearchQueries((prev) => ({
      ...prev,
      [houseId]: value,
    }));
  };

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setHouses(data);
      } catch (error) {}
    };

    fetchHouses();
  }, []);

  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(searchQuery.toLowerCase())
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
