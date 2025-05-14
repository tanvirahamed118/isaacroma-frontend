import { useEffect, useState } from "react";
import Banner from "../assets/feature3.png";
import { useLoginMutation } from "../redux/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { t } from "i18next";

function Login() {
  const [login, { data, isLoading, isError, isSuccess, error }] =
    useLoginMutation();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = user || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setUser({
        email: "",
        password: "",
      });
      navigate("/");
    }
    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, navigate]);

  return (
    <section>
      <div className="flex h-full md:h-screen w-full">
        <div className="flex flex-col gap-3 items-start justify-center p-5 md:p-20 w-full lg:w-6/12">
          <h2 className="text-bold text-xl md:text-5xl leading-snug">
            {t("welcome_back_continue")}
          </h2>
          <p className="text-thin text-base">{t("by_singing_in")}</p>
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
                required
                placeholder={t("enter_email_address")}
                className="text-normal text-base border border-gray-300 py-2 px-4 rounded-md focus:outline-1 focus:outline-[#00000028]"
              />
            </span>
            <div className="flex flex-col gap-2 w-full">
              <label>{t("password")}</label>
              <span className="relative text-normal text-base border border-gray-300 py-2 px-4 rounded-md focus-within:border-[#00000059]">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder={t("enter_password")}
                  value={password}
                  onChange={handleChange}
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
            <Link
              to="/auth/reset"
              className="text-gray-400 text-sm font-normal hover:underline w-fit"
            >
              {t("forget_password")}
            </Link>
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
                t("login")
              )}
            </button>
          </form>
          <p className="text-normal text-sm mt-4">
            {t("do_an_account")}
            <Link
              to="/auth/register"
              className="ml-1 font-bold hover:underline"
            >
              {t("register")}
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

export default Login;
