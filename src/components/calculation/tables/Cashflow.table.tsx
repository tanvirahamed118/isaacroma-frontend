import { useTranslation } from "react-i18next";
import AccoumBegainCels from "../cels/cashflowCels/Accoum.begain.cels";
import AccoumEndCels from "../cels/cashflowCels/Accoum.end.cels";
import CapitalIncreaseLoanCels from "../cels/cashflowCels/Capital.increaseLoan.cels";
import MonthlyNetbalanceCels from "../cels/cashflowCels/Monthly.netbalance.cels";
import PreviousBalanceCels from "../cels/cashflowCels/Previous.balance.cels";
import RecoverdCels from "../cels/cashflowCels/Recoverd.cels";
import TotalCostofsalesCels from "../cels/cashflowCels/Total.costofsales.cels";
import TotalExtraordinaryCels from "../cels/cashflowCels/Total.extraordinary.cels";
import TotalNetcollectionCels from "../cels/cashflowCels/Total.netcollection.cels";
import TotalOperatingColCels from "../cels/cashflowCels/Total.operatingCol.cels";
import TotalOperativePaymentCels from "../cels/cashflowCels/Total.operativePayment.cels";
import TotalOthercharges from "../cels/cashflowCels/Total.othercharges";
import TotalOtherIncomeExCels from "../cels/cashflowCels/Total.otherIncomeEx.cels";
import TotalOtherPaymentCels from "../cels/cashflowCels/Total.otherPayment.cels";
import TotalPaymentCels from "../cels/cashflowCels/Total.payment.cels";
import TotalPersonalEexpenseCels from "../cels/cashflowCels/Total.personalEexpense.cels";
import TotalPresentedColCels from "../cels/cashflowCels/Total.presentedCol.cels";
import TotalSalesCels from "../cels/cashflowCels/Total.sales.cels";
import UnpaidCels from "../cels/cashflowCels/Unpaid.cels";

type cashflows = {
  name: string;
  total: number;
  flowPercent: number;
  budgetPercent: number;
  id: string;
  inputPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

type BusinessResult = {
  name: string;
  firstYear: number;
  flowPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

type BudgetData = {
  business: {
    cashflows: cashflows[];
    businessResults: BusinessResult[];
  };
};

function CashflowTable({ business }: BudgetData) {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-auto">
      <table className="heading table-auto w-full border-collapse text-sm font-normal min-w-[1600px]">
        <thead className="">
          <tr className="bg-[#808000] text-white">
            <th colSpan={2} className="px-2 py-2 border border-black italic">
              {t("cash_flow_forecast")}
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
            <th className="px-2 py-2 border border-black italic">
              {t("total")}
            </th>
            <th className="px-2 py-2 border border-black italic">%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <AccoumBegainCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <tr className="bg-[#339966] font-bold text-white">
            <td className="border border-black px-2 py-1" colSpan={2}>
              {t("operational_fees")}
            </td>
          </tr>
          <TotalSalesCels data={business} />
          <PreviousBalanceCels data={business} />
          <TotalPresentedColCels data={business} />
          <UnpaidCels data={business} />
          <RecoverdCels data={business} />
          <TotalOperatingColCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <tr className="bg-[#339966] font-bold text-white">
            <td className="border border-black px-2 py-1" colSpan={2}>
              {t("other_fees")}
            </td>
          </tr>
          <CapitalIncreaseLoanCels data={business} />
          <TotalOthercharges data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <TotalNetcollectionCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <tr className="bg-[#993300] font-bold text-[#FFFF00]">
            <td className="border border-black px-2 py-1" colSpan={2}>
              {t("operational_payments")}
            </td>
          </tr>
          <TotalCostofsalesCels data={business} />
          <TotalPersonalEexpenseCels data={business} />
          <TotalExtraordinaryCels data={business} />
          <TotalOperativePaymentCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <tr className="bg-[#993300] font-bold text-[#FFFF00]">
            <td className="border border-black px-2 py-1" colSpan={2}>
              {t("other_payments")}
            </td>
          </tr>
          <TotalOtherIncomeExCels data={business} />
          <TotalOtherPaymentCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <TotalPaymentCels data={business} />
          <tr>
            <td colSpan={14} className="h-4"></td>
          </tr>
          <MonthlyNetbalanceCels data={business} />
          <AccoumEndCels data={business} />
        </tbody>
      </table>
    </div>
  );
}

export default CashflowTable;
