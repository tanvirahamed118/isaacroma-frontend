import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full h-16 px-10 flex justify-center items-center bg-[#fff] border-t border-gray-300">
      <p className="text-gray-500 text-xs md:text-sm font-normal text-center">
        ©{new Date().getFullYear()} {t("footer_text")}
      </p>
    </footer>
  );
}

export default Footer;
