import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  function onchange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
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
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 text-grayish text-sm">
                Don't have an account?
                <Link to="/sign-up" className="text-black ml-1">
                  Register
                </Link>
              </p>
              <p className="text-grayish text-sm">
                <Link to="/sign-in">sign in instead?</Link>
              </p>
            </div>
            <button
              className="w-full bg-black text-white px-7 py-3 text-sm font-medium uppercase  rounded shadow-md "
              type="submit"
            >
              send reset email
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
