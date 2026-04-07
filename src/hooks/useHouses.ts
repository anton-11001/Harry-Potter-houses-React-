import { useEffect, useState } from "react";

import { API_URL } from "../constants";
import type { HouseType } from "../types";

type UseHousesResult = {
  data: HouseType[];
  isLoading: boolean;
  error: string | null;
};

function useHouses(): UseHousesResult {
  const [data, setData] = useState<HouseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const houses: HouseType[] = await response.json();
        
        setData(houses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouses();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}

export default useHouses;
