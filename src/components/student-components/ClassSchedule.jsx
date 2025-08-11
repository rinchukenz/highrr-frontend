import { div } from "framer-motion/client";
import React from "react";

// Single class card
const ClassCard = ({ title, type, time }) => (
  <div className="flex items-center justify-between rounded-sm text-xxs px-5 py-3 overflow-hidden border border-[#B8B8B8] mb-4 shadow-sm">
    {/* <div
      className=""
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xs mt-1">{type}</p>
    </div>
    <div className="w-2/5 flex flex-col justify-between items-center p-3 gap-2">
      <button className="border border-purple-500 cursor-pointer text-purple-600 px-4 py-1 text-sm rounded-full hover:bg-purple-100 transition">
        Click here
      </button>
      <p className="text-xs text-gray-500 text-right">{time}</p>
    </div> */}

    <div className="font-semibold text-xs">{time}</div>
    <div>
      <h3 className="font-semibold text-xs">Live Class: Data Structures</h3>
      <p>Instructor: Prof. Shalini Verma - Zoom</p>
    </div>
    <button className="bg-[#9D5CFF] py-1 px-3 text-white text-xxs cursor-pointer rounded-2xl">
      join now
    </button>
  </div>
);

// Parent component that receives props
const ClassSchedule = ({ selectedDate, classData }) => {
  const formattedDate = selectedDate.format("YYYY-MM-DD");
  const classes = classData[formattedDate] || [];

  console.log("Formatted Date:", formattedDate);
  console.log("Classes:", classes);

  return (
    <div className="mt-6 px-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Classes and Events on {formattedDate}:
      </h2>
      <div className="overflow-y-auto h-[150px]" style={{ flex: 1 }}>
        {classes.length > 0 ? (
          classes.map((classItem, idx) => (
            <ClassCard key={idx} {...classItem} />
          ))
        ) : (
          <div className="flex flex-col justify-center border-[1.5px] border-dashed px-6 border-[#B8B8B8] rounded-lg py-6 h-[150px]">
            <p className="text-gray-600 text-center text-sm">
              No classes scheduled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassSchedule;
