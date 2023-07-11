import { useEffect, useState } from "react";
import { HiCheck, HiCheckCircle } from "react-icons/hi2";

export function AchievementCard({
  handleOpenCouponModal,
  handlePreviewAchievemenetLocations,
  uniqueUserBreweriesVisited,
  achievement,
  userCoupons,
}: any) {
  const [isActive, setIsActive] = useState(false);

  const countMatchingItems = (arr1: any, arr2: any) => {
    const idsArr1 = arr1.map((item: any) => item._id);
    const matchingItems = arr2.filter((item: any) => idsArr1.includes(item.id));
    return matchingItems.length;
  };

  const isAchievementComplete =
    countMatchingItems(
      achievement.achivementBreweries,
      uniqueUserBreweriesVisited
    ) === achievement.achivementBreweries.length
      ? true
      : false;

  useEffect(() => {
    const hasCouponBeenRedeemed = (achievement: any) => {
      const target = userCoupons.find(
        (coupon: any) => coupon.achievement === achievement._id
      );
      if (target) {
        setIsActive(target.isActive);
      }
    };
    hasCouponBeenRedeemed(achievement);
  }, []);

  return (
    <>
      <div
        key={achievement._id}
        className={`p-2 border-[1px] rounded-lg shadow ${
          isAchievementComplete ? "border-primary" : "border-base-200 "
        }`}
      >
        <div className="flex items-start gap-2">
          <div className=" flex flex-col h-24 w-full ">
            <div className="text-xl font-bold">{achievement.name}</div>
            <div className="flex-grow text-xs ">{achievement.description}</div>
            <div className="flex justify-between">
              <div className="font-bold text-sm flex items-center gap-1">
                {isAchievementComplete && (
                  <HiCheckCircle className="text-primary text-xl" />
                )}
                <div>
                  {countMatchingItems(
                    achievement.achivementBreweries,
                    uniqueUserBreweriesVisited
                  )}{" "}
                  / {achievement.achivementBreweries.length} completed
                </div>
                <button
                  onClick={() =>
                    handlePreviewAchievemenetLocations(achievement)
                  }
                  className="btn btn-xs"
                >
                  See Locations
                </button>
              </div>
              <div>
                {isAchievementComplete && (
                  <button
                    disabled={!isActive}
                    onClick={() => handleOpenCouponModal(achievement)}
                    className="btn btn-primary btn-xs"
                  >
                    {!isActive ? "Already Redeemed" : "redeem prize!"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
