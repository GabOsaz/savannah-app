import { Outlet } from "react-router";
import "../index.css";

function Layout() {
  return (
      <div className="min-h-screen bg-white">
        <main className="flex justify-center mt-10 lg:mt-[130px] py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      
  );
}

export default Layout;
