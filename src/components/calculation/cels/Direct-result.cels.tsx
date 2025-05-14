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

function DirectResultCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const businessResults = data?.businessResults;

  const directExpense = businessResults?.find((item) => {
    return item.name === "DIRECT_RESULT";
  });

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td className="border border-black px-2 py-1">{t("direct_result")}</td>
        <td className="border border-black px-2 py-1">
          {directExpense?.firstYear}
        </td>
        <td className="border border-black px-2 py-1">
          {directExpense?.budgetPercent}%
        </td>
        {directExpense?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
      </tr>
    </React.Fragment>
  );
}

export default DirectResultCels;
