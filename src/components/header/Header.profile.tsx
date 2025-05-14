import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

interface Types {
  isProfile: boolean;
  handleLogout: () => void;
  setIsProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderProfile({ isProfile, handleLogout, setIsProfile }: Types) {
  const { t } = useTranslation();
  const handleDown = () => {
    setIsProfile(false);
  };

  return (
    <div
      className={`absolute bg-white p-5 rounded-md shadow-md border border-gray-100 w-40 top-10 right-0 transition-all duration-200 ease-in-out transform ${
        isProfile
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
      }`}
    >
      <ul className="flex flex-col gap-3 items-start justify-center">
        <li onClick={handleDown}>
          <Link
            to={"/profile"}
            className="flex gap-2 items-center justify-start hover:text-[#1F3B73]"
          >
            <i className="fa-regular fa-user text-sm"></i>
            <p className="font-medium text-sm">{t("profile")}</p>
          </Link>
        </li>
        <li onClick={handleDown}>
          <Link
            to={"/profile-setting"}
            className="flex gap-2 items-center hover:text-[#1F3B73]"
          >
            <i className="fa-solid fa-gear text-sm"></i>
            <p className="font-medium text-sm">{t("setting")}</p>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center hover:underline cursor-pointer hover:text-[#1F3B73]"
          >
            <i className="fa-solid fa-right-from-bracket text-sm"></i>
            <p className="font-medium text-sm">{t("logout")}</p>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HeaderProfile;
