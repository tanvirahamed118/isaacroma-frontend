import { Link, useNavigate, useParams } from "react-router";
import AddSales from "../components/cateogires/Add-sales";
import AddCapitalIncrease from "../components/cateogires/Add.capital.increase";
import AddCostofSales from "../components/cateogires/Add.costof.sales";
import AddExtraordinaryExpense from "../components/cateogires/Add.extraordinary.expense";
import AddFinancialExpense from "../components/cateogires/Add.financial.expense";
import AddPersonalExpense from "../components/cateogires/Add.personal.expense";
import Footer from "../components/Footer";
import { useGetBudgetCalculationMutation } from "../redux/features/business/businessApi";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import LoaderComponent from "../components/Loader.component";
import { useTranslation } from "react-i18next";

function CreateCategory() {
  const { t } = useTranslation();
  const params = useParams();
  const businessId = params?.id ? params?.id : "";
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const userId = userData?.user?.id;
  const detail = { userId, businessId };
  const [getBudgetCalculation, { data, isLoading, isError, isSuccess, error }] =
    useGetBudgetCalculationMutation();
  const navigate = useNavigate();

  const handleCalculation = () => {
    getBudgetCalculation(detail);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate(`/create-business/budget/${businessId}`);
    }
    if (isError) {
      const err = error as FetchBaseQueryError;
      const errorMessage = (err.data as { message: string }).message;
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, navigate, businessId]);

  return (
    <>
      <div className="p-3 md:p-5">
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
                {"business"}
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-angles-right text-xs"></i>
            </li>
            <li>
              <a href="" className="text-normal text-base">
                {t("create_category")}
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <AddSales />
            <AddCapitalIncrease />
            <AddCostofSales />
            <AddPersonalExpense />
            <AddExtraordinaryExpense />
            <AddFinancialExpense />
          </div>
          <div className="flex gap-2 md:gap-5 md:flex-row flex-col item-center my-5">
            <Link
              to={`/edit-business/${businessId}`}
              className="button text-center"
            >
              {t("return_business")}
            </Link>

            <button
              className="button w-full md:max-w-fit flex gap-2 justify-center items-center"
              onClick={handleCalculation}
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
                t("go_to_budget")
              )}
            </button>
          </div>
        </div>
      </div>
      {isLoading && <LoaderComponent text={t("calculation_inprogress")} />}
      <Toaster />
      <Footer />
    </>
  );
}

export default CreateCategory;
