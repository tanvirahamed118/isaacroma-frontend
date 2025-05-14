import React from "react";

type PerMonth = {
  id: string;
  name: string;
  value: number;
};

type Category = {
  name: string;
  id: string;
  firstYear: number;
  flowPercent: number;
  category: string;
  permonths: PerMonth[];
};

type BusinessResult = {
  name: string;
  firstYear: number;
  flowPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  businessResults?: BusinessResult[];
  categories?: Category[];
}

function CapitalIncreaseLoanCels({ data }: { data?: Business }) {
  const categories = data?.categories ?? [];

  const salesRevenue = categories.filter(
    (item) => item.category === "CAPITAL_INCRIEASE_LOAN"
  );

  return (
    <React.Fragment>
      {salesRevenue.map(({ id, permonths, firstYear, name, flowPercent }) => (
        <tr key={id} className="font-medium bg-white">
          <td
            className="border border-black px-2 py-1 bg-[#CCFFCC] text-black"
            colSpan={2}
          >
            {name}
          </td>
          {permonths.map((month) => (
            <td key={month.id} className="border border-black px-2 py-1">
              {month.value}
            </td>
          ))}
          <td className="border border-black px-2 py-1 bg-[#CCFFCC] font-bold">
            {firstYear}
          </td>
          <td className="border border-black px-2 py-1 bg-[#ffffff] font-bold">
            {flowPercent}%
          </td>
        </tr>
      ))}
    </React.Fragment>
  );
}

export default CapitalIncreaseLoanCels;
