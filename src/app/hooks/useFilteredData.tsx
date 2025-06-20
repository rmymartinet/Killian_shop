import { Data } from "@/types/dataTypes";
import { useEffect, useState } from "react";

export function useFilteredData(filter?: string) {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Error fetching items");
        }

        const responseData = await response.json();

        let filteredData = responseData;
        if (filter) {
          filteredData = responseData.filter(
            (item: Data) => item.category === filter
          );
        }
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching items", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  return { data, loading };
}
