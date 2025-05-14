import { Link } from "react-router";

import Banner from "../assets/feature3.png";
import { useResetPasswordMutation } from "../redux/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";

function Reset() {
  const { t } = useTranslation();
  const [resetPassword, { data, isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();
  const [confPass, setConfPass] = useState("");
  const [conShow, setConShow] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confPass) {
      toast.error("password not match");
    } else if (password.length < 8) {
      toast.error("password too short");
    } else {
      resetPassword(user);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setUser({
        email: "",
        password: "",
      });
      setConfPass("");
    }
    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data]);

  return (
    <section>
      <div className="flex h-full lg:h-screen w-full">
        <div className="flex flex-col w-full lg:w-6/12 gap-3 items-start justify-center p-5 md:p-20">
          <h2 className="text-bold text-xl md:text-5xl leading-snug">
            {t("reset__password")}
          </h2>
          <p className="text-thin text-base">{t("by_reset_your")}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <span className="flex flex-col gap-2 w-full">
              <label className="text-normal text-base">
                {t("email_address")}
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder={t("enter_email_address")}
                required
                className="text-normal text-base border border-gray-300 py-2 px-4 rounded-md focus:outline-1 focus:outline-[#00000028]"
              />
            </span>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-normal text-base">{t("password")}</label>
              <span className="relative text-normal text-base border border-gray-300 py-2 px-4 rounded-md focus-within:border-[#00000059]">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder={t("enter_password")}
                  required
                  className="text-normal text-base outline-none w-full"
                />
                {show ? (
                  <i
                    className="fa-regular fa-eye absolute top-3 right-3 cursor-pointer"
                    onClick={() => setShow(false)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-eye-slash absolute top-3 right-3 cursor-pointer"
                    onClick={() => setShow(true)}
                  ></i>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label>{t("enter_confirm_password")}</label>
              <span className="relative text-normal text-base border border-gray-300 py-2 px-4 rounded-md focus-within:border-[#00000059]">
                <input
                  type={conShow ? "text" : "password"}
                  name="conPassword"
                  value={confPass}
                  onChange={(e) => setConfPass(e.target.value)}
                  placeholder={t("enter_confirm_password")}
                  required
                  className="text-normal text-base outline-none w-full"
                />
                {conShow ? (
                  <i
                    className="fa-regular fa-eye absolute top-3 right-3 cursor-pointer"
                    onClick={() => setConShow(false)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-eye-slash absolute top-3 right-3 cursor-pointer"
                    onClick={() => setConShow(true)}
                  ></i>
                )}
              </span>
            </div>

            <button
              className="button max-w-fit flex gap-2 items-center"
              type="submit"
            >
              {isLoading ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <p>{t("loading")}...</p>
                </>
              ) : (
                t("reset")
              )}
            </button>
          </form>
          <p className="text-normal text-sm mt-4">
            {t("change_your_password")}
            <Link to="/auth/login" className="ml-1 font-bold hover:underline">
              {t("login")}
            </Link>
          </p>
        </div>
        <div className="hidden lg:flex w-6/12 items-center justify-center bg-[#FAFAFA] p-10">
          <img src={Banner} alt="" className="w-9/12 h-auto" />
        </div>
      </div>
      <Toaster />
    </section>
  );
}

export default Reset;
