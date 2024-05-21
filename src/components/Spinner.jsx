import React from "react";
import spinner from "../assets/spinner.svg";
export default function Spinner() {
  return (
    <div className="flex justify-center items-center bg-black bg-opacity-10 z-51 fixed top-0 right-0 left-0 bottom-0">
      <div>
        <img src={spinner} alt="loading..." className="h-34"></img>
      </div>
    </div>
  );
}
