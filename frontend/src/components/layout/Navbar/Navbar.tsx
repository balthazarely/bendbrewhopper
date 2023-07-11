import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import { PageWrapper } from "../../elements";
import { TbBeer } from "react-icons/tb";
import { LiaBeerSolid } from "react-icons/lia";
import { Cross as Hamburger } from "hamburger-react";
import { closeDrawer, openDrawer } from "../../../slices/uiSlice";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { drawerOpen } = useSelector((state: RootState) => state.ui);

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDrawer = () => {
    if (!drawerOpen) {
      dispatch(openDrawer());
    } else {
      dispatch(closeDrawer());
    }
  };

  const parseNameForAvatar = (name: string) =>
    name
      .split(" ")
      .map((word: string) => word[0].toUpperCase())
      .join("");

  return (
    <div className="w-full fixed h-20 flex items-center bg-base-100 shadow-md z-50 ">
      <PageWrapper classname="w-full gap-4 flex justify-between  items-center">
        <div className="flex gap-2">
          <button className=" h-12 w-12 flex justify-center items-center md:hidden btn p-0">
            <Hamburger size={24} toggle={toggleDrawer} toggled={drawerOpen} />
          </button>
          <Link
            to="/"
            className="text-2xl font-bold text-accent-content flex items-center"
          >
            <LiaBeerSolid className="text-4xl" />
            {/* <TbBeer className="text-4xl" /> */}
            <span className="text-primary">Tap</span>Notes
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Link
              to="/how-it-works"
              className="btn btn-ghost btn-sm capitalize"
            >
              How it works
            </Link>
          </div>
          {userInfo ? (
            <>
              <div className="hidden md:block">
                <Link to="/map" className="btn btn-ghost btn-sm capitalize">
                  Brewery Map
                </Link>
                <Link
                  to="/passport"
                  className="btn btn-ghost btn-sm capitalize"
                >
                  My Passport
                </Link>
              </div>
              <LoggedInView />
            </>
          ) : (
            <Link to={"/login"} className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </PageWrapper>
    </div>
  );

  function LoggedInView() {
    return (
      <div className="dropdown dropdown-end z-50">
        <label tabIndex={0}>
          <button className="btn btn-ghost btn-circle avatar">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                <span className="text-xs">
                  {userInfo && parseNameForAvatar(userInfo?.name)}
                </span>
              </div>
            </div>
          </button>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu w-52 rounded-md bg-base-100 shadow  "
        >
          {userInfo?.isAdmin ? (
            <>
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/redeem-coupon">Redeem Coupons</Link>
              </li>
            </>
          ) : (
            <li>
              <a>Profile</a>
            </li>
          )}
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button className=" py-2 px-4 " onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
