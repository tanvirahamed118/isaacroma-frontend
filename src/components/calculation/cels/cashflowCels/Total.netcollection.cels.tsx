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

function TotalNetcollectionCels({ data }: { data?: Business }) {
  const cashflows = data?.cashflows;
  const { t } = useTranslation();
  const prevousBalance = cashflows?.find((item) => {
    return item.name === "TOTAL_NET_COLLECTIONS";
  });

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td
          className="border border-black px-2 py-1 bg-[#339966] text-[#FFFF00]"
          colSpan={2}
        >
          {t("total_net_collections")}
        </td>

        {prevousBalance?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
        <td className="border border-black px-2 py-1 font-bold">
          {prevousBalance?.total}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default TotalNetcollectionCels;
