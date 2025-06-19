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
      className={`w-full sm:w-auto px-4 py-2 text-sm sm:text-base font-medium transition-colors duration-200 ${
        isActive
          ? "bg-blue-500 hover:bg-blue-600 rounded-xl text-white"
          : "bg-gray-200 hover:bg-gray-300 rounded-xl text-black"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
