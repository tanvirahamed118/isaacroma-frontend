import React from "react";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  firstYear: number;
  flowPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  businessResults?: BusinessResult[];
}

function TotalSalesCels({ data }: { data?: Business }) {
  const businessResults = data?.businessResults;
  const { t } = useTranslation();
  const totalSalesRev = businessResults?.find((item) => {
    return item.name === "TOTAL_SALES_REVENUE";
  });

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-normal">
        <td className="border border-black px-2 py-1" colSpan={2}>
          {t("sales_collections")}
        </td>

        {totalSalesRev?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
        <td className="border border-black px-2 py-1 font-bold">
          {totalSalesRev?.firstYear}
        </td>
        <td className="border border-black px-2 py-1 font-bold">
          {totalSalesRev?.flowPercent}%
        </td>
      </tr>
    </React.Fragment>
  );
}

export default TotalSalesCels;
