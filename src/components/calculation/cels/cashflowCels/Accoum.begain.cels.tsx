import React, { useState } from "react";
import UpdateCashflowPermont from "../../Update.cashflow.permont";
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

function AccoumBegainCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const accoumBegain = data?.cashflows?.find(
    (item) => item.name === "ACCUMULATED_BALANCE_BEGAINING"
  );
  const [isShow, setIsShow] = useState(false);
  const [selectId, setSelectId] = useState("");
  const jan = accoumBegain?.permonths?.find((item) => item.name === "JANUARY");

  const otherMonths = accoumBegain?.permonths
    ?.filter((item) => item.name !== "JANUARY")
    ?.sort((a, b) => MONTH_ORDER.indexOf(a.name) - MONTH_ORDER.indexOf(b.name));

  const handleChose = (id: string) => {
    setIsShow(true);
    setSelectId(id);
  };

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-bold">
        <td
          colSpan={2}
          className="bg-[#808000] border px-2 py-1 border-black text-white text-xs"
        >
          {t("accumulated_beginning")}
        </td>
        <td className="border border-black px-2 py-1 bg-white">
          <div className="flex gap-3 items-center">
            <p>{jan?.value}</p>
            <button
              onClick={() => handleChose(jan ? jan.id : "")}
              className="cursor-pointer p-1 hover:bg-[#0000002d] rounded-full"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </div>
        </td>
        {otherMonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
      </tr>
      {isShow && (
        <UpdateCashflowPermont
          isShow={isShow}
          setIsShow={setIsShow}
          selectId={selectId}
        />
      )}
    </React.Fragment>
  );
}

export default AccoumBegainCels;
