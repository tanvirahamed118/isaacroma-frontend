import React, { useState } from "react";
import UpdateDepreciationProj from "../../Update.depreciation.proj";
import { useTranslation } from "react-i18next";

type BusinessResult = {
  name: string;
  firstYear: number;
  id: string;
  secondYear: number;
  expectedPercent: number;
  deviation: number;
};

interface Business {
  businessResults?: BusinessResult[];
}

function DepriciationProjectionCels({ data }: { data?: Business }) {
  const { t } = useTranslation();
  const businessResults = data?.businessResults;
  const [isShow, setIsShow] = useState(false);
  const [selectId, setSelectId] = useState("");
  const [name, setName] = useState("");
  const totalSalesRev = businessResults?.find((item) => {
    return item.name === "PROJECTION_DEPRECIATION";
  });

  const { firstYear, secondYear, expectedPercent, deviation, id } =
    totalSalesRev || {};

  const handleChose = (id: string, name: string) => {
    setIsShow(true);
    setSelectId(id);
    setName(name);
  };

  return (
    <React.Fragment>
      <tr className="font-bold bg-white">
        <td
          colSpan={6}
          className="bg-[#808000] font-medium text-center border px-2 py-1 border-black text-white"
        >
          {t("depreciation")}
        </td>

        <td className="border border-black px-2 py-1">{firstYear}</td>
        <td className="border border-black px-2 py-1">
          <div className="flex gap-3 items-center justify-between">
            <p>{expectedPercent}</p>
            <button
              onClick={() => handleChose(id ? id : "", "expectedPercent")}
              className="cursor-pointer p-1 hover:bg-[#0000002d] rounded-full"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </div>
        </td>
        <td className="border border-black px-2 py-1">
          <div className="flex gap-3 items-center justify-between">
            <p>{secondYear}%</p>
            <button
              onClick={() => handleChose(id ? id : "", "secondYear")}
              className="cursor-pointer p-1 hover:bg-[#0000002d] rounded-full"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </div>
        </td>
        <td className="border border-black px-2 py-1">
          <div className="flex gap-3 items-center justify-between">
            <p>{deviation}</p>
            <button
              onClick={() => handleChose(id ? id : "", "deviation")}
              className="cursor-pointer p-1 hover:bg-[#0000002d] rounded-full"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </div>
        </td>
      </tr>
      {isShow && (
        <UpdateDepreciationProj
          isShow={isShow}
          setIsShow={setIsShow}
          selectId={selectId}
          name={name}
        />
      )}
    </React.Fragment>
  );
}

export default DepriciationProjectionCels;
