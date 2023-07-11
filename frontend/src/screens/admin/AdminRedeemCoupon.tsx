import { useLocation } from "react-router-dom";
import { PageWrapper } from "../../components/elements";
import {
  useGetCouponByIdQuery,
  useRedeemCouponMutation,
} from "../../slices/achievementSlice";

export default function AdminRedeemCoupon() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const { data: couponData, error } = useGetCouponByIdQuery(id);
  const [redeemCoupon] = useRedeemCouponMutation();

  const redeemHandler = async () => {
    await redeemCoupon(id);
  };

  return (
    <PageWrapper classname="mt-8 text-center">
      <div className="text-2xl mb-4 font-bold">Redeem Coupon Code</div>
      {!couponData ? (
        <div className="max-w-lg mx-auto text-sm  mb-">
          If customer has the app open, ask them to navigate to their
          Achievements and open the QR code which you can scan with your phone
          app.
        </div>
      ) : (
        <CouponCodeResults />
      )}
    </PageWrapper>
  );

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
