import React from "react";
import { PageWrapper } from "../components/elements";
import { TbBeerFilled } from "react-icons/tb";
import { IoIosJournal } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { BiSolidRightArrowAlt } from "react-icons/bi";

export default function HowItWorks() {
  return (
    <PageWrapper>
      <div className="text-2xl mt-8 font-bold text-center">
        Welcome to Tap Notes
      </div>
      <div className="flex gap-4 justify-center mt-6 items-center">
        <div className="flex items-center flex-col ">
          <TbBeerFilled className="text-5xl " />
          <div className="text-sm font-bold">Drink Beer</div>
        </div>
        <BiSolidRightArrowAlt className="text-3xl" />
        <div className="flex items-center flex-col">
          <IoIosJournal className="text-5xl" />
          <div className="font-bold text-sm">Log Visits</div>
        </div>
        <BiSolidRightArrowAlt className="text-3xl" />

        <div className="flex items-center flex-col">
          <GiReceiveMoney className="text-5xl" />
          <div className="font-bold text-sm">Earn Prizes</div>
        </div>
      </div>
      <div className="divider mx-auto max-w-sm"></div>
      <div className="text-md mt-4 text-center max-w-lg mx-auto">
        Ready to achieve greatness by drinking and reviewing beers at every
        single brewery/winery/cibery in Bend, OR? This app allows you to
        check-in to locations, rate what you drank, and complete achivements in
        order to reedem coupons for free stuff. To begin, either get within 100
        feet of a brewery and a card should popup below, allowing you to check
        in. You can always go to the brewery page and click "Check In" there,
        and enter the brewery code supplied by the brewery.
      </div>
    </PageWrapper>
  );
}
