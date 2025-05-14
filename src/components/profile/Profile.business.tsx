import { useTranslation } from "react-i18next";
import { useGetAllBusinessByUserIdQuery } from "../../redux/features/business/businessApi";
import ProfileBusinessLoader from "../loader/Profile.business.loader";

function ProfileBusiness() {
  const { t } = useTranslation();
  const auth = localStorage.getItem("auth");
  const user = auth ? JSON.parse(auth) : null;
  const id = user?.user?.id;
  const { data: getData, isLoading } = useGetAllBusinessByUserIdQuery({
    userId: id,
    page: 1,
    limit: 5,
    sort: "asc",
  });

  const business = getData?.data?.business;
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
        <ProfileBusinessLoader />
        <ProfileBusinessLoader />
        <ProfileBusinessLoader />
        <ProfileBusinessLoader />
        <ProfileBusinessLoader />
      </>
    );
  }
  if (!isLoading && business?.length === 0) {
    content = (
      <p className="bg-amber-100 text-md font-normal p-3 rounded-md">
        {t("data_not_found")}
      </p>
    );
  }
  if (!isLoading && business?.length > 0) {
    content = business?.map(
      (item: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
        sector: string;
      }) => {
        const { id, name, description, createdAt, sector } = item || [];

        return (
          <div
            key={id}
            className="bg-white border p-5 border-gray-300 rounded-lg flex md:flex-row flex-col gap-3 justify-between items-start md:items-center"
          >
            <div className="flex gap-3 md:flex-row flex-col items-start md:items-center w-9/12">
              <div className="min-w-24 min-h-24 border border-gray-300 rounded-md flex justify-center items-center">
                <i className="fa-regular fa-hospital text-5xl text-[#27746B]"></i>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex gap-3 items-center">
                  <h3 className="text-medium text-xl jost capitalize">
                    {name}
                  </h3>
                  <p className="bg-[#2B7F75] text-white px-4 py-1 rounded-full text-xs m-0 font-medium uppercase">
                    {sector}
                  </p>
                </span>
                <span className="flex gap-2 items-center">
                  <i className="fa-regular fa-calendar text-xs text-gray-400"></i>
                  <p className="text-sm text-gray-400 font-normal">
                    {formattedDate(createdAt)}
                  </p>
                </span>
                <p className="text-sm text-gray-400 font-normal">
                  {description?.slice(0, 100)}
                </p>
              </div>
            </div>
          </div>
        );
      }
    );
  }
  return <div className="flex flex-col gap-5 my-5">{content}</div>;
}

export default ProfileBusiness;
