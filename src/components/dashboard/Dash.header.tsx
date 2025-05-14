import WaveImg from "../../assets/wave.png";
import BannerImg from "../../assets/banner_img.png";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface Types {
  user: { username: string };
}
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "good_morning";
  if (hour >= 12 && hour < 17) return "good_afternoon";
  if (hour >= 17 && hour < 21) return "good_evening";
  return "good_night";
};
function DashHeader({ user }: Types) {
  const { t } = useTranslation();
  const { username } = user || {};
  return (
    <div className="bg-white flex md:flex-row flex-col xl:gap-0 gap-10 justify-between border border-gray-200 p-5 rounded-md">
      <div className="flex gap-2 flex-col">
        <div>
          <p className="text-[#1F3B73] font-bold text-5xl">
            {t(getGreeting())}
          </p>
          <span className="flex gap-2 items-center mt-1">
            <p className="text-medium text-2xl capitalize">{username}</p>
            <img src={WaveImg} alt="" className="w-8" />
          </span>
        </div>
        <p className="text-normal text-md mt-3 w-full lg:w-9/12">
          {t("welcome_note")}
        </p>
        <Link to="/businesses" className="w-fit button mt-5">
          {t("see_businesses")}
        </Link>
      </div>
      <div className="md:block hidden">
        <img src={BannerImg} alt="" className="w-52" />
      </div>
    </div>
  );
}

export default DashHeader;
