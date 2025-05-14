import { useTranslation } from "react-i18next";

function LoaderComponent({ text }: { text: string }) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-[#0000004f] z-20 overflow-hidden">
      <div className="flex justify-center items-center w-full min-h-screen p-5">
        <div className="relative w-[100%] md:w-[600px] rounded-md bg-white p-5 md:p-10 zoom-animation">
          <h2 className="text-medium md:text-2xl text-xl jost">
            {text}, {t("please_being_completed")}
          </h2>
          <div className="flex gap-2 bg-amber-100 p-3 rounded-md my-3">
            <i className="fa-solid fa-triangle-exclamation text-red-500 text-3xl"></i>{" "}
            <p className="text-black text-normal text-sm">
              {t("this_may_take")}
            </p>
          </div>
          <div className="flex justify-center items-center mt-2 md:mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoaderComponent;
