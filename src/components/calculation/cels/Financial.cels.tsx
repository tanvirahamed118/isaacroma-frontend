import React, { useState } from "react";
import UpdateCategoryPermonth from "../Update.category.permonth";
import { useTranslation } from "react-i18next";

type PerMonth = {
  id: string;
  name: string;
  value: number;
};

type Category = {
  name: string;
  id: string;
  firstYear: number;
  budgetPercent: number;
  category: string;
  permonths: PerMonth[];
};

type BusinessResult = {
  name: string;
  firstYear: number;
  budgetPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  businessResults?: BusinessResult[];
  categories?: Category[];
}

function FinancialCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const categories = data?.categories ?? [];
  const [isShow, setIsShow] = useState(false);
  const [selectId, setSelectId] = useState("");
  const salesRevenue = categories.filter(
    (item) => item.category === "FINIANCIAL"
  );

  const businessResults = data?.businessResults;

  const totalSales = businessResults?.find((item) => {
    return item.name === "TOTAL_FINIANCIAL_EXPENSES";
  });

  const handleChose = (id: string) => {
    setIsShow(true);
    setSelectId(id);
  };

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td className="border border-black px-2 py-1">
          {t("financial_expenses")}
        </td>
        <td className="border border-black px-2 py-1">
          {totalSales?.firstYear}
        </td>
        <td className="border border-black px-2 py-1">
          {totalSales?.budgetPercent}%
        </td>
        {totalSales?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
      </tr>

      {salesRevenue.map(({ id, permonths, firstYear, name, budgetPercent }) => (
        <tr key={id} className="bg-white">
          <td className="border border-black px-2 py-1 pl-4 italic font-medium">
            {name}
          </td>
          <td className="border border-black px-2 py-1">{firstYear}</td>
          <td className="border border-black px-2 py-1">{budgetPercent}%</td>
          {permonths.map((month) => (
            <td key={month.id} className="border border-black px-2 py-1">
              <div className="flex gap-3 items-center">
                <p>{month.value}</p>
                <button
                  onClick={() => handleChose(month.id)}
                  className="cursor-pointer p-1 hover:bg-[#0000002d] rounded-full"
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </td>
          ))}
        </tr>
      ))}
      {isShow && (
        <UpdateCategoryPermonth
          isShow={isShow}
          setIsShow={setIsShow}
          selectId={selectId}
        />
      )}
    </React.Fragment>
  );
}

export default FinancialCels;
