import { useLocation } from "react-router-dom";
import { PageWrapper } from "../../components/elements";
import {
  useGetCouponByIdQuery,
  useRedeemCouponMutation,
} from "../../slices/achievementSlice";
import { useState } from "react";

export default function AdminRedeemCoupon() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [manualCode, setManualCode] = useState("");
  const [submitManualCode, setSubmitManualCode] = useState(false);
  const { data: couponData, error } = useGetCouponByIdQuery(
    !submitManualCode ? id : manualCode
  );
  const [redeemCoupon, { isLoading: couponLoading }] =
    useRedeemCouponMutation();

  const manuallyEnterCode = (e: any) => {
    e.preventDefault();
    setSubmitManualCode(true);
  };

  const redeemHandler = async () => {
    await redeemCoupon(id);
  };

  return (
    <PageWrapper classname="mt-8 text-center">
      <div className="text-2xl mb-4 font-bold">Redeem Coupon Code</div>
      {couponData ? <CouponCodeResults /> : <ManuallyEnterCode />}
    </PageWrapper>
  );

  function ManuallyEnterCode() {
    return (
      <div className="max-w-lg mx-auto  rounded-3xl py-8 px-4 border-2 border-base-200 shadow-lg">
        <div className="text-lg font-bold mb-2">Enter Coupon Code</div>

        <input
          type="text"
          onChange={(e) => setManualCode(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button onClick={manuallyEnterCode} className="btn btn-primary">
          Submit
        </button>
      </div>
    );
  }

  function CouponCodeResults() {
    return (
      <div className="max-w-lg mx-auto  rounded-3xl py-8 px-4 border-2 border-base-200 shadow-lg">
        {couponData && (
          <div className="w-full flex gap-2 items-center flex-col">
            <div className="text-lg font-bold">{couponData.prize}</div>
            <div className="text-sm">Code: {couponData._id}</div>
            <div className="text-xs font-bold">
              status: {couponData.isActive ? "Active" : "Not Active"}
            </div>
            <button
              disabled={!couponData.isActive}
              onClick={redeemHandler}
              className={`btn btn-primary`}
            >
              {!couponData.isActive ? "Already redeebed" : "Redeem Code"}
            </button>
          </div>
        )}
      </div>
    );
  }
}
