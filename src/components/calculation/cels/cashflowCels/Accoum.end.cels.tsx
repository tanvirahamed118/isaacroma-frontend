import React from "react";
import { useTranslation } from "react-i18next";

type cashflows = {
  name: string;
  total: number;
  budgetPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  cashflows?: cashflows[];
}

const MONTH_ORDER = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function AccoumEndCels({ data }: { data?: Business }) {
  const cashflows = data?.cashflows;
  const { t } = useTranslation();
  const accoumBegain = cashflows?.find((item) => {
    return item.name === "ACCUMULATED_BALANCE_END";
  });

  // Sort permonths by calendar month order
  const sortedMonths = accoumBegain?.permonths
    ?.slice()
    .sort((a, b) => MONTH_ORDER.indexOf(a.name) - MONTH_ORDER.indexOf(b.name));

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td
          colSpan={2}
          className="bg-[#808000] border px-2 py-1 border-black text-white text-xs"
        >
          {t("accumulated_end")}
        </td>

        {sortedMonths?.map((month) => (
          <td
            key={month.id}
            className="border border-black px-2 py-1 bg-[#993300] text-white"
          >
            {month.value}
          </td>
        ))}
      </tr>
    </React.Fragment>
  );
}

export default AccoumEndCels;
