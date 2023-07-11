import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import { setCredentials } from "../../../slices/authSlice";

export function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  // const { userInfo } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confrimPassword, setConfrimPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfrimPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfrimPassword(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confrimPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error: any) {
        toast.error(error?.data.message || error?.error);
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="font-bold mb-3 text-lg text-center ">Create Account</div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-xs " htmlFor="email">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
          className="input input-bordered input-primary  mt-1 py-1 px-2 bg-base-100 "
        />

        <label className="text-xs mt-2 " htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="input input-bordered input-primary  mt-1 py-1 px-2 bg-base-100 "
        />

        <label className="text-xs mt-2 " htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="input input-bordered input-primary  mt-1 py-1 px-2 bg-base-100 "
        />

        <label className="text-xs mt-2 " htmlFor="password">
          Confrim Password:
        </label>
        <input
          type="password"
          id="confrim-password"
          value={confrimPassword}
          onChange={handleConfrimPasswordChange}
          required
          className="input input-bordered input-primary  mt-1 py-1 px-2 bg-base-100 "
        />
        <button
          className="btn btn-primary mt-2"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Sign In
        </button>
      </form>
      {isLoading ? "LOADING" : ""}
    </>
  );
}
