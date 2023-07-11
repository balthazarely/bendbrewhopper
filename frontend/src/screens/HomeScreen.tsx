import { useEffect, useState } from "react";
import { FullPageLoader, PageWrapper } from "../components/elements";
import { calcBreweryDistance } from "../utils/mapFunctions";
import { Brewery, UserLocation } from "../types";
import { useGetBreweriesQuery } from "../slices/brewerySlice";
import { NearBeweryCard } from "../components/homeScreen/NearBeweryCard";
import { CheckInModal } from "../components/breweryScreen";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { HiInformationCircle } from "react-icons/hi";

export default function HomeScreen() {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <PageWrapper>
      <div className="mt-8">
        <div>
          <div className="text-3xl font-bold text-primary">
            Welcome, {userInfo?.name}!
          </div>
          <div className="divider"></div>
        </div>
        <div className="text-center text-lg font-bold mb-2">
          Breweries Close By
          <div
            className="tooltip ml-1"
            data-tip="When you're within 100ft of a brewery, you can check in without a code"
          >
            <HiInformationCircle />
          </div>
        </div>
        <div>
          <CloseBreweriesCards />
        </div>
      </div>
    </PageWrapper>
  );

  function CloseBreweriesCards() {
    const { data: breweries } = useGetBreweriesQuery({});
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [sortedBreweries, setSortedBreweries] = useState<any>(null);
    const [checkInBrewries, setCheckInBrewries] = useState<any>(null);
    const [checkInModalOpen, setCheckInModalOpen] = useState(false);

    useEffect(() => {
      const fetchUserLocation = async () => {
        try {
          // const userLocation = await getUserCoordinates();
          const testCoords = {
            latitude: 44.05960988591935,
            longitude: -121.3115202399456,
          };

          setUserLocation(testCoords);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserLocation();
    }, []);

    useEffect(() => {
      if (userLocation && breweries) {
        const sortedBreweriesForPanel = calcBreweryDistance(
          breweries,
          userLocation.latitude,
          userLocation.longitude
        )
          .sort((a: any, b: any) => a.distanceTo - b.distanceTo)
          .filter((brewery: any) => brewery.distanceTo < 150);

        setSortedBreweries(sortedBreweriesForPanel);
      }
    }, [userLocation, breweries]);

    const handleCheckIn = (brewery: any) => {
      setCheckInBrewries(brewery);
      setCheckInModalOpen(true);
    };

    if (!userLocation && !sortedBreweries) {
      return (
        <div>
          <FullPageLoader />
        </div>
      );
    }
    return (
      <div className="flex justify-center">
        {sortedBreweries?.map((brewery: Brewery) => {
          return (
            <NearBeweryCard handleCheckIn={handleCheckIn} brewery={brewery} />
          );
        })}

        <CheckInModal
          isBreweryInProximity={true}
          brewery={checkInBrewries}
          checkInModalOpen={checkInModalOpen}
          setCheckInModalOpen={setCheckInModalOpen}
        />
      </div>
    );
  }
}
