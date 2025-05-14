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

function TotalCapitalprojectionCels({ data }: { data?: Business }) {
  const businessResults = data?.businessResults;
  const { t } = useTranslation();
  const totalSalesRev = businessResults?.find((item) => {
    return item.name === "TOTAL_CAPITAL_INCRIEASE_LOAN";
  });

  const { firstYear, secondYear, expectedPercent, deviation } =
    totalSalesRev || {};

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td
          colSpan={6}
          className="bg-[#339966] border px-2 text-right py-1 border-black text-white font-medium"
        >
          {t("capital_increase_loan")}
        </td>

        <td className="border border-black px-2 py-1">{firstYear}</td>
        <td className="border border-black px-2 py-1">{expectedPercent}%</td>
        <td className="border border-black px-2 py-1">{secondYear}</td>
        <td className="border border-black px-2 py-1">{deviation}</td>
      </tr>
    </React.Fragment>
  );
}

export default TotalCapitalprojectionCels;
