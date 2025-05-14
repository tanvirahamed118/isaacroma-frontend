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

function CamucalativeProjectionCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const businessResults = data?.businessResults;

  const totalSalesRev = businessResults?.find((item) => {
    return item.name === "CUMULATIVE_RESULT";
  });

  const { secondYear, expectedPercent, deviation } = totalSalesRev || {};

  return (
    <React.Fragment>
      <tr className="font-bold bg-white">
        <td
          colSpan={7}
          className="bg-[#808000] font-medium text-center border px-2 py-1 border-black text-white"
        >
          {t("resultado_acumulado")}
        </td>

        <td className="border border-black px-2 py-1">{expectedPercent}%</td>
        <td className="border border-black px-2 py-1">{secondYear}</td>
        <td className="border border-black px-2 py-1">{deviation}</td>
      </tr>
    </React.Fragment>
  );
}

export default CamucalativeProjectionCels;
