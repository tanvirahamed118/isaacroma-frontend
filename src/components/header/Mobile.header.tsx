import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Types {
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileHeader({ navbar, setNavbar }: Types) {
  const { t } = useTranslation();
  const handleClose = () => {
    setNavbar(false);
  };

  useEffect(() => {
    if (navbar) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navbar]);

  return (
    <header className="bg-black w-full">
      <div
        onClick={() => setNavbar(false)}
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20 ${
          navbar ? "overlay-active" : "overlay-inactive"
        }`}
      ></div>

      <div
        className={
          navbar
            ? "w-72 h-screen bg-white border-r border-gray-200 absolute top-0 left-0 active z-20"
            : "w-72 h-screen bg-white border-r border-gray-200 absolute top-0 left-0 inactive"
        }
      >
        <div className="relative">
          <div className="flex justify-center items-center py-2">
            <Link to={""}>
              <img onClick={handleClose} src={Logo} alt="" className="w-24" />
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
                    onClick={() => setNavbar(false)}
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
                    onClick={() => setNavbar(false)}
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
                    <p className="text-base font-medium">
                      {t("business_plans")}
                    </p>
                  </NavLink>
                </li>
                <li className="px-4">
                  <NavLink
                    to={"/create-business"}
                    onClick={() => setNavbar(false)}
                    className={({ isActive }) =>
                      `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                        isActive
                          ? " text-[#1F3B73] bg-[#F7F8F9]"
                          : " text-[#212529]"
                      }`
                    }
                  >
                    <i className="fa-regular fa-building"></i>
                    <p className="font-medium text-base">
                      {t("create_business")}
                    </p>
                  </NavLink>
                </li>
                <li className="px-4">
                  <NavLink
                    to={"/businesses"}
                    onClick={() => setNavbar(false)}
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
                    onClick={() => setNavbar(false)}
                    className={({ isActive }) =>
                      `flex gap-3 rounded-lg items-center hover:text-[#1F3B73] py-2 px-4 ${
                        isActive
                          ? " text-[#1F3B73] bg-[#F7F8F9]"
                          : " text-[#212529]"
                      }`
                    }
                  >
                    <i className="fa-solid fa-money-bill-trend-up"></i>
                    <p className="font-medium text-base">
                      {t("subscriptions")}
                    </p>
                  </NavLink>
                </li>

                <li className="px-4">
                  <NavLink
                    to={"/profile"}
                    onClick={() => setNavbar(false)}
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
                    onClick={() => setNavbar(false)}
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
          <button
            onClick={handleClose}
            className="border border-gray-300 shadow-sm rounded-full bg-white w-8 h-8 flex justify-center items-center absolute top-1 right-[-15px] hover:bg-[#2B7F75] hover:text-white cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
