import React from "react";
import FadeIn from "../motion/FadeIn";

const SelectAuth = ({ formType, setFormType }) => {
  return (
    <FadeIn className="bg-pink-100 rounded-2xl p-2 shadow-2xl">
      <div className="flex z-1 items-center justify-between bg-pink-200 text-lg rounded-xl relative overflow-hidden">
        <button
          onClick={() => setFormType("login")}
          className="flex-1/2 py-2 cursor-pointer "
        >
          Login
        </button>
        <button
          onClick={() => setFormType("register")}
          className="flex-1/2 py-2 cursor-pointer"
        >
          Register
        </button>
        <div
          className={`absolute ${
            formType === "login" ? "left-0" : "left-[50%]"
          } top-0 transition-all duration-500  bg-pink-400 -z-1 h-full w-[50%]`}
        ></div>
      </div>
    </FadeIn>
  );
};

export default SelectAuth;
