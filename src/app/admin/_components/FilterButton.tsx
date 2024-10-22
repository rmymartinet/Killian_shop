import { FilterType } from "@/types/dataTypes";

type FilterButtonProps = {
  label: string;
  filter: FilterType;
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const FilterButton = ({
  label,
  filter,
  currentFilter,
  setFilter,
}: FilterButtonProps) => {
  const isActive = currentFilter === filter;

  return (
    <button
      onClick={() => setFilter(filter)}
      className={`p-2 ${
        isActive
          ? "bg-blue-500 rounded-xl text-white"
          : "bg-gray-200 rounded-xl text-black"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
