import { Data } from "@/types/dataTypes";
import axios from "axios";
import { useEffect, useState } from "react";

export function useFilteredData(filter?: string) {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Data[]>("/api/products");
        let filteredData = response.data;
        if (filter) {
          filteredData = response.data.filter(
            (item) => item.category === filter
          );
        }
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
