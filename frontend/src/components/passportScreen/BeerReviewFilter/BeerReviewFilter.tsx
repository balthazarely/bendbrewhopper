import { FilterProps } from "../BeerReviewsSection/BreweryReviewsSection";

interface BeerReviewFilterProps {
  name: string;
  filterItem: string[];
  selectedFilters: any;
  handleFilterClick: (item: any, name: any) => void;
}

export function BeerReviewFilter({
  name,
  filterItem,
  selectedFilters,
  handleFilterClick,
}: BeerReviewFilterProps) {
  return (
    <div className="">
      <div className="font-bold text-sm capitalize mt-4 ">{name}</div>
      <div
        className="divider my-0
      "
      ></div>
      {filterItem?.map((item: string) => {
        return (
          <div className="flex items-center" key={item}>
            <input
              type="checkbox"
              id={item}
              checked={selectedFilters[name].includes(item)}
              onChange={() => handleFilterClick(item, name)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <label htmlFor={item} className="label text-xs font-bold">
              {item}
            </label>
          </div>
        );
      })}
    </div>
  );
}
