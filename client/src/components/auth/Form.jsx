import React, { useEffect, useState } from "react";
import Input from "./Input";
import FadeUp from "../motion/FadeUp";
import {
    useLoginMutation,
    useRegisterMutation,
} from "../../service/auth/authService";
import { useDispatch } from "react-redux";
import { setAction, setAuth } from "../../redux/auth/authSlice";
import LordIcon from "../../assets/icons/LordIcon";
import { icon } from "../../assets/icons/icon";

const Form = ({ formType }) => {
    const [error, setError] = useState(null);
    const [login, { data: loginData, isLoading: loginLoading }] =
        useLoginMutation();
    const [register, { data: registerData, isLoading: registerLoading }] =
        useRegisterMutation();
    const dispatch = useDispatch();
    const loading = loginLoading || registerLoading;

    // Handler form data & validation
    const handleForm = (e) => {
        e.preventDefault();
        error && setError("")
        const formData = new FormData(e.target);
        const name = formData.get("firstname");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            return setError("A valid Email is required!");
        if (!password || password.length < 6)
            return setError("Password is required!");

        if (formType === "login") {
            loginHandler({ email, password });
        }
        if (formType === "register") {
            if (!name) return setError("Name is required");
            if (!confirmPassword) return setError("Confirm password is required!");

            registerHandler({ name, email, password, confirmPassword });
        }
    };

    // Handler login request
    const loginHandler = ({ email, password }) => {
        login({ email, password });
    };

    // Handler register request
    const registerHandler = ({ name, email, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            return setError("Password not match!")
        }
        register({ name, email, password, confirmPassword });
    };

    useEffect(() => { //After login/register dispatch auth data
        if (loginData || registerData) {
            dispatch(setAuth(loginData?.user || registerData?.user));
            if (registerData) { // set type login or register
                dispatch(setAction(formType));
            }
        }

        setError("")
    }, [loginData, registerData, dispatch, formType]);

    return (
        <FadeUp className="min-w-[350px] sm:min-w-[400px] md:min-w-[450px] p-4 bg-pink-100 rounded-2xl shadow-2xl">
            <form onSubmit={handleForm} className="flex flex-col gap-3">
                {formType === "register" && (
                    <Input
                        name="firstname"
                        type="text"
                        icon={icon.user}
                        placeholder="What is your name?"
                    />
                )}
                <Input
                    name="email"
                    type="text"
                    icon={icon.handle}
                    placeholder="What is your phone or email?"
                />
                <Input
                    name="password"
                    type="password"
                    icon={icon.lock}
                    placeholder="Enter a secret password."
                />
                {formType === "register" && (
                    <Input
                        name="confirmPassword"
                        type="password"
                        icon={icon.password}
                        placeholder="Confirm your password."
                    />
                )}
                {error && <p>{error}</p>}
                <button
                    disabled={loading}
                    className="bg-pink-300 rounded-2xl h-12 text-lg capitalize"
                    type="submit"
                >
                    {!loading ? formType : (
                        <span className="flex justify-center ">
                            <LordIcon icon={icon.loading} width="28" play="loop"/>
                        </span>
                    )}
                </button>
            </form>
        </FadeUp>
    );
};

export default Form;
