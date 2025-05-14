import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/business/businessApi";
import SalesList from "./categoryList/Sales.list";
import { useTranslation } from "react-i18next";

interface DataTypes {
  name: string;
  firstYear: string;
  expectedPercent: string;
  id: string;
}

interface Category {
  name: string;
  category: string;
  firstYear: string;
  expectedPercent: string;
  type: string;
  userId: string;
  businessId: string;
}

function AddSales() {
  const { t } = useTranslation();
  const params = useParams();
  const businessId = params?.id ? params?.id : "";
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const userId = userData?.user?.id;
  const [createCategory, { data, isLoading, isSuccess, error, isError }] =
    useCreateCategoryMutation();
  const [
    updateCategoryPermonth,
    {
      data: upData,
      isLoading: upLoading,
      isSuccess: upSuccess,
      error: upError,
      isError: upIsError,
    },
  ] = useUpdateCategoryMutation();
  const [category, setCategory] = useState<Category>({
    name: "",
    category: "SALES_REVENUE",
    firstYear: "",
    expectedPercent: "",
    type: "INCOME",
    userId: userId,
    businessId: businessId,
  });
  const [chose, setChose] = useState<Partial<DataTypes> | null>(null);
  const { name, firstYear, expectedPercent } = category || {};
  const [show, setShow] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (chose) {
      setCategory((prev) => ({
        ...prev,
        name: chose.name || "",
        firstYear: chose.firstYear || "",
        expectedPercent: chose.expectedPercent || "",
      }));
    }
  }, [chose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chose && chose?.id) {
      updateCategoryPermonth({ category, id: chose.id });
    } else {
      createCategory(category);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setCategory({
        name: "",
        category: "SALES_REVENUE",
        firstYear: "",
        expectedPercent: "",
        type: "INCOME",
        userId: userId,
        businessId: businessId,
      });
    }

    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, userId, businessId]);

  useEffect(() => {
    if (upSuccess) {
      toast.success(upData?.message);
      setChose({
        name: "",
        firstYear: "",
        expectedPercent: "",
        id: "",
      });
      setShow(false);
    }

    if (upIsError) {
      const err = upError as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [upSuccess, upIsError, upError, upData]);

  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg">
      <div className="p-5 md:p-10">
        <h2 className="text-bold text-3xl jost">{t("enter_sales_info")}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-5">
          <div className="flex md:flex-row flex-col gap-5 items-center">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-normal text-lg jost">
                {t("sales_name")}
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder={t("enter_sales_name")}
                required
                className="text-lg text-normal jost py-2 w-full px-4 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-normal text-lg jost">
                {t("sales_price")}
              </label>
              <input
                type="number"
                name="firstYear"
                value={firstYear}
                onChange={handleChange}
                placeholder={t("enter_sales_price")}
                required
                className="text-lg text-normal jost py-2 px-4 rounded-md w-full border border-gray-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-normal text-lg jost">
              {t("sales_percent")}
            </label>
            <input
              type="number"
              name="expectedPercent"
              value={expectedPercent}
              onChange={handleChange}
              placeholder={t("enter_sales_percent")}
              required
              className="text-lg text-normal jost py-2 px-4 rounded-md w-full border border-gray-300"
            />
          </div>
          {chose?.name ? (
            <button
              className="button max-w-fit flex gap-2 items-center mt-4"
              type="submit"
            >
              {upLoading ? (
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
          ) : (
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
                t("create_sales")
              )}
            </button>
          )}
        </form>
      </div>
      <div className="p-5">
        <h2 className="jost text-2xl text-medium pb-5">{t("create_sales")}</h2>
        <SalesList setChose={setChose} setShow={setShow} show={show} />
      </div>
      <Toaster />
    </div>
  );
}

export default AddSales;
