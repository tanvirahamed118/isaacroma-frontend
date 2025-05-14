import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import SpainFlag from "../../assets/spain-flag.svg";
import EnglishFlag from "../../assets/english-flag.svg";
import HeaderProfile from "./Header.profile";
import { useEffect, useRef, useState } from "react";
import HeaderNotification from "./Header.notification";
import HeaderLanguage from "./Header.language";
import { useGetOneUserQuery } from "../../redux/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";
import { loggedOut } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

interface Types {
  setSidebard: React.Dispatch<React.SetStateAction<boolean>>;
  sidebar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setSidebard, sidebar, setNavbar }: Types) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isProfile, setIsProfile] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [isMess, setIsMess] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notifyRef = useRef<HTMLDivElement | null>(null);
  const messRef = useRef<HTMLDivElement | null>(null);
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const id = userData?.user?.id;
  const { data } = useGetOneUserQuery(id);
  const profile = data?.user?.profile;
  const username = data?.user?.username;
  const dispatch = useDispatch();
  const currentLang = i18n.language;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target as Node)
      ) {
        setIsNotify(false);
      }
      if (messRef.current && !messRef.current.contains(event.target as Node)) {
        setIsMess(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(loggedOut());
    setTimeout(() => {
      navigate("/auth/login");
      toast.success("Logout successful");
    }, 1000);
  };

  return (
    <header className="sticky z-10 top-0 bg-white flex justify-between items-center h-16 border-b-2 border-gray-200 p-3 md:px-5">
      <div className="flex gap-5 items-center w-3/12">
        <button
          onClick={() => setSidebard(!sidebar)}
          className="xl:block hidden border shadow-sm border-gray-200 px-2 py-1 rounded-lg cursor-pointer"
        >
          {sidebar ? (
            <i className="fa-solid fa-compress"></i>
          ) : (
            <i className="fa-solid fa-minimize"></i>
          )}
        </button>
        <button
          onClick={() => setNavbar(true)}
          className="block xl:hidden border shadow-sm border-gray-200 px-2 py-1 rounded-lg cursor-pointer"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="hidden md:block min-w-[300px] cursor-pointer">
          <div
            onClick={() => navigate("/businesses")}
            className="relative border border-gray-300 px-3 py-2 rounded-md"
          >
            <span className="flex gap-4 items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
              <div className="text-normal text-base outline-none w-full pr-10">
                <p>{t("search_business")}</p>
              </div>
            </span>
            <i className="fa-solid fa-sliders absolute top-2 right-2 border shadow-sm border-gray-200 px-2 py-1 rounded-lg bg-white"></i>
          </div>
        </div>
      </div>
      <div className="flex gap-3 md:gap-5 items-center">
        <div className="relative" ref={messRef}>
          {currentLang === "en" ? (
            <button
              onClick={() => setIsMess((prev) => !prev)}
              className="w-full object-contain border border-gray-200 px-2 py-2 rounded-lg cursor-pointer flex gap-2 items-center"
            >
              <img src={EnglishFlag} alt="" className="w-5" />
              <p>English</p>
            </button>
          ) : (
            <button
              onClick={() => setIsMess((prev) => !prev)}
              className="w-full object-contain border border-gray-200 px-2 py-2 rounded-lg cursor-pointer flex gap-2 items-center"
            >
              <img src={SpainFlag} alt="" className="w-5" />
              <p>Español</p>
            </button>
          )}
          <HeaderLanguage isMess={isMess} />
        </div>
        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setIsNotify((prev) => !prev)}
            className="relative border border-gray-200 px-2 py-1 rounded-lg cursor-pointer"
          >
            <i className="fa-regular fa-bell"></i>
            <p className="bg-red-500 w-2 h-2 rounded-full absolute top-[-2px] right-[-2px]"></p>
          </button>
          <HeaderNotification userId={id} isNotify={isNotify} />
        </div>

        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setIsProfile((prev) => !prev)}
            className="flex gap-2 items-center border border-gray-200 px-2 py-1 rounded-lg cursor-pointer"
          >
            {logo ? (
              <img
                src={profile ? profile : logo}
                alt=""
                className="w-6 rounded-full h-6 object-cover"
              />
            ) : (
              <p className="w-6 rounded-full h-6 bg-gray-300 text-md uppercase text-normal flex justify-center items-center">
                T
              </p>
            )}
            <p className="text-medium text-sm capitalize block md:hidden">
              {username?.slice(0, 8)}
            </p>
            <p className="text-medium text-sm capitalize hidden md:block">
              {username}
            </p>
          </div>

          <HeaderProfile
            isProfile={isProfile}
            handleLogout={handleLogout}
            setIsProfile={setIsProfile}
          />
        </div>
      </div>
      <Toaster />
    </header>
  );
}

export default Header;
