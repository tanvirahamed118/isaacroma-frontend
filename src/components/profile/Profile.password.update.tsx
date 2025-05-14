import { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";

function ProfilePasswordUpdate() {
  const { t } = useTranslation();
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const id = userData?.user?.id;
  const [updatePassword, { data, isLoading, isSuccess, error, isError }] =
    useUpdatePasswordMutation();
  const [show, setShow] = useState(false);
  const [conShow, setConShow] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { password: password };
    if (password !== conPassword) {
      toast.error("Password not match");
    } else if (password?.length <= 8) {
      toast.error("Password lenth more then 8 character");
    } else {
      updatePassword({ user, id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setPassword("");
      setConPassword("");
    }

    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5"
    >
      <div className="flex flex-col gap-2 w-full">
        <label>{t("password")}</label>
        <span className="relative text-normal text-base border border-gray-300 py-2 px-4 rounded-md focus-within:border-[#00000059]">
          <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md absolute top-0 left-0">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type={show ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t("enter_password")}
            className="text-normal text-base outline-none w-full ml-10"
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
        <label>{t("confirm_password")}</label>
        <span className="relative text-normal text-base border border-gray-300 py-2 px-4 rounded-md focus-within:border-[#00000059]">
          <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md absolute top-0 left-0">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type={conShow ? "text" : "password"}
            name="confPass"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            required
            placeholder={t("enter_confirm_password")}
            className="text-normal text-base outline-none w-full ml-10"
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
          t("update")
        )}
      </button>
      <Toaster />
    </form>
  );
}

export default ProfilePasswordUpdate;
