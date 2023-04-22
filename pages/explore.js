import React, { useState, useEffect } from "react";
import * as trendingBlogs from "../redux-next/GetTrendingBlogs/action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Trending from "../components/molecules/explore/Trending";
import BlogPreReview from "../components/molecules/explore/BlogPreReview";
function Explore() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState({
    id: 0,
    pageData: "<Overview />",
  });

  useEffect(() => {
    dispatch(trendingBlogs.getTrendingBlogs("t"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttons = [
    { name: "For You", id: 0, pageData: "<Overview />" },
    {
      name: "Trending",
      id: 1,
      pageData: <Trending />,
    },
  ];

  return (
    <>
      <div className="pt-14 h-[100vh] flex justify-between ">
        {/* left wing  */}
        <div className="md:w-[70%]  w-full overflow-y-auto bg-[#fafafa]">
          {selectedPage.pageData}
        </div>
        <div className="md:block hidden grow h-full bg-color_8 overflow-hidden w-[30%]">
          <div className="flex top-13 right-0 gap-3 px-3 mt-3 pb-2 justify-end border-b">
            {buttons.map((btn, index) => {
              return (
                <>
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedPage({ id: btn.id, pageData: btn.pageData });
                    }}
                    className={`px-3 py-1 cursor-pointer ${
                      selectedPage.id === btn.id
                        ? "px-5 bg-color_7 text-color_2 duration-200"
                        : "border text-text_1 bg-color_2"
                    }  rounded-full `}
                  >
                    {btn.name}
                  </div>
                </>
              );
            })}
          </div>
          <div className="grow  h-full ">
            <BlogPreReview />
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
