import axios from "axios";
import { useEffect, useState } from "react";

// Définir un type pour les articles
interface Pant {
  id: number;
  name: string;
  price: number;
  category: string;
}

export function useItemsFiltered(filter: string) {
  const [data, setData] = useState<Pant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Pant[]>("/api/pants");
        const filteredData = response.data.filter(
          (item) => item.category === filter
        );
        setData(filteredData);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  return { data, loading, error };
}
