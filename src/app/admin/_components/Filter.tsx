import { FilterType } from "@/types/dataTypes";
import { FILTERS } from "@/utils/constant";
import FilterButton from "./FilterButton";

type FilterProps = {
  setFilter: (filter: FilterType) => void;
  currentFilter: FilterType;
};

const Filter = ({ setFilter, currentFilter }: FilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-10 w-full sm:w-auto">
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
