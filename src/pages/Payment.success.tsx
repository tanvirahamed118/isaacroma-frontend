import { Link } from "react-router";
import Footer from "../components/Footer";
import React from "react";
import { useTranslation } from "react-i18next";

function PaymentSuccess() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="p-5">
        <div className="w-full">
          <h2 className="text-normal text-3xl">{t("membership")}</h2>
          <ul className="flex gap-2 items-center py-2">
            <li>
              <Link to="/" className="text-normal text-base">
                {t("dashboard")}
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-angles-right text-xs"></i>
            </li>
            <li>
              <p className="text-normal text-base">{t("payment_status")}</p>
            </li>
          </ul>
        </div>
        <div className="w-full min-h-[80vh] flex justify-center items-center">
          <div className="flex flex-col gap-3 items-center">
            <i className="fa-solid fa-circle-check text-green-400 text-5xl md:text-[100px]"></i>
            <h2 className="text-medium text-3xl md:text-4xl jost w-full md:w-8/12 text-center leading-relaxed">
              {t("payment_payment_complete")}
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default PaymentSuccess;
