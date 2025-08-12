import React from "react";
import { Link, useLocation } from "react-router-dom";
import SideOption from "../../components/common-components/SideOption";
import {
  LayoutDashboard,
  Building,
  Users,
  BookOpen,
  Settings,
} from "lucide-react";

function SuperAdminSidebar() {
  const location = useLocation();

  const getActiveOption = () => {
    if (location.pathname.includes("admin-requests")) return "Admin Requests";
    if (location.pathname === "/superadmin") return "Dashboard";
    if (location.pathname.includes("admin-management"))
      return "Admin Management";
    if (location.pathname.includes("org-admins")) return "Org Admins";
    if (location.pathname.includes("organizations")) return "Organizations";
    if (location.pathname.includes("live-class")) return "Live Class";
    if (location.pathname.includes("grades")) return "Grades";
    if (location.pathname.includes("schedule")) return "Schedule";
    if (location.pathname.includes("settings")) return "Settings";
    return "";
  };

  const activeOption = getActiveOption();

  return (
    <div className="h-full w-full font-inter flex flex-col items-center py-6 gap-8 bg-[#F9F9F9] border-r border-[#B8B8B8] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-center gap-3">
        <div>
          <h3 className="font-bold text-lg">Super Admin</h3>
          <p className="text-xs text-gray-800">LMS Control Panel</p>
        </div>
      </div>

      {/* Options */}
      <div className="w-full px-2">
        <Link to="/superadmin">
          <SideOption
            text="Dashboard"
            Icon={LayoutDashboard}
            isActive={activeOption === "Dashboard"}
            color="black"
          />
        </Link>

        <Link to="/superadmin/organizations">
          <SideOption
            text="Organizations"
            Icon={Building}
            isActive={activeOption === "Organizations"}
            color="black"
          />
        </Link>

        <Link to="/superadmin/org-admins">
          <SideOption
            text="Org Admins"
            Icon={Users}
            isActive={activeOption === "Org Admins"}
            color="black"
          />
        </Link>

        <Link to="/superadmin/courses">
          <SideOption
            text="Courses"
            Icon={BookOpen}
            isActive={activeOption === "Courses"}
            color="black"
          />
        </Link>

        <Link to="/superadmin/settings">
          <SideOption
            text="Settings"
            Icon={Settings}
            isActive={activeOption === "Settings"}
            color="black"
          />
        </Link>
      </div>

      {/* Logout */}
      {/* <div className="mt-auto pt-6">
        <LogOutButton />
      </div> */}
    </div>
  );
}

export default SuperAdminSidebar;
