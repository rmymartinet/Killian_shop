import { FilterType } from "@/types/dataTypes";
import { FILTERS } from "@/utils/constant";
import FilterButton from "./FilterButton";

type FilterProps = {
  setFilter: (filter: FilterType) => void;
  currentFilter: FilterType;
};

const Filter = ({ setFilter, currentFilter }: FilterProps) => {
  return (
    <div className="flex gap-10 text-xl">
      <FilterButton
        label="Ajouter"
        filter={FILTERS.AJOUTER}
        currentFilter={currentFilter}
        setFilter={setFilter}
      />
      <FilterButton
        label="Supprimer"
        filter={FILTERS.SUPPRIMER}
        currentFilter={currentFilter}
        setFilter={setFilter}
      />
      <FilterButton
        label="Mettre à jour"
        filter={FILTERS.MAJ}
        currentFilter={currentFilter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default Filter;
