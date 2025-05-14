import DashActivity from "../components/dashboard/Dash.activity";
import DashChart from "../components/dashboard/Dash.chart";
import DashHeader from "../components/dashboard/Dash.header";
import DashMembers from "../components/dashboard/Dash.members";
import DashTabs from "../components/dashboard/Dash.tabs";
import Footer from "../components/Footer";
import { useGetOneUserQuery } from "../redux/features/auth/authApi";
import { useGetAllBusinessDefaultByUserIdQuery } from "../redux/features/business/businessApi";

function Dashboard() {
  const auth = localStorage.getItem("auth");
  const userData = auth ? JSON.parse(auth) : null;
  const id = userData?.user?.id;
  const { data } = useGetOneUserQuery(id);
  const user = data?.user;
  const { data: business, isLoading } =
    useGetAllBusinessDefaultByUserIdQuery(id);

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-5 p-3 md:p-5">
        <div className="w-full lg:w-8/12">
          <DashHeader user={user} />

          <DashTabs business={business} />
          {/* chart */}
          <DashChart business={business} />
        </div>
        <div className="w-full lg:w-4/12">
          <DashActivity business={business} />
          <DashMembers business={business} isLoading={isLoading} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
