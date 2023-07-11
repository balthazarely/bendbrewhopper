import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { LoginForm, RegisterForm } from "../components/forms";
// import { RootState } from "../store";

const LoginScreen: React.FC = () => {
  const [loginShowing, setLoginShowing] = useState(true);

  return (
    <div className="w-full border-2 border-red-500">
      <div className=" mx-auto">
        <div className="bg-base-200 mx-auto py-12 max-w-xs flex justify-center flex-col ">
          <div className="font-bold text-center flex flex-col gap-2 text-2xl text-primary  justify-center items-center ">
            {/* <BiDumbbell className="text-5xl text-base-100 rounded-full  p-1 bg-primary" /> */}
            Welcome to BendBrewHopper
          </div>
          <div className="w-full relative  overflow-x-hidden overflow-y-visible ">
            <div
              className={`transform transition-transform duration-200 px-3 py-6 ${
                loginShowing ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <LoginForm />
              <button
                onClick={() => setLoginShowing(false)}
                className="btn-link w-full text-sm  text-center mt-4 border-2"
              >
                Don&apos;t have an account? Sign up for a one.
              </button>
            </div>

            <div
              className={`w-full  px-3 py-6 absolute top-0 left-0 transform transition-transform duration-200 ${
                loginShowing ? "translate-x-full" : " translate-x-0"
              }`}
            >
              <RegisterForm />
              <button
                onClick={() => setLoginShowing(true)}
                className="btn-link text-sm w-full text-center mt-4 border-2"
              >
                Already have an account? Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
