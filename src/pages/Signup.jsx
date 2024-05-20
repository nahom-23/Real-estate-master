import React, { useState } from "react";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  function onchange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function toggleShowPassword() {
    setshowPassword(!showPassword);
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("something went wrong with the registration");
    }
  };
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign-Up</h1>
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
              type="text"
              id="name"
              value={name}
              onChange={onchange}
              placeholder="first name"
            ></input>
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
                  className="absolute right-3 top-3 text-xl cursor-pointer"
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
              <p className="mb-6">
                Have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Sign-in
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out "
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase  rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign Up
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
