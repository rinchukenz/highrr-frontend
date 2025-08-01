import React from "react";
// import SideOption from "../SideOption/SideOption";
import { Link, useLocation } from "react-router-dom";
import dashboard from "../../assets/dashboard.svg";
import book from "../../assets/book-solid.svg";
import assignment from "../../assets/assignment.svg";
import calendar from "../../assets/calendar.svg";
import exam from "../../assets/exam.svg";
import skyllx from "../../assets/skyllx.png";
import certificate from "../../assets/certificate.svg";
import settings from "../../assets/settings.svg";
import speaker from "../../assets/speaker.svg";
import SideOption from "../common-components/SideOption";

function WebSidebar() {
  const location = useLocation();

  // Map pathnames to active option names
  const getActiveOption = () => {
    if (location.pathname.includes("/home/courses")) return "Courses";
    if (location.pathname === "/home") return "Dashboard";
    if (location.pathname.includes("assignments")) return "Assignments";
    if (location.pathname.includes("exams")) return "Exams";
    if (location.pathname.includes("calendar")) return "Calendar";
    if (location.pathname.includes("announcement")) return "Announcement";
    if (location.pathname.includes("certificates")) return "Certificates";
    if (location.pathname.includes("settings")) return "Settings";
    return "";
  };

  const activeOption = getActiveOption();

  return (
    <div className="h-full w-full flex flex-col items-center py-6 gap-12 bg-gray-100">
      <div className="flex items-center gap-2">
        <img src={skyllx} alt="Skyllx Logo" className="w-14 h-6 mt-1" />
        <h3 className="font-bold text-2xl">LMS</h3>
      </div>
      <div className="options">
        <Link to="/student">
          <SideOption
            text="Dashboard"
            icon={dashboard}
            isActive={activeOption === "Dashboard"}
          />
        </Link>

        <Link to="/student/courses">
          <SideOption
            text="Courses"
            icon={book}
            isActive={activeOption === "Courses"}
          />
        </Link>

        <Link to="/student/assignments">
          <SideOption
            text="Assignments"
            icon={assignment}
            isActive={activeOption === "Assignments"}
          />
        </Link>

        <Link to="/student/exams">
          <SideOption
            text="Exams"
            icon={exam}
            isActive={activeOption === "Exams"}
          />
        </Link>

        <Link to="/student/calendar">
          <SideOption
            text="Calendar"
            icon={calendar}
            isActive={activeOption === "Calendar"}
          />
        </Link>

        <Link to="/student/announcement">
          <SideOption
            text="Announcement"
            icon={speaker}
            isActive={activeOption === "Announcement"}
          />
        </Link>

        <Link to="/student/certificates">
          <SideOption
            text="Certificates"
            icon={certificate}
            isActive={activeOption === "Certificates"}
          />
        </Link>

        <Link to="/student/settings">
          <SideOption
            text="Settings"
            icon={settings}
            isActive={activeOption === "Settings"}
          />
        </Link>
      </div>
    </div>
  );
}

export default WebSidebar;
