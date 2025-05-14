import React, { useEffect, useState } from "react";
import {
  useGetOneCashflowQuery,
  useUpdateCashflowPercentMutation,
} from "../../redux/features/business/businessApi";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useParams } from "react-router";
import LoaderComponent from "../Loader.component";
import { useTranslation } from "react-i18next";

interface Types {
  selectId: string;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateCashflowPercent({ selectId, isShow, setIsShow }: Types) {
  const { t } = useTranslation();
  const id = selectId;
  const { data } = useGetOneCashflowQuery(id);
  const params = useParams();
  const businessId = params?.id ? params?.id : "";
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const userId = userData?.user?.id;
  const [
    updateCashflowPercent,
    { data: upData, isSuccess, isLoading, isError, error },
  ] = useUpdateCashflowPercentMutation();

  const [category, setCategory] = useState({
    value: "",
    businessId: "",
    userId: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCashflowPercent({ category, id });
  };

  useEffect(() => {
    setCategory((prev) => {
      return {
        ...prev,
        value: data?.category?.inputPercent,
        userId: userId,
        businessId: businessId,
      };
    });
  }, [data, userId, businessId]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(upData?.message);
      setTimeout(() => {
        setIsShow(false);
      }, 1000);
    }
    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, upData, setIsShow]);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShow]);

  return (
    <div className="fixed inset-0 bg-[#0000004f] z-20 overflow-hidden">
      <div className="flex justify-center items-center w-full min-h-screen p-5 md:p-10">
        <div className="relative w-[100%] md:w-[600px] rounded-md bg-white p-5 zoom-animation">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label htmlFor="">{t("enter_new_value")}</label>
            <input
              type="number"
              name="category"
              value={category.value}
              onChange={(e) =>
                setCategory({ ...category, value: e.target.value })
              }
              placeholder="10000"
              id=""
              className="text-lg text-normal jost py-2 px-4 rounded-md w-full border border-gray-300"
            />
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
          </form>
          <button
            onClick={() => setIsShow(false)}
            className="absolute top-[-10px] cursor-pointer right-[-10px] w-10 h-10 rounded-full bg-black text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      {isLoading && (
        <LoaderComponent text={"Recalculation is currently in progress"} />
      )}
      <Toaster />
    </div>
  );
}

export default UpdateCashflowPercent;
