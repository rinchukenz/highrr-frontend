import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClassSchedule from "./ClassSchedule";

// Sample class data
const classData = {
  "2025-08-04": 4,
  "2025-08-05": 1,
  "2025-08-06": 2,
};

const classDetails = {
  "2025-08-04": [
    {
      title: "SpringBoot",
      type: "Live class",
      time: "11:00 am",
    },
    {
      title: "Core Java Lec : 1",
      type: "Recorded class",
      time: "1:00 pm",
    },
    {
      title: "SpringBoot",
      type: "Live class",
      time: "3:00 pm",
    },
    {
      title: "Core Java Lec : 1",
      type: "Recorded class",
      time: "5:30 pm",
    },
  ],
  "2025-08-05": [
    {
      title: "React js",
      type: "Live class",
      time: "5:00 pm",
    },
  ],
  "2025-08-06": [
    {
      title: "MySQL",
      type: "Live class",
      time: "1:00 pm",
    },
    {
      title: "Core Java Lec : 2",
      type: "Recorded class",
      time: "5:00 pm",
    },
  ],
};

function CalendarCarousel() {
  const today = dayjs();
  const scrollRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.month());
  const [currentYear, setCurrentYear] = useState(today.year());

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const todayElement = scrollContainer?.querySelector(".today-date");

    if (scrollContainer && todayElement) {
      const offsetLeft = todayElement.offsetLeft;
      const containerWidth = scrollContainer.offsetWidth;
      const elementWidth = todayElement.offsetWidth;
      scrollContainer.scrollLeft =
        offsetLeft - containerWidth / 2 + elementWidth / 2;
    }
  }, []);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const current = dayjs()
    .year(currentYear)
    .month(currentMonth)
    .startOf("month");
  const daysInMonth = current.daysInMonth();
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    current.add(i, "day")
  );

  const isToday = (date) => date.isSame(today, "day");
  const isSelected = (date) => date.isSame(selectedDate, "day");

  return (
    <div className="">
      <div
        className="w-full mx-auto my-4 px-4 py-2 relative border-[#D9D9D9] border rounded-lg bg-white flex flex-col"
        style={{ height: "400px" }} 
      >
        {/* Header */}
        <div className="flex justify-start gap-2 items-center mb-3 flex-shrink-0">
          <button
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-semibold text-gray-500">
            {dayjs().year(currentYear).month(currentMonth).format("MMMM, YYYY")}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Calendar Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 flex-shrink-0"
        >
          {days.map((date) => {
            const key = date.format("YYYY-MM-DD");
            const classCount = classData[key] || 0;
            const selected = isSelected(date);
            const todayMatch = isToday(date);

            return (
              <div
                key={key}
                onClick={() => setSelectedDate(date)}
                className={`w-24 flex-shrink-0 rounded-xl px-1.5 py-0.5 text-center border cursor-pointer transition-all duration-200 ${
                  selected
                    ? "bg-[#9D5CFF] text-white"
                    : "bg-white text-black border-gray-300"
                } ${todayMatch ? "today-date" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xxs font-semibold">{date.format("dddd")}</p>
                  {todayMatch && (
                    <div className="flex items-center gap-1">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-300 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-3xl font-semibold my-2.5">{date.date()}</p>
                <p className="text-xxs flex justify-end">{classCount} classes</p>
              </div>
            );
          })}
        </div>

        {/* Class Details */}
        <div className="overflow-y-auto mt-2" style={{ flex: 1 }}>
          <ClassSchedule selectedDate={selectedDate} classData={classDetails} />
        </div>
      </div>
    </div>
  );
}

export default CalendarCarousel;
