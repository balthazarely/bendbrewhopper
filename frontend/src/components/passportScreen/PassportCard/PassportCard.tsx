import { Link } from "react-router-dom";
import { convertToReadableDate } from "../../../utils/dateFuncitons";
import { CloudImage } from "../../elements";
import { HiTrash } from "react-icons/hi";
import { Beer } from "../../../types";

export function PassportCard({
  brewery: breweryVisitInfo,
  setPassportForDeletion,
  setConfrimActionModalOpen,
}: any) {
  return (
    <div className={`flex flex-col gap-1 p-2 rounded-lg shadow`}>
      <div className="w-full h-44 group flex justify-center items-center overflow-hidden  bg-gray-300 rounded-lg relative">
        <CloudImage
          classes=" object-cover "
          image={breweryVisitInfo?.brewery?.image}
          width={400}
          height={300}
        />
        <button
          className="btn btn-sm  group-hover:visible invisible join-item absolute top-1 right-1"
          onClick={() => {
            setPassportForDeletion({
              id: breweryVisitInfo?._id,
              name: breweryVisitInfo?.brewery?.name,
            });
            setConfrimActionModalOpen(true);
          }}
        >
          <HiTrash />
        </button>
      </div>
      <div className="flex justify-between flex-col py-1   ">
        <div>
          <Link
            className="font-extrabold text-lg"
            to={`/brewery/${breweryVisitInfo?.brewery?._id}`}
          >
            {breweryVisitInfo?.brewery?.name}
          </Link>
          <div className="text-xs italic">
            Visited on {convertToReadableDate(breweryVisitInfo?.timestamp)}
          </div>
        </div>
        <div className="2 flex justify-between items-end">
          <div>
            {breweryVisitInfo?.beers?.length !== 0 && (
              <>
                <div className="font-bold text-sm mt-2">Beers Sampled:</div>
                <div className="flex gap-1">
                  {breweryVisitInfo?.beers.map((beer: Beer) => {
                    return (
                      <div key={beer._id} className="text-xs">
                        {beer.name},
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
