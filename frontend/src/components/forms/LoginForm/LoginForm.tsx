import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../../slices/authSlice";
import { useLoginMutation } from "../../../slices/usersApiSlice";
import { toast } from "react-toastify";

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data.message || error?.error);
    }
  };
  return (
    <>
      <div className="font-bold mb-3 text-lg text-center ">Sign in</div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-xs " htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="input input-bordered input-primary w mt-1 py-1 px-2 bg-base-100 "
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
          className="input input-bordered input-primary w mt-1 py-1 px-2 bg-base-100 "
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
    </>
  );
}
