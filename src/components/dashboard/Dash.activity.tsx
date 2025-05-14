import { useTranslation } from "react-i18next";

interface BusinessData {
  id: string;
  categories: string[];
  verify: boolean;
}

interface Types {
  business: {
    id: string;
    business: BusinessData[];
  };
}

function DashActivity({ business }: Types) {
  const { t } = useTranslation();
  const totalCategories = business?.business?.reduce(
    (sum, item) => sum + (item.categories?.length || 0),
    0
  );
  const verifyBusiness = business?.business?.filter((item) => item.verify);
  const unverifyBusiness = business?.business?.filter((item) => !item.verify);
  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg">
      <div>
        <p className="text-normal text-base">
          {t("recent_create_all_businesses")}
        </p>
        <div className="flex gap-3 items-center mt-3">
          <h2 className="text-bold text-2xl">{business?.business?.length}</h2>
          <span className="flex gap-2 items-center">
            <i className="fa-solid fa-chart-line text-[#1F3B73] text-sm"></i>
            <p className="text-[#1F3B73] text-sm font-bold">
              +{business?.business?.length}
            </p>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-7 mt-10">
        <div className="flex gap-2 items-center justify-start">
          <p className="whitespace-nowrap text-medium text-base w-fit">
            {t("total_businesses")}
          </p>
          <span className="bg-[#1F3B73] w-12/12 rounded-full flex justify-end items-center px-1 py-1">
            <p className="text-bold bg-white py-[2px] px-3 rounded-full text-xs">
              {business?.business?.length}
            </p>
          </span>
        </div>
        <div className="flex gap-2 items-center justify-start">
          <p className="whitespace-nowrap text-medium text-base w-fit">
            {t("total_category")}
          </p>
          <span className="bg-[#00C897] w-12/12 rounded-full flex justify-end items-center px-1 py-1">
            <p className="text-bold bg-white py-[2px] px-3 rounded-full text-xs">
              {totalCategories}
            </p>
          </span>
        </div>
        <div className="flex gap-2 items-center justify-start">
          <p className="whitespace-nowrap text-medium text-base w-fit">
            {t("total_verify_businesses")}
          </p>
          <span className="bg-[#212529] w-12/12 rounded-full flex justify-end items-center px-1 py-1">
            <p className="text-bold bg-white py-[2px] px-3 rounded-full text-xs">
              {verifyBusiness?.length}
            </p>
          </span>
        </div>
        <div className="flex gap-2 items-center justify-start">
          <p className="whitespace-nowrap text-medium text-base w-fit">
            {t("total_unverified_businesses")}
          </p>
          <span className="bg-[#176B87] w-12/12 rounded-full flex justify-end items-center px-1 py-1">
            <p className="text-bold bg-white py-[2px] px-3 rounded-full text-xs">
              {unverifyBusiness?.length}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashActivity;
