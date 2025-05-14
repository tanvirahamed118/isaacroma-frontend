import React, { useState } from "react";
import UpdateCashflowPercent from "../../Update.cashflow.percent";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  id: string;
  total: number;
  flowPercent: number;
  inputPercent: number;
  permonths: { id: string; name: string; value: number }[];
};

interface Business {
  cashflows?: BusinessResult[];
}

function RecoverdCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const cashflows = data?.cashflows;
  const [isShow, setIsShow] = useState(false);
  const [selectId, setSelectId] = useState("");
  const prevousBalance = cashflows?.find((item) => {
    return item.name === "RECOVERED_PERCENT";
  });

  const handleChose = (id: string) => {
    setIsShow(true);
    setSelectId(id);
  };

  return (
    <React.Fragment>
      <tr className="bg-[#ffffff] font-normal">
        <td className="bg-[#CCFFCC] border border-black px-2 py-1 italic font-medium">
          {t("recovered")} %
        </td>
        <td className="border border-black px-2 py-1">
          <div className="flex gap-3 items-center">
            <p>{prevousBalance?.inputPercent}%</p>
            <button
              onClick={() =>
                handleChose(prevousBalance?.id ? prevousBalance?.id : "")
              }
              className="cursor-pointer p-1 hover:bg-[#0000002d] rounded-full"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </div>
        </td>
        {prevousBalance?.permonths?.map((month) => (
          <td key={month.id} className="border border-black px-2 py-1">
            {month.value}
          </td>
        ))}
        <td className="border border-black px-2 py-1 font-bold bg-[#CCFFCC]">
          {prevousBalance?.total}
        </td>
        <td className="border border-black px-2 py-1 font-bold bg-[#CCFFCC]">
          {prevousBalance?.flowPercent}%
        </td>
      </tr>
      {isShow && (
        <UpdateCashflowPercent
          isShow={isShow}
          setIsShow={setIsShow}
          selectId={selectId}
        />
      )}
    </React.Fragment>
  );
}

export default RecoverdCels;
