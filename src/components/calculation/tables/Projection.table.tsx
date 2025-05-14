import { useTranslation } from "react-i18next";
import CamucalativeProjectionCels from "../cels/projectionCels/Camucalative.projection.cels";
import CapitalProjectionCels from "../cels/projectionCels/Capital.projection.cels";
import CostofSaleProjectionCels from "../cels/projectionCels/CostofSale.projection.cels";
import DepriciationProjectionCels from "../cels/projectionCels/Depriciation.projection.cels";
import DirectExpenseProjectionCels from "../cels/projectionCels/DirectExpense.projection.cels";
import DirectResProjectionCels from "../cels/projectionCels/DirectRes.projection.cels";
import EditdaProjectionCels from "../cels/projectionCels/Editda.projection.cels";
import ExtraordinaryProjectionCels from "../cels/projectionCels/Extraordinary.projection.cels";
import FinancialProjectionCels from "../cels/projectionCels/Financial.projection.cels";
import MonthlyForecastProjCels from "../cels/projectionCels/Monthly.forecastProj.cels";
import OperatingProfitProjectionCels from "../cels/projectionCels/OperatingProfit.projection.cels";
import OtherinExProjectionCels from "../cels/projectionCels/OtherinEx.projection.cels";
import PersonalProjectionCels from "../cels/projectionCels/Personal.projection.cels";
import SalesProjectionCels from "../cels/projectionCels/Sales.projection.cels";
import TotalCapitalprojectionCels from "../cels/projectionCels/Total.capitalprojection.cels";
import TotalCostofsalesProjectionCels from "../cels/projectionCels/Total.costofsalesProjection.cels";
import TotalExtraordinaryProjCels from "../cels/projectionCels/Total.extraordinaryProj.cels";
import TotalFinancialProjextionCels from "../cels/projectionCels/Total.financialProjextion.cels";
import TotalPersoanalProjectionCels from "../cels/projectionCels/Total.persoanalProjection.cels";
import TotalSalesProjectionCels from "../cels/projectionCels/Total.salesProjection.cels";

type cashflows = {
  name: string;
  total: number;
  flowPercent: number;
  budgetPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

type BusinessResult = {
  name: string;
  firstYear: number;
  secondYear: number;
  expectedPercent: number;
  deviation: number;
  id: string;
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
type BudgetData = {
  business?: {
    cashflows?: cashflows[];
    businessResults?: BusinessResult[];
    categories: Category[];
  };
};

function ProjectionTable({ business }: BudgetData) {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-auto">
      <table className="heading table-auto border-collapse text-sm font-normal min-w-[1000px]">
        <thead>
          <tr>
            <th colSpan={6}></th>
            <th className="px-2 py-2 border border-black italic bg-white">
              {t("year")} 1
            </th>
            <th></th>
            <th className="px-2 py-2 border border-black italic bg-white">
              {t("year")}
            </th>
            <th className="px-2 py-2 border border-black italic bg-white">
              {t("deviation")}
            </th>
          </tr>
        </thead>
        <tbody>
          <MonthlyForecastProjCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <TotalSalesProjectionCels data={business} />
          <SalesProjectionCels data={business} />
          <TotalCapitalprojectionCels data={business} />

          <CapitalProjectionCels data={business} />

          <tr>
            <td colSpan={14} className="h-6"></td>
          </tr>

          <tr className="font-bold">
            <td colSpan={6}></td>
            <td className="px-2 py-2 border border-black italic bg-white">
              {t("year")} 1
            </td>
            <td></td>
            <td className="px-2 py-2 border border-black italic bg-white">
              {t("year")}
            </td>
            <td className="px-2 py-2 border border-black italic bg-white">
              {t("deviation")}
            </td>
          </tr>

          <TotalCostofsalesProjectionCels data={business} />
          <CostofSaleProjectionCels data={business} />
          <TotalPersoanalProjectionCels data={business} />
          <PersonalProjectionCels data={business} />
          <TotalExtraordinaryProjCels data={business} />
          <ExtraordinaryProjectionCels data={business} />
          <TotalFinancialProjextionCels data={business} />
          <FinancialProjectionCels data={business} />

          <tr>
            <td colSpan={14} className="h-6"></td>
          </tr>

          <DirectExpenseProjectionCels data={business} />
          <tr>
            <td colSpan={14} className="h-2"></td>
          </tr>
          <EditdaProjectionCels data={business} />
          <tr>
            <td colSpan={14} className="h-2"></td>
          </tr>
          <DepriciationProjectionCels data={business} />
          <tr>
            <td colSpan={14} className="h-2"></td>
          </tr>
          <DirectResProjectionCels data={business} />
          <tr>
            <td colSpan={14} className="h-2"></td>
          </tr>

          <OtherinExProjectionCels data={business} />
          <tr>
            <td colSpan={14} className="h-2"></td>
          </tr>
          <OperatingProfitProjectionCels data={business} />
          <tr>
            <td colSpan={14} className="h-2"></td>
          </tr>
          <CamucalativeProjectionCels data={business} />
        </tbody>
      </table>
    </div>
  );
}

export default ProjectionTable;
