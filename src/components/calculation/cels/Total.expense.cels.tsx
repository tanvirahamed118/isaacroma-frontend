import React from "react";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  firstYear: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  businessResults?: BusinessResult[];
}

function TotalExpenseCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const businessResults = data?.businessResults;

  const totalExpense = businessResults?.find((item) => {
    return item.name === "TOTAL_EXPENSES";
  });

  return (
    <React.Fragment>
      <tr className="bg-[#800000] text-[#FFFF00] font-bold">
        <td className="border border-black px-2 py-1">{t("expenses")}</td>
        <td className="border border-black px-2 py-1">
          {totalExpense?.firstYear}
        </td>
        <td className="border border-black px-2 py-1">%</td>
        {totalExpense?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
      </tr>
    </React.Fragment>
  );
}

export default TotalExpenseCels;
