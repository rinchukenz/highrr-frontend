import React, { useEffect, useState } from "react";

function ProgressCard({ progress, course }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const duration = 600; // in milliseconds
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const newProgress = Math.min((elapsed / duration) * progress, progress);
      setAnimatedProgress(Math.floor(newProgress));

      if (newProgress < progress) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress]);

  return (
      <div className="w-full rounded-sm text-xxs px-5 py-1 overflow-hidden border border-[#B8B8B8] mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-1 md:mb-2">
          <h2 className="text-xs font-semibold text-gray-800">
            {course}
          </h2>
          <button className="px-4 md:px-5 text-xxs font-normal cursor-pointer border border-[#B8B8B8] rounded-full hover:bg-gray-100">
            Resume
          </button>
        </div>

        <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#9D5CFF] rounded-full transition-all duration-300"
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>

        <p className="text-xxs font-normal ml-1">
          {animatedProgress}% complete
        </p>
      </div>
  );
}

export default ProgressCard;
