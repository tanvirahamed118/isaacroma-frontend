import React, { useState } from "react";
import UpdateCashflowPermont from "../../Update.cashflow.permont";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  total: number;
  flowPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  cashflows?: BusinessResult[];
}

function PreviousBalanceCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const cashflows = data?.cashflows;
  const [isShow, setIsShow] = useState(false);
  const [selectId, setSelectId] = useState("");
  const prevousBalance = cashflows?.find((item) => {
    return item.name === "PREVIOUS_BALANCE";
  });

  const handleChose = (id: string) => {
    setIsShow(true);
    setSelectId(id);
  };

  return (
    <React.Fragment>
      <tr className="bg-[#CCFFCC] font-normal">
        <td
          colSpan={2}
          className="bg-[#CCFFCC] border border-black px-2 py-1 italic font-medium"
        >
          {t("previous_balances")}
        </td>

        {prevousBalance?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1 bg-white">
            <div className="flex gap-3 items-center">
              <p>{month.value}</p>
              <button
                onClick={() => handleChose(month.id)}
                className="cursor-pointer p-1 hover:bg-[#0000002d] rounded-full"
              >
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
          </td>
        ))}
        <td className="border border-black px-2 py-1 font-bold">
          {prevousBalance?.total}
        </td>
        <td className="border border-black px-2 py-1 font-bold">
          {prevousBalance?.flowPercent}%
        </td>
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

export default PreviousBalanceCels;
