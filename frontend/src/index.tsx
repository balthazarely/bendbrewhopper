import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import store from "./store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MapScreen from "./screens/MapScreen";
import BreweryScreen from "./screens/BreweryScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import { Provider } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminEditBrewery from "./screens/admin/AdminEditBrewery";
import PassportScreen from "./screens/PassportScreen";
import BeerScreen from "./screens/BeerScreen";
import HomeScreen from "./screens/HomeScreen";
import AdminRedeemCoupon from "./screens/admin/AdminRedeemCoupon";
import HowItWorks from "./screens/HowItWorks";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/brewery/:id" element={<BreweryScreen />} />
        <Route path="/beer/:id" element={<BeerScreen />} />
        <Route path="/passport" element={<PassportScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/admin/edit-brewery/:id" element={<AdminEditBrewery />} />
        <Route path="/admin/redeem-coupon" element={<AdminRedeemCoupon />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
