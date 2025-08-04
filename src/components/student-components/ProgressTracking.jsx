import React from "react";
import ProgressCard from "./ProgressCard";
import CircularProgressBar from "./CircularProgressBar";
import timeCircle from "../../assets/time-circle.png";
import checkCircle from "../../assets/check-circle.png";

function ProgressTracking() {
  return (
    <div className="">
      <div
        className="w-full mx-auto my-4 px-3 py-2 relative border-[#D9D9D9] border rounded-lg bg-white flex flex-col"
        style={{ height: "400px" }} // Fixed Height
      >
        {/* Header Section */}
        <div className="flex flex-col gap-6 flex-shrink-0">
          <div className="flex p-4 gap-10">
            <CircularProgressBar percentage={65} />
            <div className="flex flex-col gap-2 text-xs md:text-sm">
              <div className="flex items-center gap-1.5">
                <img
                  className="w-5 h-5 bg-[#9D5CFF] rounded-full"
                  src={checkCircle}
                  alt=""
                />
                <span>Course Completed: 2/5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <img
                  className="w-5 h-5 bg-[#9D5CFF] rounded-full"
                  src={timeCircle}
                  alt=""
                />
                <span>Total Hours: 14h 25m</span>
              </div>
              <button className="border border-[#B8B8B8] rounded-2xl text-xxs md:text-xs py-1 cursor-pointer mt-10">
                Go to My Learning
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Recent Courses */}
        <div className="overflow-y-auto mt-7 px-5 flex-1">
          <h3 className="mb-2 md:mb-3 text-sm font-semibold text-gray-700">
            Recent Courses:
          </h3>
          <ProgressCard progress={50} course={"React Native Basics"} />
          <ProgressCard progress={80} course={"Python Introduction"} />
          <ProgressCard progress={65} course={"Springboot microservices"} />
          {/* You can add more ProgressCard components here */}
        </div>

        {/* Footer Button */}
        {/* <div className="flex-shrink-0 mt-2">
          <div className="flex justify-end">
            <button className="border border-gray-400 rounded-2xl text-xs md:text-sm px-8 py-1 cursor-pointer">
              Go to My Learning
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ProgressTracking;
