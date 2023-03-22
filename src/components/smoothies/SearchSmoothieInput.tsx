import type { Dispatch, SetStateAction } from "react";

export const SearchSmoothieInput = ({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <input
      onChange={(e) => {
        setFilter(e.target.value);
      }}
      placeholder="Search Smoothie"
      className="input max-w-xs font-bold"
    />
  );
};
