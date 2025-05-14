import React from "react";

type BusinessResult = {
  name: string;
  firstYear: number;
  secondYear: number;
  expectedPercent: number;
  deviation: number;
};

type Category = {
  name: string;
  id: string;
  firstYear: number;
  expectedPercent: number;
  deviation: number;
  secondYear: number;
  category: string;
};

interface Business {
  businessResults?: BusinessResult[];
  categories?: Category[];
}

function SalesProjectionCels({ data }: { data?: Business }) {
  const businessResults = data?.categories;

  const totalSalesRev = businessResults?.filter((item) => {
    return item.category === "SALES_REVENUE";
  });

  return (
    <React.Fragment>
      {totalSalesRev?.map((item) => {
        const { name, firstYear, secondYear, deviation, expectedPercent, id } =
          item || {};
        return (
          <tr key={id} className="bg-[#fff] font-normal">
            <td
              colSpan={6}
              className="font-medium border px-2 py-1 border-black text-right bg-[#CCFFCC]"
            >
              {name}
            </td>
            <td className="border border-black px-2 py-1">{firstYear}</td>
            <td className="border border-black px-2 py-1">
              {expectedPercent}%
            </td>
            <td className="border border-black px-2 py-1">{secondYear}</td>
            <td className="border border-black px-2 py-1">{deviation}</td>
          </tr>
        );
      })}
    </React.Fragment>
  );
}

export default SalesProjectionCels;
