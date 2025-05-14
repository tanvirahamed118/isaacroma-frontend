import React from "react";
import Footer from "../components/Footer";
import { useGetOneUserQuery } from "../redux/features/auth/authApi";
import logo from "../assets/avatar-3.webp";
import ProfileBusiness from "../components/profile/Profile.business";
import { t } from "i18next";

function Profile() {
  const auth = localStorage.getItem("auth");
  const user = auth ? JSON.parse(auth) : null;
  const id = user?.user?.id;
  const { data } = useGetOneUserQuery(id);
  const { username, email, phone, profile, role, address } = data?.user || {};

  return (
    <React.Fragment>
      <div className="p-3 md:p-5">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">
            {t("personal_profile")}
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
              <p className="text-normal text-sm md:text-base">{username}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="jost border border-gray-300 p-5 md:p-10 rounded-lg bg-white">
            <div className="border-b border-gray-300 pb-5">
              <p className="text-2xl text-medium">{t("genaral")}</p>
              <p className="text-gray-500 text-md font-normal">
                {t("your_profile_info")}
              </p>
            </div>
            <div className="mt-5">
              <div className="border-b border-gray-300 pb-5">
                <p className="text-2xl text-medium">{t("avater")}</p>
                <img
                  src={profile ? profile : logo}
                  alt=""
                  className="w-24 rounded-md mt-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-6">
                <div className="flex flex-col gap-1">
                  <p>{t("your_username")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-user border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md capitalize">{username}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("your_email_address")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-envelope border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md capitalize">{email}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("your_phone_number")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-solid fa-phone-volume border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md">
                      {phone ? phone : "Not availavle"}
                    </p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("your_role")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-address-book border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md">{role}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{t("your_address")}</p>
                  <span className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-md">
                    <i className="fa-regular fa-id-badge border-r border-gray-300 pr-2"></i>
                    <p className="text-bold text-md">
                      {address ? address : "Not available"}
                    </p>
                  </span>
                </div>
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
    </React.Fragment>
  );
}

export default Profile;
