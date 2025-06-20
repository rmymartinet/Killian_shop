"use client";

import { FilterType } from "@/types/dataTypes";
import { FILTERS } from "@/utils/constant";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddComponent from "./_components/AddComponent";
import DeleteComponent from "./_components/DeleteComponent";
import Filter from "./_components/Filter";
import UpdateComponent from "./_components/UpdateComponent";

const AdminPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>(FILTERS.AJOUTER);

  useEffect(() => {
    if (
      isLoaded &&
      (!user ||
        !user.publicMetadata.role ||
        user.publicMetadata.role !== "admin")
    ) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-20 mt-[30vh]">
      <Filter setFilter={setFilter} currentFilter={filter} />
      {filter === FILTERS.AJOUTER && <AddComponent />}
      {filter === FILTERS.SUPPRIMER && <DeleteComponent />}
      {filter === FILTERS.MAJ && <UpdateComponent />}
    </div>
  );
};

export default AdminPage;
