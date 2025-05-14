import React from "react";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  total: number;
  flowPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  cashflows?: BusinessResult[];
}

function TotalOperatingColCels({ data }: { data?: Business }) {
  const cashflows = data?.cashflows;
  const { t } = useTranslation();
  const prevousBalance = cashflows?.find((item) => {
    return item.name === "TOTAL_OPERATING_COLLECTION";
  });

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td
          className="border border-black px-2 py-1 bg-[#339966] text-white"
          colSpan={2}
        >
          {t("total_presented_collection")}
        </td>

        {prevousBalance?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
        <td className="border border-black px-2 py-1 font-bold">
          {prevousBalance?.total}
        </td>
        <td className="border border-black px-2 py-1 font-bold">
          {prevousBalance?.flowPercent}%
        </td>
      </tr>
    </React.Fragment>
  );
}

export default TotalOperatingColCels;
