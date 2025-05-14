import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import logo from "../assets/avatar-3.webp";
import {
  useGetOneUserQuery,
  useUpdateUserMutation,
} from "../redux/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast, { Toaster } from "react-hot-toast";
import ProfileBusiness from "../components/profile/Profile.business";
import ProfilePasswordUpdate from "../components/profile/Profile.password.update";
import { useTranslation } from "react-i18next";

interface User {
  username: string;
  email: string;
  phone: string;
  address: string;
  profile: File | string;
}

function ProfileSetting() {
  const { t } = useTranslation();
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const id = userData?.user?.id;
  const { data } = useGetOneUserQuery(id);
  const logoRef = useRef<HTMLInputElement>(null);
  const [
    updateUser,
    { data: updateData, isLoading, isSuccess, error, isError },
  ] = useUpdateUserMutation();

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    phone: "",
    address: "",
    profile: "",
  });
  const { username, email, phone, address, profile } = user || {};
  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("phone", phone ? phone : "");
    formData.append("address", address ? address : "");
    formData.append("email", email);
    formData.append(
      "profile",
      profile instanceof File ? profile : user?.profile
    );
    updateUser({ formData, id });
    if (logoRef.current) logoRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUser((prevState) => ({
      ...prevState,
      profile: file,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(updateData?.message);
    }

    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, updateData]);

  return (
    <React.Fragment>
      <div className="p-3 md:p-5">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">
            {t("profile_setting")}
          </h2>
          <ul className="flex gap-2 items-center py-2">
            <li>
              <a href="" className="text-normal text-sm md:text-base">
                {t("dashboard")}
              </a>
            </li>
            <li>
              <i className="fa-solid fa-angles-right text-xs"></i>
            </li>
            <li>
              <a href="" className="text-normal text-sm md:text-base">
                {data?.user?.username}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="jost border border-gray-300 p-5 md:p-10 rounded-lg bg-white">
            <div className="border-b border-gray-300 pb-5">
              <p className="text-2xl text-medium">{t("genaral")}</p>
              <p className="text-gray-500 text-md font-normal">
                {t("update_account_settings")}
              </p>
            </div>
            <div className="mt-5">
              <div className="border-b border-gray-300 pb-5">
                <p className="text-2xl text-medium">{t("avater")}</p>
                <img
                  src={data?.user?.profile ? data?.user?.profile : logo}
                  alt=""
                  className="w-24 rounded-lg mt-2"
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5"
              >
                <div className="flex flex-col gap-1">
                  <p>{t("username")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                    <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                      <i className="fa-regular fa-user"></i>
                    </span>
                    <input
                      type="text"
                      placeholder={t("enter_username")}
                      name="username"
                      value={username}
                      onChange={handleChange}
                      className="text-normal w-full outline-0"
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("email_address")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 rounded-md bg-gray-100">
                    <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      placeholder={t("enter_email_address")}
                      disabled
                      className="text-normal w-full outline-0 "
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("your_phone_number")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                    <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                      <i className="fa-solid fa-phone-volume"></i>
                    </span>
                    <input
                      type="number"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      placeholder={t("enter_phone")}
                      className="text-normal w-full outline-0"
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("your_address")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                    <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                      <i className="fa-regular fa-id-badge"></i>
                    </span>
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={handleChange}
                      placeholder={t("your_address")}
                      className="text-normal w-full outline-0"
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("select_picture")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 rounded-md">
                    <span className="w-10 h-10 flex justify-center items-center bg-[#27746B] text-white rounded-l-md">
                      <i className="fa-regular fa-file-image"></i>
                    </span>
                    <input
                      type="file"
                      name="profile"
                      ref={logoRef}
                      onChange={handleFileChange}
                      className="text-normal w-full outline-0 "
                    />
                  </span>
                </div>
                <button
                  className="button max-w-fit flex gap-2 items-center mt-4"
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
              </form>
              <div className="mt-10 border-t border-gray-300">
                <div className="my-5">
                  <p className="text-gray-700 text-medium text-xl pb-5">
                    {t("update_your_password")}
                  </p>
                </div>
                <ProfilePasswordUpdate />
              </div>
            </div>
            <div className="mt-10">
              <p className="text-3xl text-medium">{t("recent_businesses")}</p>
              <p className="text-normal text-lg">{t("all_business_created")}</p>
              <ProfileBusiness />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </React.Fragment>
  );
}

export default ProfileSetting;
