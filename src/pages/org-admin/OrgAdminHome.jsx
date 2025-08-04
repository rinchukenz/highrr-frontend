import React, { useState } from "react";
import OrgAdminSidebar from "./OrgAdminSidebar";
import { Outlet } from "react-router-dom";
import OrgAdminNavbar from "./OrgAdminNavbar";

function OrgAdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div>
          {/* Mobile/Tablet Sidebar (Slide-in) */}
          <div
            className={`fixed top-0 left-0 z-20 h-full w-2/3 sm:w-1/2 bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <OrgAdminSidebar />
          </div>

          {/* Desktop Sidebar (Static only on lg and above) */}
          <div className="w-1/6 h-screen fixed hidden lg:block">
            <OrgAdminSidebar />
          </div>

          {/* Overlay (Click outside to close) */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-40 z-10 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </div>

        {/* Main Content */}
        <div className="ml-0 lg:ml-[16.666667%] w-full lg:w-5/6 flex flex-col h-screen">
          <div className="fixed top-0 left-0 lg:left-[16.666667%] w-full lg:w-5/6 z-10">
            <OrgAdminNavbar toggleSidebar={toggleSidebar} />
          </div>
          <div className="mt-[64px] overflow-y-auto h-full pb-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgAdminHome;
