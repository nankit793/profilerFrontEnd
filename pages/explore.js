import React from "react";

function Explore() {
  return (
    <div className="pt-16 flex justify-start gap-3">
      {/* left wing  */}
      <div className="w-[40%] md:"></div>
      <div className="flex gap-3 mx-3 my-2 justify-end">
        <div className="px-3 py-1 border-color_9 border rounded-full ">
          For You{" "}
        </div>
        <div className="px-3 py-1 border-color_9 border rounded-full ">
          Trending
        </div>
      </div>
    </div>
  );
}

export default Explore;
