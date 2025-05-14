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

function MonthlyNetbalanceCels({ data }: { data?: Business }) {
  const cashflows = data?.cashflows;
  const { t } = useTranslation();
  const prevousBalance = cashflows?.find((item) => {
    return item.name === "MONTHLY_NET_BALANCE";
  });

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td
          className="border border-black px-2 py-1 bg-[#808000] text-[#fff]"
          colSpan={2}
        >
          {t("monthly_net_balance")}
        </td>

        {prevousBalance?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
      </tr>
    </React.Fragment>
  );
}

export default MonthlyNetbalanceCels;
