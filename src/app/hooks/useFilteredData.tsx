import axios from "axios";
import { useEffect, useState } from "react";

// Définir un type pour les articles
interface Pants {
  id: string;
  category: string;
  title: string;
  price: string;
  length: string;
  weight: string;
  material: string;
  imageUrls: string[];
  imageDetails: string[];
}
export function useItemsFiltered(filter: string) {
  const [data, setData] = useState<Pants[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Pants[]>("/api/products");
        console.log(response.data);
        const filteredData = response.data.filter(
          (item) => item.category === filter
        );
        setData(filteredData);
      } catch (error) {
        console.log(error);
        console.error("Error fetching items");
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  return { data, loading };
}
