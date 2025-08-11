import React from "react";
import aiImage from "../../assets/Group.svg";

function AiSuggestions() {
  return (
    <div className="flex items-center gap-3 h-[304px] my-4 border px-4 border-[#B8B8B8] rounded-lg py-10">
      <div>
        <img src={aiImage} alt="" />
      </div>
      <div className="flex flex-col justify-between h-full py-6">
        <div className="font inter">
          <h3 className="font-bold">You’re behind on your course schedule.</h3>
          <p className="mt-0.5">Improve consistency by setting aside daily study time.</p>
        </div>
        <button className="bg-[#9D5CFF] w-1/3 py-4 px-5 text-xs text-white rounded-lg">Show Tips</button>
      </div>
    </div>
  );
}

export default AiSuggestions;
