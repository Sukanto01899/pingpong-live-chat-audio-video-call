import React, { useState } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import LordIcon from "../../assets/icons/LordIcon";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

const Input = ({
    type = "text",
    placeholder = "Write here...",
    icon = "kdduutaw",
    name = "firstname",
}) => {
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="relative max-h-12 overflow-hidden focus:bg-pink-300 bg-pink-200 rounded-2xl">
            <div className="absolute left-1  transform top-[50%] -translate-y-1/2 pl-2">
                <LordIcon icon={icon} play="loop" width="24" />
            </div>

            <input
                className="input"
                name={name}
                type={type === "password" ? (showPass ? "text" : "password") : type}
                placeholder={placeholder}
            />

            {type === "password" && (
                <div
                    onClick={() => setShowPass((prev) => !prev)}
                    className="absolute cursor-pointer h-6 w-6 bg-pink-300 rounded-full right-2  transform top-[50%] -translate-y-1/2 p-1 flex items-center justify-center"
                >
                    <LordIcon icon="dicvhxpz" width="20" play="click" />

                </div>
            )}
        </div>
    );
};

export default Input;
