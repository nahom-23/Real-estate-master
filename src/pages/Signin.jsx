import React, { useState } from "react";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
export default function Signin() {
  const [showPassword, setshowPassword] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onchange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }
  function toggleShowPassword() {
    setshowPassword(!showPassword);
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign-In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://t4.ftcdn.net/jpg/02/74/46/85/360_F_274468500_RVmpSSsQIdo9iQYotCCXlKYGDi40fNnw.jpg"
            alt="key-image"
            className="max-w-[95%] rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={onchange}
              placeholder="Email Address"
            ></input>
            <div className="relative mb-6">
              <input
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
                type={showPassword ? "password" : "text"}
                id="password"
                value={password}
                onChange={onchange}
                placeholder="Password"
              ></input>
              {showPassword ? (
                <IoIosEye
                  className="absolute right-3 top-3 text-xl cursro-pointer"
                  onClick={toggleShowPassword}
                />
              ) : (
                <IoMdEyeOff
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 text-grayish text-sm">
                Don't have an account?
                <Link to="/sign-up" className="text-black ml-1">
                  Register
                </Link>
              </p>
              <p className="text-grayish text-sm">
                <Link to="/forgot-password" className="text-grayish ">
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-black text-white px-7 py-3 text-sm font-medium uppercase  rounded shadow-md"
              type="submit"
            >
              Sign in
            </button>
            <div
              className="flex my-4 before:border-t before:flex-1 items-center before:border-gray-300
          after:border-t after:flex-1 after:border-gray-300"
            >
              <p className="text-center font-semibold mmx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
