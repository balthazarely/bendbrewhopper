import { HiX } from "react-icons/hi";
import { Coupon } from "../../../types";

interface CouponModalProps {
  activeCoupon: Coupon | null;
  couponModalOpen: boolean;
  setCouponModalOpen: (state: boolean) => void;
}

export function CouponModal({
  activeCoupon,
  couponModalOpen,
  setCouponModalOpen,
}: CouponModalProps) {
  return (
    <div>
      <input
        type="checkbox"
        checked={couponModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => {
              setCouponModalOpen(false);
            }}
          >
            <HiX />
          </button>
          <div className="">
            <div className="text-2xl font-bold text-center mb-4">
              Coupon Modal
            </div>
            {activeCoupon && <img src={activeCoupon.qrCode} alt="QR Code" />}
          </div>
        </div>
      </div>
    </div>
  );
}
