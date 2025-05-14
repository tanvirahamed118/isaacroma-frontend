import React from "react";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  firstYear: number;
  secondYear: number;
  expectedPercent: number;
  deviation: number;
};

interface Business {
  businessResults?: BusinessResult[];
}

function MonthlyForecastProjCels({ data }: { data?: Business }) {
  const businessResults = data?.businessResults;
  const { t } = useTranslation();
  const totalSalesRev = businessResults?.find((item) => {
    return item.name === "MONTHLY_SALES_FORECAST";
  });

  const { firstYear, secondYear, deviation } = totalSalesRev || {};

  return (
    <React.Fragment>
      <tr className="font-bold">
        <td
          colSpan={6}
          className="bg-[#339966] font-medium border px-2 py-1 border-black text-white text-right"
        >
          {t("monthly_forecast_without")}
        </td>
        <td className="bg-[#fff] border border-black px-2 py-1">{firstYear}</td>
        <td></td>
        <td className="bg-[#fff] border border-black px-2 py-1">
          {secondYear}
        </td>
        <td className="bg-[#fff] border border-black px-2 py-1">{deviation}</td>
      </tr>
    </React.Fragment>
  );
}

export default MonthlyForecastProjCels;
