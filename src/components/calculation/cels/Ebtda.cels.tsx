import React from "react";
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

function EbtdaCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const businessResults = data?.businessResults;

  const ebitdaExpense = businessResults?.find((item) => {
    return item.name === "EBITDA";
  });

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td className="border border-black px-2 py-1">{t("EBITDA")}</td>
        <td className="border border-black px-2 py-1">
          {ebitdaExpense?.firstYear}
        </td>
        <td className="border border-black px-2 py-1">
          {ebitdaExpense?.budgetPercent}%
        </td>
        {ebitdaExpense?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
      </tr>
    </React.Fragment>
  );
}

export default EbtdaCels;
