import React from "react";
import resume from "../../assets/resume-builder-img.svg";
import vector from "../../assets/Vector.png";

function ResumeBuilder() {
  return (
    <div
      className="w-full flex my-4 px-6 py-4 bg-[#9D5CFF] rounded-lg border border-[#B8B8B8]"
      style={{
        backgroundImage: `url(${vector})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-1/2 flex flex-col justify-center text-white items-start space-y-4 w-1/2">
        <h1 className="font-bold text-lg font-inter">New</h1>
        <p className="text-lg font-inter">
          Create a professional resume in minutes using our guided resume
          builder. Customize your information, download in PDF format, and be
          ready for your next opportunity.
        </p>
        <button className="bg-white px-12 py-3 text-black font-semibold rounded-3xl text-xs">
          Create a resume
        </button>
      </div>
      <div className="flex-1/2 flex justify-end items-center">
        <img className="lg:h-[200px] my-auto" src={resume} alt="" />
      </div>
    </div>
  );
}

export default ResumeBuilder;
