import React from "react";
import CalendarCarousel from "../../components/student-components/CalendarCarousel";
import profileImage from "../../assets/propicture.jpeg";
import { useAuth } from "../../context/AuthContext";
import ProgressTracking from "../../components/student-components/ProgressTracking";
import fire from "../../assets/fire.png";
import vector from "../../assets/Vector.png";
import PlacementOppertunities from "../../components/student-components/PlacementOppertunities";
import AiSuggestions from "../../components/student-components/AiSuggestions";
import LeaderBoardSmall from "../../components/student-components/LeaderBoardSmall";
import ResumeBuilder from "../../components/student-components/ResumeBuilder";

function StudentDashboard() {
  const { studentAuth } = useAuth();
  console.log(studentAuth);
  //const {user, token} = auth;
  //const decoded = jwtDecode(token);
  //console.log("Decode : ",decoded);

  return (
    <div className="min-h-screen w-full py-5 px-4 md:px-15 lg:px-4">
      {/* Welcome Message */}
      <div
        className="w-full flex font-inter justify-between gap-6 items-center px-6 py-6 md:py-10 md:px-15 rounded-2xl bg-[#9D5CFF]"
        style={{
          backgroundImage: `url(${vector})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="font-inter font-bold text-white text-xl md:text-3xl">
          Welcome back, {studentAuth?.name?.split(" ")[0]}
        </h1>
        <div className="flex py-1 px-2 lg:p-3 font-inter rounded-lg items-center text-xxs md:text-sm bg-white">
          <img className="w-3 h-4 md:w-5 md:h-6" src={fire} alt="fire" />
          <span className="ml-1 md:ml-2">Streak: </span>
          <p className="ml-1 md:ml-2">4 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calender */}
        <div className="flex flex-col">
          <h2 className="font-semibold font-inter text-2xl mt-10">
            Upcoming Classes & Events
          </h2>
          <CalendarCarousel />
        </div>

        {/* Progress Tracking */}
        <div className="flex flex-col">
          <h2 className="font-semibold font-inter text-2xl mt-2 lg:mt-10">
            Progress Tracking
          </h2>
          <ProgressTracking />
        </div>
      </div>

      <div className="w-full">
        <h2 className="font-semibold font-inter text-2xl mt-2 lg:mt-10">
            Placement Opportunities
          </h2>
        <PlacementOppertunities />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <h2 className="font-semibold font-inter text-2xl mt-2 lg:mt-10">
            AI Suggestions
          </h2>
          <AiSuggestions />
        </div>
        <div className="lg:col-span-5">
          <h2 className="font-semibold font-inter text-2xl mt-2 lg:mt-10">
            Placement Opportunities
          </h2>
          <LeaderBoardSmall />
        </div>
      </div>

      <div className="w-full">
        <h2 className="font-semibold font-inter text-2xl mt-2 lg:mt-10">
            Resume Builder
          </h2>
        <ResumeBuilder />
      </div>

    </div>
  );
}

export default StudentDashboard;
