import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";

function SidebarNoCollaps() {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex justify-center items-center py-2">
        <Link to={""}>
          <img src={Logo} alt="" className="w-24" />
        </Link>
      </div>
      <div className="mt-5">
        <h2 className="text-thin text-sm pl-8 uppercase tracking-widest">
          {t("overview")}
        </h2>
        <nav className="mt-5">
          <ul className="flex flex-col gap-0">
            <li className="px-4">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                    isActive
                      ? " text-[#1F3B73] bg-[#F7F8F9]"
                      : " text-[#212529]"
                  }`
                }
                end
              >
                <i className="fa-solid fa-table-columns text-sm"></i>
                <p className="text-base font-medium">{t("dashboard")}</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/business/plans"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                    isActive
                      ? " text-[#1F3B73] bg-[#F7F8F9]"
                      : " text-[#212529]"
                  }`
                }
                end
              >
                <i className="fa-regular fa-hard-drive"></i>
                <p className="text-base font-medium">{t("business_plans")}</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/create-business"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                    isActive
                      ? " text-[#1F3B73] bg-[#F7F8F9]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-building"></i>
                <p className="font-medium text-base">{t("create_business")}</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/businesses"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                    isActive
                      ? " text-[#1F3B73] bg-[#F7F8F9]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-solid fa-business-time"></i>
                <p className="font-medium text-base">{t("businesses")}</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/subscription"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                    isActive
                      ? " text-[#1F3B73] bg-[#F7F8F9]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-solid fa-money-bill-trend-up"></i>
                <p className="font-medium text-base">{t("subscriptions")}</p>
              </NavLink>
            </li>

            <li className="px-4">
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                    isActive
                      ? " text-[#1F3B73] bg-[#F7F8F9]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-regular fa-id-badge"></i>
                <p className="font-medium text-base">{t("profile")}</p>
              </NavLink>
            </li>
            <li className="px-4">
              <NavLink
                to={"/profile-setting"}
                className={({ isActive }) =>
                  `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                    isActive
                      ? " text-[#1F3B73] bg-[#F7F8F9]"
                      : " text-[#212529]"
                  }`
                }
              >
                <i className="fa-solid fa-gear text-sm"></i>
                <p className="font-medium text-base">{t("setting")}</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarNoCollaps;
