import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useCreateBusinessMutation } from "../redux/features/business/businessApi";
import { useTranslation } from "react-i18next";

interface Business {
  userId: string;
  name: string;
  sector: string;
  description: string;
}

function CreateBusiness() {
  const { t } = useTranslation();
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const userId = userData?.user?.id;
  const navigate = useNavigate();
  const [createBusiness, { data, isLoading, isSuccess, error, isError }] =
    useCreateBusinessMutation();
  const [business, setBusiness] = useState<Business>({
    userId: userId,
    name: "",
    sector: "",
    description: "",
  });

  const { name, sector, description } = business || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBusiness(business);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setBusiness({
        userId: userId,
        name: "",
        sector: "",
        description: "",
      });
      setTimeout(() => {
        navigate(`/create-business/${data?.business?.id}`);
      }, 1000);
    }

    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, userId, navigate]);

  return (
    <React.Fragment>
      <div className="p-3 md:p-5 min-h-screen">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">{t("business")}</h2>
          <ul className="flex gap-2 items-center py-2">
            <li>
              <Link to="/" className="text-normal text-sm md:text-base">
                {t("dashboard")}
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-angles-right text-xs"></i>
            </li>
            <li>
              <p className="text-normal text-sm md:text-base">
                {t("create_business")}
              </p>
            </li>
          </ul>
        </div>
        <div>
          <div className="w-full md:w-6/12 bg-white p-6 md:p-10 border border-gray-300 rounded-lg">
            <h2 className="text-bold text-xl md:text-3xl jost">
              {t("enter_business_details")}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-5">
              <div className="flex md:flex-row flex-col gap-5 items-center">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-normal text-lg jost">
                    {t("business_title")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                    placeholder={t("enter_business_title")}
                    className="text-lg text-normal jost py-2 w-full px-4 rounded-md border border-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-normal text-lg jost">
                    {t("business_sector")}
                  </label>
                  <input
                    type="text"
                    name="sector"
                    value={sector}
                    onChange={handleChange}
                    required
                    placeholder={t("enter_business_sector")}
                    className="text-lg text-normal jost py-2 px-4 rounded-md w-full border border-gray-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-normal text-lg jost">
                  {t("business_description")}
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) =>
                    setBusiness({ ...business, description: e.target.value })
                  }
                  placeholder={t("enter_business_description")}
                  required
                  rows={5}
                  cols={5}
                  className="text-lg text-normal jost py-2 px-4 rounded-md border border-gray-300"
                ></textarea>
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
                  t("create_business")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </React.Fragment>
  );
}

export default CreateBusiness;
