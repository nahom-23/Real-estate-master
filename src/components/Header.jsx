import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
export default function Header() {
  const location = useLocation();
  const [pagechanger, setpagechanger] = useState("sign in");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setpagechanger(
          <CgProfile className="text-2xl flex justify-center items-center" />
        );
      } else {
        setpagechanger("sign-in");
      }
    });
  }, [auth]);

  const navigate = useNavigate();
  function pathMath(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3  max-w-6xl mx-auto">
        <div className="flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="h-12 cursor-pointer "
            onClick={() => navigate("/")}
          ></img>
          <h2>Market</h2>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[5px] border-b-transparent  ${
                pathMath("/") && "text-black border-b-2-red"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[5px] border-b-transparent  ${
                pathMath("/offers") && "text-black "
              }`}
              onClick={() => navigate("/offers")}
            >
              offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[5px] border-b-transparent  ${
                (pathMath("/sign-in") || pathMath("/profile")) &&
                "text-black border-b-red"
              }`}
              onClick={() => navigate(`/profile`)}
            >
              {pagechanger}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
