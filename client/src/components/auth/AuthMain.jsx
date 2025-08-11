import React, { useState } from "react";
import Form from "./Form";
import SelectAuth from "./SelectAuth";
import AnimatedText from "../motion/AnimatedText ";

const AuthMain = () => {
  const [formType, setFormType] = useState("login");
  return (
    <div
      style={{ backgroundImage: "url('/bg.svg')" }}
      className="bg-[#FDCEDF] min-h-screen w-full h-full flex justify-center items-center bg-cover bg-center bg-no-repeat"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 justify-center text-4xl font-extrabold text-pink-500">
            <AnimatedText text="PingPong"/>
        </div>
        <p className="text-center text-bold text-xl">Live chatting & Unlimited audio/video call</p>
        <SelectAuth formType={formType} setFormType={setFormType} />
        <Form formType={formType} />
      </div>
    </div>
  );
};

export default AuthMain;
