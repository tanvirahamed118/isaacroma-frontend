import { Link } from "react-router";
import { useGetAllBusinessByUserIdQuery } from "../../redux/features/business/businessApi";
import HeaderBoxLoader from "../loader/Header.box.loader";
import { useTranslation } from "react-i18next";

interface Types {
  isNotify: boolean;
  userId: string;
}

function HeaderNotification({ isNotify, userId }: Types) {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllBusinessByUserIdQuery({
    userId,
    page: 1,
    limit: 6,
    sort: "asc",
  });

  const notifications = data?.data?.business;

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
        <HeaderBoxLoader />
        <HeaderBoxLoader />
        <HeaderBoxLoader />
        <HeaderBoxLoader />
        <HeaderBoxLoader />
      </>
    );
  }
  if (notifications?.length === 0) {
    content = (
      <li>
        <p>{t("data_not_found")}</p>
      </li>
    );
  }
  if (notifications?.length > 0) {
    content = notifications?.map(
      (item: { id: string; createdAt: string; name: string }) => {
        const { id, createdAt, name } = item || {};

        return (
          <li key={id} className="flex gap-2 items-center cursor-pointer">
            <div className="w-12 h-12">
              <p className="bg-[#2B7F75] w-12 h-12 flex justify-center items-center rounded-md">
                <i className="fa-regular fa-bell text-white text-2xl"></i>
              </p>
            </div>
            <Link to={`/create-business/${id}`}>
              <h2 className={`text-normal text-sm capitalize font-normal}`}>
                {name}
              </h2>

              <p className="text-sm text-gray-400 font-normal">
                {formattedDate(createdAt)}
              </p>
            </Link>
          </li>
        );
      }
    );
  }
  return (
    <div
      className={`absolute bg-white p-5 rounded-md shadow-sm border border-gray-100 md:w-80 w-[340px] top-10 right-[-110px] md:right-0 transition-all duration-200 ease-in-out transform origin-top-right ${
        isNotify
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
      }`}
    >
      <h2 className="text-[#2B7F75] text-lg font-medium">
        {t("recently_created_businesses")}
      </h2>
      <ul className="flex flex-col gap-4 mt-5 overflow-y-auto max-h-[calc(60vh-150px)] pr-2 message-scrollbar">
        {content}
      </ul>
    </div>
  );
}

export default HeaderNotification;
