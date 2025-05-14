import { useTranslation } from "react-i18next";
import EnglishFlag from "../../assets/english-flag.svg";
import SpainFlag from "../../assets/spain-flag.svg";

interface Types {
  isMess: boolean;
}

function HeaderLanguage({ isMess }: Types) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const handleLanguageChange = (lng: string) => {
    console.log(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`absolute bg-white p-5 rounded-md shadow-sm border border-gray-100 md:w-52 w-[300px] top-10 right-[-160px] md:right-0 transition-all duration-200 ease-in-out transform ${
        isMess
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 -translate-y-4 pointer-events-none"
      }`}
    >
      <h2 className="text-[#2B7F75] text-md font-medium">
        {t("select_language")}
      </h2>
      <ul className="flex flex-col mt-2 gap-1">
        <li
          className={`flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md ${
            currentLang === "es" ? "bg-gray-100" : "bg-white"
          }`}
          onClick={() => handleLanguageChange("es")}
        >
          <img src={SpainFlag} alt="Spanish" className="w-4" />
          <p>Español</p>
        </li>
        <li
          className={`flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md ${
            currentLang === "en" ? "bg-gray-100" : "bg-white"
          }`}
          onClick={() => handleLanguageChange("en")}
        >
          <img src={EnglishFlag} alt="English" className="w-4" />
          <p>English</p>
        </li>
      </ul>
    </div>
  );
}

export default HeaderLanguage;
