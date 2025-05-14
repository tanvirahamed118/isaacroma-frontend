import React, { useEffect, useState } from "react";
import Style from "../utils/custom.module.css";
import Footer from "../components/Footer";
import {
  useDeleteBusinessMutation,
  useGetAllBusinessByUserIdQuery,
} from "../redux/features/business/businessApi";
import BusinessLoader from "../components/loader/Business.loader";
import Pagination from "../components/Pagination";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { t } from "i18next";

function BusinessList() {
  const auth = localStorage.getItem("auth");
  const user = auth ? JSON.parse(auth) : null;
  const id = user?.user?.id;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const limit = 14;
  const { data, isLoading } = useGetAllBusinessByUserIdQuery({
    userId: id,
    page: page,
    limit: limit,
    sort: sort,
  });
  const [selectId, setSelectedId] = useState("");
  const [
    deleteBusiness,
    {
      data: delData,
      isLoading: delLoading,
      isSuccess: delSuccess,
      isError: delIsError,
      error: delError,
    },
  ] = useDeleteBusinessMutation();
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const totalItems = data?.data?.totalBusiness;
  const business = data?.data?.business;
  const filterData = (item: { name: string }) =>
    item?.name?.toLowerCase().includes(search.toLowerCase());
  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = (id: string) => {
    deleteBusiness(id);
    setSelectedId(id);
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

  let content;
  if (isLoading) {
    content = (
      <>
        <BusinessLoader />
        <BusinessLoader />
        <BusinessLoader />
        <BusinessLoader />
        <BusinessLoader />
        <BusinessLoader />
        <BusinessLoader />
        <BusinessLoader />
      </>
    );
  }
  if (!isLoading && business?.length === 0) {
    content = (
      <tr>
        <td>
          <p className="bg-amber-100 text-md font-normal p-3 rounded-md">
            {t("data_not_found")}
          </p>
        </td>
      </tr>
    );
  }
  if (!isLoading && business?.length > 0) {
    content = business
      ?.filter(filterData)
      ?.map(
        (item: {
          id: string;
          name: string;
          sector: string;
          description: string;
          createdAt: string;
          user: { username: string };
        }) => {
          const { id, name, sector, description, createdAt, user } = item || {};
          const { username } = user || {};
          return (
            <tr key={id}>
              <td className="w-80">
                <span>
                  <h2 className="text-lg text-medium jost">{name}</h2>
                  <p className="text-sm text-gray-400">
                    {formattedDate(createdAt)}
                  </p>
                </span>
              </td>
              <td>#{id}</td>
              <td>{sector}</td>
              <td>{description?.slice(0, 100)}</td>
              <td className="w-52">
                <p className="bg-green-100 w-fit px-3 py-1 rounded-md text-center text-green-500 font-medium text-sm capitalize">
                  {username}
                </p>
              </td>
              <td>
                <div className="flex gap-3">
                  <Link
                    to={`/edit-business/${id}`}
                    className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <Link
                    to={`/create-business/${id}`}
                    className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md"
                  >
                    <i className="fa-regular fa-eye"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(id)}
                    className="border border-gray-300 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer"
                  >
                    {delLoading && selectId === id ? (
                      <>
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
                      </>
                    ) : (
                      <i className="fa-regular fa-trash-can"></i>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          );
        }
      );
  }

  return (
    <React.Fragment>
      <div className="p-3 md:p-5 min-h-screen">
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
          <div className="md:w-6/12 w-full">
            <h2 className="text-normal text-2xl md:text-3xl">
              {t("business")}
            </h2>
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
                  {t("business_list")}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex md:flex-row flex-col justify-between items-start gap-3 md:items-center">
            <div className="bg-white border border-gray-300 px-4 py-2 rounded-lg w-full md:w-96 flex gap-2 items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={t("search_by_title")}
                onChange={(e) => setSearch(e.target.value)}
                className="text-normal text-base w-full outline-none"
              />
            </div>

            <select
              name=""
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg w-full md:w-52"
            >
              <option value="">{t("select_one")}...</option>
              <option value="asc">{t("newest")}</option>
              <option value="desc">{t("oldest")}</option>
            </select>
          </div>
          <div className="xl:overflow-x-auto overflow-x-scroll bg-white">
            <table className={`${Style.customTable} w-full min-w-[1200px]`}>
              <thead>
                <tr className="border-y border-gray-300">
                  <th>{t("business_info")}</th>
                  <th>{t("business_id")}</th>
                  <th>{t("business_sector")}</th>
                  <th>{t("business_description")}</th>
                  <th>{t("created_by")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
        {totalItems > limit && (
          <Pagination
            handlePageChange={handlePageChange}
            page={page}
            totalItems={totalItems}
            itemsPerPage={limit}
          />
        )}
      </div>
      <Footer />
      <Toaster />
    </React.Fragment>
  );
}

export default BusinessList;
