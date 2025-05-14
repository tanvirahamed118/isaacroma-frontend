import CapitalCels from "../cels/Capital.cels";
import EbtdaCels from "../cels/Ebtda.cels";
import DirectExpenseCels from "../cels/Direct.expense.cels";
import ExtraordinaryCels from "../cels/Extraordinary.cels";
import FinancialCels from "../cels/Financial.cels";
import PersonalCels from "../cels/Personal.cels";
import SalesCels from "../cels/Sales.cels";
import TotalExpenseCels from "../cels/Total.expense.cels";
import DepreciationCels from "../cels/Depreciation.cels";
import DirectResultCels from "../cels/Direct-result.cels";
import OtherInExpenseCels from "../cels/Other.inExpense.cels";
import OperatingProfitCels from "../cels/Operating.profit.cels";
import CamulativeCels from "../cels/Camulative.cels";
import CostofSaleCels from "../cels/CostofSale.cels";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  firstYear: number;
  budgetPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

type Category = {
  name: string;
  id: string;
  firstYear: number;
  budgetPercent: number;
  category: string;
  permonths: { id: string; name: string; value: number }[];
};

type BudgetData = {
  business?: {
    businessResults?: BusinessResult[];
    categories: Category[];
  };
};

function BudgetTable({ business }: BudgetData) {
  const { t } = useTranslation();
  const businessResults = business?.businessResults;

  const forecast = businessResults?.find((item) => {
    return item.name === "MONTHLY_SALES_FORECAST";
  });

  return (
    <div className="overflow-x-auto">
      <table className="heading table-auto w-full border-collapse text-sm font-normal min-w-[1600px]">
        <thead className="">
          <tr className="bg-[#003300] text-white">
            <th className="px-2 py-2 border border-black italic">
              {t("definition_of_concept")}
            </th>
            <th className="px-2 py-2 border border-black italic" colSpan={2}>
              {t("amounts")}
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 1
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 2
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 3
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 4
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 5
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 6
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 7
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 8
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 9
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 10
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 11
            </th>
            <th className="px-2 py-2 border border-black italic">
              {t("Month")} 12
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <tr className="bg-[#339966] font-bold text-[#FFFF00]">
            <td className="border px-2 py-1 border-black">
              {t("forecast_monthly_income_without")}
            </td>

            <td className="border px-2 py-1 border-black" colSpan={2}>
              {forecast?.firstYear}
            </td>
            {forecast?.permonths?.length &&
              forecast.permonths.map(
                (item: { id: string; name: string; value: number }) => {
                  const { id, value } = item || {};
                  return (
                    <td key={id} className="border border-black px-2 py-1">
                      {value}
                    </td>
                  );
                }
              )}
          </tr>
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <SalesCels data={business} />
          <CapitalCels data={business} />

          <tr>
            <td colSpan={14} className="h-3"></td>
          </tr>

          <TotalExpenseCels data={business} />

          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <CostofSaleCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <PersonalCels data={business} />

          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <ExtraordinaryCels data={business} />

          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <FinancialCels data={business} />

          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <DirectExpenseCels data={business} />

          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <EbtdaCels data={business} />

          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <DepreciationCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <DirectResultCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <OtherInExpenseCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <OperatingProfitCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>

          <CamulativeCels data={business} />
        </tbody>
      </table>
    </div>
  );
}

export default BudgetTable;
