import { PageHeader, PageWrapper } from "../components/elements";
import {
  BeerReviewsSection,
  PassportSection,
} from "../components/passportScreen";
import { useState } from "react";
import { AchievementsSection } from "../components/passportScreen/AchievementsSection";
import { useGetUserProfileQuery } from "../slices/passportSlice";
import { FaPassport } from "react-icons/fa";

export default function PassportScreen() {
  const { data: userPassportData, isLoading: loadingUserPassportData } =
    useGetUserProfileQuery({});
  const [activeTab, setActiveTab] = useState<string>("passport");

  return (
    <PageWrapper>
      <div className="mt-8 mb-4 flex gap-2 items-center">
        <FaPassport className="text-2xl" />
        <div className={`text-2xl font-bold`}>My Passport</div>
      </div>
      <div className="flex">
        <div className="tabs tabs-boxed ">
          <a
            className={`tab cursor-pointer ${
              activeTab === "passport" && "tab-active"
            }`}
            onClick={() => setActiveTab("passport")}
          >
            Passport
          </a>
          <a
            className={`tab cursor-pointer ${
              activeTab === "reviews" && "tab-active"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Beer Reviews
          </a>
          <a
            className={`tab  cursor-pointer ${
              activeTab === "achievements" && "tab-active"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            My Achievements
          </a>
        </div>
      </div>
      {activeTab === "passport" && (
        <PassportSection
          loadingUserPassportData={loadingUserPassportData}
          userPassportData={userPassportData}
        />
      )}
      {activeTab === "reviews" && <BeerReviewsSection />}
      {activeTab === "achievements" && (
        <AchievementsSection userPassportData={userPassportData} />
      )}
    </PageWrapper>
  );
}
