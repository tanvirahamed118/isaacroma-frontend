import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import MobileHeader from "../components/header/Mobile.header";

function AppRoute() {
  const [sidebar, setSidebard] = useState(false);
  const [navbar, setNavbar] = useState(false);

  return (
    <main className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar sidebar={sidebar} />
      <div className="w-full">
        <Header
          sidebar={sidebar}
          setSidebard={setSidebard}
          setNavbar={setNavbar}
        />
        <main>
          <Outlet />
        </main>
        <MobileHeader setNavbar={setNavbar} navbar={navbar} />
      </div>
    </main>
  );
}

export default AppRoute;
