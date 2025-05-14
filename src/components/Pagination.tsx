import { useTranslation } from "react-i18next";

interface Type {
  page: number;
  totalItems: number;
  itemsPerPage: number;
  handlePageChange: (newPage: number) => void;
}

function Pagination({
  handlePageChange,
  page,
  totalItems,
  itemsPerPage,
}: Type) {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex gap-3 flex-wrap mt-5">
      <button
        className="text-normal text-base border border-gray-200 bg-white px-3 py-1 rounded-md cursor-pointer"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        {t("back")}
      </button>
      {[...Array(totalPages).keys()].map((index) => (
        <button
          key={index}
          className={`text-normal text-base border  border-gray-200 px-3 py-1 rounded-md  cursor-pointer ${
            page === index + 1
              ? "bg-[#214285] font-bold !text-white"
              : "bg-white"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="text-normal text-base border border-gray-200 bg-white px-3 py-1 rounded-md cursor-pointer"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages || page * itemsPerPage >= totalItems}
      >
        {t("next")}
      </button>
    </div>
  );
}

export default Pagination;
