import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
export default function Profile() {
  const [formData, setformData] = useState({
    name: "noah",
    email: "noah@gmail.com",
  });
  const auth = getAuth();
  const navigate = useNavigate();
  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col ">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 ">
          <form>
            <input
              type="text"
              id="name"
              placeholder={formData.name}
              disabled
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bh-white border border-gray-300 rounded transition ease-in-out "
            ></input>
            <input
              type="email"
              id="email"
              placeholder={formData.email}
              disabled
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bh-white border border-gray-300 rounded transition ease-in-out "
            ></input>
            <div className="flex justify-between  whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to change your name?
                <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
