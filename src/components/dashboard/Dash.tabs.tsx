import { useTranslation } from "react-i18next";

interface BusinessData {
  id: string;
  categories: string[];
}

interface Types {
  business: {
    id: string;
    business: BusinessData[];
  };
}

function DashTabs({ business }: Types) {
  const { t } = useTranslation();
  const totalCategories = business?.business?.reduce(
    (sum, item) => sum + (item.categories?.length || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
      <div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex gap-3 items-center">
          <span className="text-[#00C897] bg-[#00c89644] min-w-16 min-h-16 flex justify-center items-center rounded-full">
            <i className="fa-solid fa-chart-pie text-3xl"></i>
          </span>
          <span>
            <p className="text-normal text-md">{t("new_created_business")}</p>
            <h2 className="text-bold text-2xl">{business?.business?.length}</h2>
          </span>
        </div>
        <div className="mt-6">
          <p className="text-normal text-md">
            <span className="text-[#00C897] font-bold">
              +{business?.business?.length}
            </span>{" "}
            {t("recently_created_businesses")}
          </p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 p-3 rounded-lg">
        <div className="flex gap-3 items-center">
          <span className="text-[#1F3B73] bg-[#1f3b733a] min-w-16 min-h-16 flex justify-center items-center rounded-full">
            <i className="fa-solid fa-chart-simple text-3xl"></i>
          </span>
          <span>
            <p className="text-normal text-md">{t("category_createed")}</p>
            <h2 className="text-bold text-2xl">{totalCategories}</h2>
          </span>
        </div>
        <div className="mt-6">
          <p className="text-normal text-md">
            <span className="text-[#1F3B73] font-bold">+{totalCategories}</span>{" "}
            {t("recently_created_categories")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashTabs;
