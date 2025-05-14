import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";

function SidebarCollaps() {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex justify-center items-center py-2">
        <Link to="/">
          <img src={Logo} alt="" className="w-12" />
        </Link>
      </div>
      <div className="mt-5">
        <nav className="mt-5">
          <ul className="flex flex-col gap-4">
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/"}
                  end
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "bg-[#1F3B73] text-white"
                        : "bg-white text-black"
                    }`
                  }
                >
                  <i className="fa-solid fa-table-columns text-md"></i>
                </NavLink>
                <p className="absolute left-full z-20 top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#2B7F75] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  {t("dashboard")}
                </p>
              </div>
            </li>

            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/business/plans"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "bg-[#1F3B73] text-white"
                        : "bg-white text-black"
                    }`
                  }
                >
                  <i className="fa-regular fa-hard-drive text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#2B7F75] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  {t("business_plans")}
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/create-business"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "bg-[#1F3B73] text-white"
                        : "bg-white text-black"
                    }`
                  }
                >
                  <i className="fa-regular fa-building text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#2B7F75] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  {t("business_plans")}
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/businesses"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "bg-[#1F3B73] text-white"
                        : "bg-white text-black"
                    }`
                  }
                >
                  <i className="fa-solid fa-business-time text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#2B7F75] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  {t("businesses")}
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/subscription"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "bg-[#1F3B73] text-white"
                        : "bg-white text-black"
                    }`
                  }
                >
                  <i className="fa-solid fa-money-bill-trend-up text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#2B7F75] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  {t("subscriptions")}
                </p>
              </div>
            </li>

            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "bg-[#1F3B73] text-white"
                        : "bg-white text-black"
                    }`
                  }
                >
                  <i className="fa-regular fa-id-badge text-md"></i>
                </NavLink>
                <p className="absolute left-full top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#2B7F75] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  {t("profile")}
                </p>
              </div>
            </li>
            <li className="flex justify-center">
              <div className="group relative inline-block">
                <NavLink
                  to={"/profile-setting"}
                  className={({ isActive }) =>
                    `border border-gray-300 shadow-sm rounded-md w-12 h-12 flex justify-center items-center ${
                      isActive
                        ? "bg-[#1F3B73] text-white"
                        : "bg-white text-black"
                    }`
                  }
                >
                  <i className="fa-solid fa-gear text-md"></i>
                </NavLink>
                <p className="absolute left-full z-50 top-2 ml-3 whitespace-nowrap bg-white text-medium text-base text-[#2B7F75] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                  {t("setting")}
                </p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarCollaps;
