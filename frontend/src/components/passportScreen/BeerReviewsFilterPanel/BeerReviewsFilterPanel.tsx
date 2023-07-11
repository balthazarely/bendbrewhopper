import { BeerReviewFilter } from "..";
import { Review } from "../../../types";
import { FilterProps } from "../BeerReviewsSection/BreweryReviewsSection";

interface BeerReviewsFilterPanelProps {
  setSelectedFilter: (data: any) => void;
  userReviews: Review[];
  selectedFilter: FilterProps;
}

export function BeerReviewsFilterPanel({
  setSelectedFilter,
  userReviews,
  selectedFilter,
}: BeerReviewsFilterPanelProps) {
  const handleIt = (item: any, name: any) => {
    setSelectedFilter((prevState: any) => ({
      ...prevState,
      [name]: prevState[name].includes(item)
        ? prevState[name].filter((f: any) => f !== item)
        : [...prevState[name], item],
    }));
  };

  const beerStyles: string[] = Array.from(
    new Set(userReviews?.map((review: Review) => review?.beerId?.style))
  );
  const breweries: string[] = Array.from(
    new Set(userReviews?.map((review: Review) => review.breweryId.name))
  );

  return (
    <div className=" col-span-1 rounded-lg p-2 ">
      <BeerReviewFilter
        name="style"
        filterItem={beerStyles}
        handleFilterClick={handleIt}
        selectedFilters={selectedFilter}
      />
      <BeerReviewFilter
        name="brewery"
        filterItem={breweries}
        handleFilterClick={handleIt}
        selectedFilters={selectedFilter}
      />
    </div>
  );
}
