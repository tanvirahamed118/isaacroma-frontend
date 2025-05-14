import { useTranslation } from "react-i18next";
import Avater1 from "../../assets/logo.png";

import RecentBusinessLoader from "../loader/Recent.business.loader";

interface BusinessData {
  categories: string[];
  verify: boolean;
  id: string;
  name: string;
  sector: string;
  createdAt: string;
}

interface Types {
  business: {
    id: string;
    business: BusinessData[];
  };
  isLoading: boolean;
}
function DashMembers({ business, isLoading }: Types) {
  const { t } = useTranslation();
  const formattedDate = (value: string) => {
    const createDate = new Date(value);
    return createDate?.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  let content;
  if (isLoading) {
    content = (
      <>
        <RecentBusinessLoader />
        <RecentBusinessLoader />
        <RecentBusinessLoader />
        <RecentBusinessLoader />
        <RecentBusinessLoader />
      </>
    );
  }
  if (!isLoading) {
    content = business?.business?.slice(0, 6)?.map((item) => {
      const { id, name, sector, createdAt } = item || {};
      return (
        <div key={id} className="flex gap-2 items-center">
          <img src={Avater1} alt="" className="w-18 h-18 rounded-full" />
          <div className="w-full flex justify-between items-center">
            <span>
              <h3 className="text-xl text-bold">{name}</h3>
              <p className="text-gray-500 text-base font-normal">{sector}</p>
            </span>
            <span>
              <h3 className="text-sm text-bold">{t("join_at")}</h3>
              <p className="text-gray-500 text-sm font-normal">
                {formattedDate(createdAt)}
              </p>
            </span>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="border border-gray-200 p-5 rounded-md mt-5 bg-white">
      <h2 className="text-medium text-xl">{t("recent_join_members")}</h2>
      <div className="w-14 h-1 rounded-full my-3 bg-[#00C897]"></div>
      <div className="flex flex-col gap-6">{content}</div>
    </div>
  );
}

export default DashMembers;
