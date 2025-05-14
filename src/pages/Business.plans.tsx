import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { businessPlansEn, businessPlansSp } from "../utils/business.plans.data";
import PlansLoader from "../components/loader/Plans.loader";
import {
  useCreatePaymentMutation,
  useGetOneUserQuery,
} from "../redux/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";

function BusinessPlans() {
  let currentData;
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [loading, setLoading] = useState(false);
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const id = userData?.user?.id;
  const [selectId, setSelectId] = useState("");
  const { data: getData } = useGetOneUserQuery(id);
  const { userMemberships } = getData?.user || {};

  const membership = userMemberships?.find(
    (item: { userId: string }) => item.userId === id
  );
  const [createPayment, { data, isLoading, isSuccess, isError, error }] =
    useCreatePaymentMutation();
  const handleChose = (
    title: string,
    plan: string,
    price: number,
    duration: number,
    planId: string
  ) => {
    const business = {
      title: title,
      plan: plan,
      price: price,
      duration: duration,
      planId: planId,
    };
    createPayment({ business, id });
    setSelectId(planId);
  };

  if (currentLang === "en") {
    currentData = businessPlansEn;
  } else {
    currentData = businessPlansSp;
  }

  useEffect(() => {
    if (isSuccess) {
      window.location.href = data.pageUrl;
    }
    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  let content;
  if (loading) {
    content = (
      <>
        <PlansLoader />
        <PlansLoader />
        <PlansLoader />
      </>
    );
  } else {
    content = currentData.map((item) => {
      const { id, title, price, featureOne, featureTow, duration, plan } =
        item || {};
      return (
        <div
          key={id}
          className="bg-white border border-[#c7c6f9] rounded-2xl p-7 md:p-10 flex flex-col gap-8"
        >
          <h2 className="text-medium text-2xl md:text-3xl jost">{title}</h2>
          <span className="flex flex-col gap-1">
            <p className="font-normal text-xl md:text-2xl text-gray-400 jost">
              {t("get_started_with")}
            </p>
            <p className="font-normal text-xl md:text-2xl text-gray-400 jost">
              {t("click_chose_button")}
            </p>
          </span>
          <div className="flex gap-5 items-center">
            <span className="flex gap-1 items-center">
              <i className="fa-solid fa-euro-sign text-3xl md:text-5xl text-black"></i>
              <h3 className="text-bold text-3xl md:text-5xl">{price}.00</h3>
            </span>
            <span>
              <p className="text-sm text-normal">EURO/mo</p>
              <p className="text-sm text-normal">({t("billed_monthly")})</p>
            </span>
          </div>

          <button
            onClick={() => handleChose(title, plan, price, duration, id)}
            className="cursor-pointer flex gap-2 items-center bg-[#f0f1ff] text-[#565add] hover:scale-105 duration-300 py-3 text-md font-medium px-10 w-fit rounded-full"
          >
            {isLoading && selectId === id ? (
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
              t("chose")
            )}
          </button>
          <div>
            <h3 className="text-md text-bold">{t("key_features")}</h3>
            <div className="flex flex-col gap-5 mt-5">
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check"></i>
                <p className="text-normal text-md jost">{featureOne}</p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check"></i>
                <p className="text-normal text-md jost">{featureTow}</p>
              </span>
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-check"></i>
                <p className="text-normal text-md jost">
                  {t("duration")} {duration} {t("month")}
                </p>
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <div className="p-3 md:p-5 min-h-screen">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">
            {t("business_plans")}
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
                {t("all_plans")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          {membership?.active && (
            <div className="flex flex-col gap-3">
              <p className="bg-amber-100 text-normal text-lg p-3 rounded-lg">
                {t("you_active_membership")}
              </p>
              <p className="bg-red-100 text-normal text-lg p-3 rounded-lg">
                {t("creating_new_plan")}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {content}
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </React.Fragment>
  );
}

export default BusinessPlans;
