import { useParams } from "react-router";
import {
  useDeleteCategoryMutation,
  useGetOneBusinessQuery,
} from "../../../redux/features/business/businessApi";
import CategoryListLoader from "../../loader/Category.list.loader";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Category {
  name: string;
  firstYear: string;
  expectedPercent: string;
  id: string;
}

interface DataType {
  setChose: React.Dispatch<React.SetStateAction<Partial<Category> | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

function CapitalIncreaseList({ setChose, setShow, show }: DataType) {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id;
  const { data, isLoading } = useGetOneBusinessQuery(id);
  const [selectId, setSelectId] = useState("");
  const [
    deleteCategory,
    {
      data: delData,
      isLoading: delLoading,
      isError: delIsError,
      error: delError,
      isSuccess: delSuccess,
    },
  ] = useDeleteCategoryMutation();

  const category = data?.business?.categories?.filter(
    (item: { category: string }) => item?.category === "CAPITAL_INCRIEASE_LOAN"
  );

  const handleDelete = (id: string) => {
    deleteCategory(id);
    setSelectId(id);
    setChose((prev) => ({
      ...prev,
      name: "",
      firstYear: "",
      expectedPercent: "",
      id: "",
    }));
  };

  const handleRemove = () => {
    setChose({
      name: "",
      firstYear: "",
      expectedPercent: "",
      id: "",
    });
    setShow(false);
    setSelectId("");
  };

  useEffect(() => {
    if (delSuccess) {
      toast.success(delData?.message);
    }

    if (delIsError) {
      const err = delError as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [delSuccess, delIsError, delError, delData]);

  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleSelect = (item: {
    id: string;
    name: string;
    type: string;
    createdAt: string;
    firstYear: number;
    expectedPercent: number;
  }) => {
    setChose({
      ...item,
      firstYear: item.firstYear.toString(),
      expectedPercent: item.expectedPercent.toString(),
      id: item?.id?.toString(),
    });
    setSelectId(item?.id);
    setShow(true);
  };

  let content;
  if (isLoading) {
    content = (
      <>
        <CategoryListLoader />
        <CategoryListLoader />
        <CategoryListLoader />
        <CategoryListLoader />
      </>
    );
  }
  if (!isLoading && category?.length === 0) {
    content = (
      <p className="bg-amber-100 text-md font-normal p-3 rounded-md">
        {t("data_not_found")}
      </p>
    );
  }
  if (!isLoading && category?.length > 0) {
    content = category?.map(
      (item: {
        id: string;
        name: string;
        type: string;
        createdAt: string;
        firstYear: number;
        expectedPercent: number;
      }) => {
        const { id, name, type, firstYear, expectedPercent, createdAt } =
          item || {};

        return (
          <div
            key={id}
            className="bg-white border p-5 border-gray-300 rounded-lg flex md:flex-row flex-col gap-3 justify-between items-start md:items-center"
          >
            <div className="flex gap-3 items-center">
              <div className="w-5 h-5 border-3 border-amber-300 rounded-full"></div>
              <div className="flex flex-col gap-1">
                <span className="flex gap-3 items-center">
                  <h3 className="text-medium text-xl jost capitalize">
                    {name}
                  </h3>
                  <p className="bg-[#2B7F75] text-white px-4 py-1 rounded-full text-xs m-0 font-medium uppercase">
                    {type}
                  </p>
                </span>
                <span className="flex gap-2 items-center">
                  <i className="fa-regular fa-calendar text-xs text-gray-400"></i>
                  <p className="text-sm text-gray-400 font-normal">
                    {formattedDate(createdAt)}
                  </p>
                </span>
              </div>
            </div>
            <div className="flex gap-2 md:gap-3 items-center">
              <p className="border border-gray-300 rounded-md md:rounded-lg py-1 md:py-2 px-2 md:px-4 flex justify-center items-center">
                {firstYear}
              </p>
              <p className="border border-gray-300 rounded-md md:rounded-lg py-1 md:py-2 px-2 md:px-4 flex justify-center items-center">
                {expectedPercent}%
              </p>
              {show && selectId === id ? (
                <button
                  onClick={handleRemove}
                  className="border cursor-pointer border-gray-300 w-8 md:w-10 h-8 md:h-10 rounded-md md:rounded-lg flex justify-center items-center"
                >
                  <i className="fa-solid fa-xmark text-sm md:text-md"></i>
                </button>
              ) : (
                <button
                  onClick={() => handleSelect(item)}
                  className="border cursor-pointer border-gray-300 w-8 md:w-10 h-8 md:h-10 rounded-md md:rounded-lg flex justify-center items-center"
                >
                  <i className="fa-regular fa-pen-to-square text-sm md:text-md"></i>
                </button>
              )}
              <button
                onClick={() => handleDelete(id)}
                className="border cursor-pointer border-gray-300 w-8 md:w-10 h-8 md:h-10 rounded-md md:rounded-lg flex justify-center items-center"
              >
                {delLoading && selectId === id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                ) : (
                  <i className="fa-regular fa-trash-can text-sm md:text-md"></i>
                )}
              </button>
            </div>
          </div>
        );
      }
    );
  }
  return (
    <div className="bg-[#FAFAFA] flex flex-col gap-5">
      {content} <Toaster />
    </div>
  );
}

export default CapitalIncreaseList;
