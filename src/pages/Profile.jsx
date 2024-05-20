import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import db from "../firebase";
export default function Profile() {
  const auth = getAuth();
  const [changeDetail, setchangeDetail] = useState(false);
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();
  const { name, email } = formData;
  function onchange(e) {
    setformData({ ...formData, [e.target.id]: e.target.value });
  }
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  async function onsubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
        toast.success("Name updated successfully");
      }
    } catch (error) {
      // uupdate name in the firestore

      toast.error("Error updating profile");
    }
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col ">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 ">
          <form onSubmit={onsubmit}>
            <input
              type="text"
              id="name"
              placeholder={formData.name}
              disabled={!changeDetail}
              onChange={onchange}
              className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bh-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            ></input>
            <input
              type="email"
              id="email"
              placeholder={formData.email}
              disabled={!changeDetail}
              onChange={onchange}
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bh-white border border-gray-300 rounded transition ease-in-out "
            ></input>
            <div className="flex justify-between  whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onsubmit();
                    setchangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply Changes" : "Edit"}
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
