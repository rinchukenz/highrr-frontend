import React from "react";
import placementImage from "../../assets/IllustrationFrame.svg";

function PlacementOppertunities() {
  return (
    <div className="w-full flex my-4 px-6 py-3 bg-white rounded-lg border border-[#B8B8B8]">
      <div className="flex-3/5 flex flex-col justify-center items-start space-y-6 w-1/2">
        <h1 className="font-bold font-inter">Click the link below to view full details and apply.</h1>
        <p>Explore the latest job and internship opportunities shared by top companies.</p>
        <button className="bg-[#9D5CFF] px-8 py-3 rounded-3xl text-white text-xs">→ View Placement Opportunities</button>
      </div>
      <div className="flex-2/5 flex justify-center items-center">
        <img className="lg:h-[200px] my-auto" src={placementImage} alt="" />
      </div>
    </div>
  );
}

export default PlacementOppertunities;
