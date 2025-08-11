import React from "react";

function LeaderBoardSmall() {
  const performers = [
    {
      rank: 1,
      name: "Priya Singh",
      xp: 870,
      courses: 6,
      badge: "Gold Badge",
      color: "bg-yellow-400 text-white"
    },
    {
      rank: 2,
      name: "Rahul Patel",
      xp: 750,
      courses: 5,
      badge: "Silver Badge",
      color: "bg-gray-400 text-white"
    },
    {
      rank: 3,
      name: "Ananya R",
      xp: 690,
      courses: 4,
      badge: "Bronze Badge",
      color: "bg-orange-400 text-white"
    }
  ];

  return (
    <div className="border px-6 border-[#B8B8B8] rounded-lg my-4 py-6 h-[304px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          Top Performers This Week <span>🏆</span>
        </h2>
        <button className="text-purple-500 text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Performer List */}
      <div className="space-y-4">
        {performers.map((p, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-[#B8B8B8] last:border-none pb-3 last:pb-0"
          >
            {/* Left section */}
            <div className="flex items-center gap-3">
              {/* Rank Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${p.color}`}
              >
                {p.rank}
              </div>

              {/* Name + XP */}
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">
                  {p.xp} XP - {p.courses} Courses
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="text-sm text-gray-700">{p.badge}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoardSmall;
