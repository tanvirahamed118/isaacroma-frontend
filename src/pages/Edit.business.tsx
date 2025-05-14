import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useGetOneBusinessByListQuery,
  useUpdateBusinessMutation,
} from "../redux/features/business/businessApi";
import { useTranslation } from "react-i18next";

interface Business {
  name: string;
  sector: string;
  description: string;
}

function EditBusiness() {
  const [t] = useTranslation();
  const params = useParams();
  const id = params?.id;

  const [updateBusiness, { data, isLoading, isSuccess, error, isError }] =
    useUpdateBusinessMutation();
  const { data: getData } = useGetOneBusinessByListQuery(id);
  const [business, setBusiness] = useState<Business>({
    name: "",
    sector: "",
    description: "",
  });

  useEffect(() => {
    if (getData) {
      setBusiness((prev) => {
        return {
          ...prev,
          name: getData?.business?.name,
          sector: getData?.business?.sector,
          description: getData?.business?.description,
        };
      });
    }
  }, [getData]);

  const { name, sector, description } = business || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBusiness({ business, id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setBusiness({
        name: "",
        sector: "",
        description: "",
      });
    }

    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data]);
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
              <Link
                to="/businesses"
                className="text-normal text-sm md:text-base"
              >
                {t("back_business_list")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="w-full md:w-6/12 bg-white p-5 md:p-10 border border-gray-300 rounded-lg">
            <h2 className="text-bold text-2xl md:text-3xl jost">
              {t("update_business_details")}
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
              <div className="flex md:flex-row flex-col gap-3 items-center">
                <button
                  className="button w-full justify-center md:max-w-fit flex gap-2 items-center"
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
                <Link
                  to={`/create-business/${getData?.business?.id}`}
                  className="button w-full text-center md:w-fit"
                >
                  {t("go_to_category")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </React.Fragment>
  );
}

export default EditBusiness;
