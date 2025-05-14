import React from "react";
import Footer from "../components/Footer";
import Banner from "../assets/job-feed-logo.webp";
import Logo from "../assets/logo.png";
import Style from "../utils/custom.module.css";
import { useGetOneUserQuery } from "../redux/features/auth/authApi";
import { useTranslation } from "react-i18next";

function Subscription() {
  const { t } = useTranslation();
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const id = userData?.user?.id;
  const { data } = useGetOneUserQuery(id);
  const { profile, userMemberships, address, phone } = data?.user || {};
  const getMembership = userMemberships?.find(
    (item: { userId: string; end_at: string }) => item.userId === id
  );
  const {
    createdAt,
    end_at,
    active,
    id: invId,
    name,
    price,
    duration,
  } = getMembership || {};

  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <React.Fragment>
      <div className="p-3 md:p-5 min-h-screen">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">
            {t("subscriptions")}
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
                {t("subscription_details")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="bg-white border border-gray-300 p-5 md:p-10 rounded-xl flex lg:flex-row flex-col gap-10 md:gap-0 justify-between items-center">
            <div className="flex flex-col gap-3">
              <h2 className="jost text-medium text-xl md:text-4xl leading-relaxed w-full lg:w-8/12">
                {t("youre_in")}
              </h2>
              <p className="text-gray-400 font-normal text-lg">
                {t("top_selected")}
              </p>
            </div>
            <img src={Banner} alt="" />
          </div>
          <div className="bg-white p-5 md:-10 rounded-lg mt-5 border border-gray-300">
            <div className="flex justify-between items-center">
              <img src={profile ? profile : Logo} alt="" className="w-24" />
              <span className="flex flex-col gap-2">
                {active ? (
                  <p className="text-green-500 bg-green-100 px-3 py-1 rounded-md text-sm font-bold w-fit">
                    {t("paid")}
                  </p>
                ) : (
                  <p className="text-red-500 bg-red-100 px-3 py-1 rounded-md text-sm font-bold w-fit">
                    {t("pending")}
                  </p>
                )}

                <p className="text-bold text-sm">
                  {t("inv_voice")}: #{invId ? invId : t("not_available")}
                </p>
                <p className="text-gray-400 font-normal text-sm">
                  {t("invoice_number")}
                </p>
              </span>
            </div>
            <div className="w-full lg:w-6/12 md:flex-row flex-col flex justify-between mt-10">
              <div>
                <h2 className="text-bold text-lg">{t("from")}</h2>
                <p className="text-gray-500 text-sm font-normal">
                  {address ? address : t("not_available")}
                </p>
                <p className="text-gray-500 text-sm font-normal">
                  {phone ? phone : t("not_available")}
                </p>

                <div className="py-5">
                  <p className="text-gray-500 text-md font-bold">
                    {t("start_date")}
                  </p>
                  <p className="text-gray-500 text-sm font-normal">
                    {createdAt ? formattedDate(createdAt) : t("not_available")}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-bold text-lg">{t("end_date")}</h2>
                <p className="text-gray-500 text-sm font-normal">
                  {address ? address : t("not_available")}
                </p>
                <p className="text-gray-500 text-sm font-normal">
                  {phone ? phone : t("not_available")}
                </p>

                <div className="py-5">
                  <p className="text-gray-500 text-md font-bold">
                    {t("end_date")}
                  </p>
                  <p className="text-gray-500 text-sm font-normal">
                    {end_at ? end_at : t("not_available")}
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table
                className={`${Style.subTable} bg-[#F1F1F1] rounded-lg w-full mt-5 min-w-[1000px] `}
              >
                <thead>
                  <tr>
                    <th>{t("subscription_id")}</th>
                    <th>{t("subscription_name")}</th>
                    <th>{t("price")}</th>
                    <th>{t("duration")}</th>
                    <th className="w-52">{t("start_date")}</th>
                    <th>{t("end_date")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#{invId ? invId : t("not_available")}</td>
                    <td>{name ? name : t("not_available")}</td>
                    <td>{price ? `€${price}` : t("not_available")}</td>
                    <td>
                      {duration ? duration : t("not_available")}/{t("month")}
                    </td>
                    <td>
                      {createdAt
                        ? formattedDate(createdAt)
                        : t("not_available")}
                    </td>
                    <td>{end_at ? end_at : t("not_available")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Subscription;
