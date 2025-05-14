import { Link, useParams } from "react-router";
import ProjectionTable from "./tables/Projection.table";
import { useGetOneBusinessQuery } from "../../redux/features/business/businessApi";
import ProjectonLheetLoader from "../loader/Projecton.sheet.loader";
import React, { useRef, useState } from "react";
import Footer from "../Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useTranslation } from "react-i18next";

function ProjectionSheet() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id ? params?.id : "";
  const { data, isLoading } = useGetOneBusinessQuery(id);
  const refTable = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState(false);
  const { name, sector, description } = data?.business || {};

  const handleDownloadPDF = async () => {
    setLoader(true);
    const ref = refTable.current;
    if (!ref) return;

    const doc = new jsPDF();
    const options = { scale: 2 };

    try {
      const canvas = await html2canvas(ref, options);
      const imgData = canvas.toDataURL("image/png");
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save(`${name}-projection.pdf`);
      setLoader(false);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  let content;
  if (isLoading) {
    content = <ProjectonLheetLoader />;
  }
  if (!isLoading) {
    content = <ProjectionTable business={data?.business} />;
  }
  return (
    <React.Fragment>
      <div className="p-3 md:p-5">
        <div className="w-full">
          <h2 className="text-normal text-2xl md:text-3xl">
            {t("business_calculation")}
          </h2>
          <ul className="flex gap-2 items-center py-2">
            <li>
              <a href="" className="text-normal text-sm md:text-base">
                {t("dashboard")}
              </a>
            </li>
            <li>
              <i className="fa-solid fa-angles-right text-xs"></i>
            </li>
            <li>
              <a href="" className="text-normal text-sm md:text-base">
                {t("calculation_projection")}
              </a>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 bg-amber-100 p-3 rounded-md my-3 items-center">
          <i className="fa-solid fa-triangle-exclamation text-red-500 text-3xl"></i>{" "}
          <p className="text-black text-normal text-sm md:text-base">
            {t("please_note")}
          </p>
        </div>
        <div>
          <div ref={refTable}>
            <div>
              <div className="bg-[#ffffff] border border-gray-300 p-5 rounded-lg mb-0 md:mb-5">
                <h2 className="jost font-medium text-xl md:text-3xl text-black">
                  {t("projection_calculation")}
                </h2>
                <span className="flex items-center mt-3 gap-1">
                  <p className="text-base md:text-lg text-bold">
                    {t("business_name")} -
                  </p>
                  <p className="text-base md:text-lg text-normal">{name}</p>
                </span>
                <span className="flex items-center gap-1">
                  <p className="text-base md:text-lg text-bold">
                    {t("sector_industry")} -
                  </p>
                  <p className="text-base md:text-lg text-normal">{sector}</p>
                </span>
                <span className="flex items-center gap-1">
                  <p className="text-base md:text-lg text-bold">
                    {t("description")} -
                  </p>
                  <p className="text-base md:text-lg text-normal">
                    {description}
                  </p>
                </span>
              </div>
            </div>
            <div>{content}</div>
          </div>

          <div className="flex gap-2 md:flex-row flex-col item-center my-5">
            <Link
              to={`/create-business/cashflow/${id}`}
              className="button text-center"
            >
              {t("return_to_cashflow")}
            </Link>

            <button
              className="button max-w-fit hidden 2xl:flex gap-2 items-center"
              onClick={handleDownloadPDF}
            >
              {loader ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <p>{t("loading")}...</p>
                </>
              ) : (
                t("download_sheet")
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ProjectionSheet;
