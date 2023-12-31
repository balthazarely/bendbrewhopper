import {
  useCreateCouponMutation,
  useGetAchievementsQuery,
  useGetUserCouponsQuery,
} from "../../../slices/achievementSlice";
import { FullPageLoader } from "../../elements";
import { AchievementBreweryModal, CouponModal } from "..";
import { useState } from "react";
import { AchievementCard } from "../AchievementCard";
import { Achievement, Coupon, UserPassport } from "../../../types";

export function AchievementsSection({
  userPassportData,
}: {
  userPassportData: UserPassport;
}) {
  const { data: achievements, isLoading: achievementsLoading } =
    useGetAchievementsQuery({});
  const { data: userCoupons } = useGetUserCouponsQuery({});
  const [createCoupon] = useCreateCouponMutation({});

  // Local State
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponModalOpen, setCouponModalOpen] = useState<boolean>(false);
  const [achievementToPreview, setAchievementToPreview] =
    useState<Achievement | null>(null);
  const [achievementPreviewModalOpen, setAchievementPreviewModalOpen] =
    useState<boolean>(false);

  const handlePreviewAchievemenetLocations = (achievement: Achievement) => {
    setAchievementToPreview(achievement);
    setAchievementPreviewModalOpen(true);
  };

  const handleOpenCouponModal = async (achievement: Achievement) => {
    const coupon = userCoupons.find(
      (userCoupon: Coupon) => userCoupon.achievement === achievement._id
    );
    if (!coupon) {
      const createdCoupon = await createCoupon({
        prize: achievement.prize,
        achievement: achievement._id,
      }).unwrap();
      setActiveCoupon(createdCoupon);
    } else {
      setActiveCoupon(coupon);
    }
    setCouponModalOpen(true);
  };

  const userBreweriesVisited = userPassportData?.breweriesVisited?.map(
    (breweryVisit: any) => {
      return {
        name: breweryVisit.brewery.name,
        id: breweryVisit.brewery._id,
      };
    }
  );

  const uniqueUserBreweriesVisited = Array.from(
    new Set(userBreweriesVisited.map((brewery: any) => brewery.id))
  ).map((id) => userBreweriesVisited.find((brewery: any) => brewery.id === id));

  if (achievementsLoading) {
    return <FullPageLoader classes="h-56" />;
  }

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
      {achievements?.map((achievement: Achievement) => {
        return (
          <AchievementCard
            key={achievement._id}
            handleOpenCouponModal={handleOpenCouponModal}
            handlePreviewAchievemenetLocations={
              handlePreviewAchievemenetLocations
            }
            uniqueUserBreweriesVisited={uniqueUserBreweriesVisited}
            achievement={achievement}
            userCoupons={userCoupons}
          />
        );
      })}
      <AchievementBreweryModal
        achievementToPreview={achievementToPreview}
        achievementPreviewModalOpen={achievementPreviewModalOpen}
        setAchievementPreviewModalOpen={setAchievementPreviewModalOpen}
      />
      <CouponModal
        couponModalOpen={couponModalOpen}
        setCouponModalOpen={setCouponModalOpen}
        activeCoupon={activeCoupon}
      />
    </div>
  );
}
