import SidebarCollaps from "./Sidebar.collaps";
import SidebarNoCollaps from "./Sidebar.no.collaps";

interface Types {
  sidebar: boolean;
}

function Sidebar({ sidebar }: Types) {
  return (
    <aside
      className={
        sidebar
          ? "sticky top-0 xl:block hidden w-[70px] bg-white border-r-2 border-gray-100 max-h-screen h-screen transition-[width] duration-300 ease-in-out"
          : "sticky top-0 xl:block hidden w-[315px] bg-white border-r-2 border-gray-100 max-h-screen h-screen transition-[width] duration-300 ease-in-out"
      }
    >
      {sidebar ? <SidebarCollaps /> : <SidebarNoCollaps />}
    </aside>
  );
}

export default Sidebar;
