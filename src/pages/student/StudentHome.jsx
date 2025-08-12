import React, { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import Navbar from "../../components/common-components/Navbar";
import { Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import ChatbotButton from "../../components/student-components/ChatbotButton";
import ChatbotModal from "../../components/student-components/ChatbotModal";

function StudentHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div>
        {/* Mobile/Tablet Sidebar (Slide-in) */}
        <div
          className={`fixed top-0 left-0 z-20 h-full w-2/3 sm:w-1/2 bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <StudentSidebar />
        </div>

        {/* Desktop Sidebar (Static only on lg and above) */}
        <div className="w-1/6 h-screen fixed hidden lg:block">
          <StudentSidebar />
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
      <div className="ml-0 lg:ml-[16.666667%] w-full lg:w-5/6 flex flex-col h-screen overflow-y-auto">
        <div className="fixed top-0 left-0 lg:left-[16.666667%] w-full lg:w-5/6 z-10">
          {/* <Navbar toggleSidebar={toggleSidebar} /> */}
          <StudentNavbar toggleSidebar={toggleSidebar} />
        </div>
        <div className="mt-[64px] h-full pb-4 2xl:max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Chatbot */}
      <ChatbotButton onClick={toggleChat} />
      <ChatbotModal isOpen={isChatOpen} onClose={toggleChat} />
    </div>
  );
}

export default StudentHome;
