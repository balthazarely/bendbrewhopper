import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useWindowSize } from "react-use";
import { useEffect } from "react";
import { closeDrawer } from "../../../slices/uiSlice";
import { Link, useNavigate } from "react-router-dom";

export function Drawer({ children }: any) {
  const navigate = useNavigate();

  const { drawerOpen } = useSelector((state: RootState) => state.ui);
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    if (width > 767) {
      dispatch(closeDrawer());
    }
  }, [width]);

  const handleLink = (navTo: string) => {
    navigate(navTo);
    dispatch(closeDrawer());
  };

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          checked={drawerOpen ? true : false}
          readOnly
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {children}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>
        <div className="drawer-side pt-20 ">
          <label
            htmlFor="my-drawer"
            onClick={() => dispatch(closeDrawer())}
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
            <li>
              <div onClick={() => handleLink("/how-it-works")}>
                How it Works
              </div>
            </li>
            <li>
              <div onClick={() => handleLink("/map")}>Brewery Map</div>
            </li>
            <li>
              <div onClick={() => handleLink("/passport")}>My Passport</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
