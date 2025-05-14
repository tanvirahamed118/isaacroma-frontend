import React, { useState } from "react";
import UpdateCategoryPermonth from "../Update.category.permonth";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  firstYear: number;
  budgetPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  businessResults?: BusinessResult[];
}

function DepreciationCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const businessResults = data?.businessResults;
  const [isShow, setIsShow] = useState(false);
  const [selectId, setSelectId] = useState("");
  const deprecitionRes = businessResults?.find((item) => {
    return item.name === "BUDGET_DEPRECIATION";
  });

  const handleChose = (id: string) => {
    setIsShow(true);
    setSelectId(id);
  };

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td className="border border-black px-2 py-1">{t("depreciation")}</td>
        <td className="border border-black px-2 py-1">
          {deprecitionRes?.firstYear}
        </td>
        <td className="border border-black px-2 py-1">
          {deprecitionRes?.budgetPercent}%
        </td>
        {deprecitionRes?.permonths?.map((month) => (
          <td
            key={month.id}
            className="border border-black px-2 py-1 bg-white font-normal"
          >
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

export default DepreciationCels;
