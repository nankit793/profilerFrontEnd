import React, { useState, useEffect } from "react";
import * as trendingBlogs from "../redux-next/GetTrendingBlogs/action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Trending from "../components/molecules/explore/Trending";
import BlogPreReview from "../components/molecules/explore/BlogPreReview";
import SwipeableTemporaryDrawer from "../components/molecules/Drawer";

function Explore() {
  const router = useRouter();
  const dispatch = useDispatch();
  const sessionStorage = useSelector((state) => state.sessionStorageReducer);
  const [reviewId, setReviewId] = useState("");
  useEffect(() => {
    dispatch(trendingBlogs.getTrendingBlogs("t"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeReviewId = (id) => {
    if (id) {
      setReviewId(id);
    }
  };
  const buttons = [
    {
      name: "For You",
      id: 0,
      pageData: (
        <div className="w-full h-full text-text_2 flex justify-center items-center">
          Feature available soon
        </div>
      ),
    },
    {
      name: "Trending",
      id: 1,
      pageData: <Trending changeReviewId={changeReviewId} />,
    },
  ];
  const [selectedPage, setSelectedPage] = useState(buttons[1]);

  return (
    <>
      <div className="md:hidden fixed top-[70px] z-20 right-2 flex gap-2">
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

      <div className="pt-14 h-[100vh] flex justify-between ">
        {/* left wing  */}

        <div className="md:w-[70%]  w-full overflow-y-auto bg-[#fafafa]">
          {selectedPage.pageData}
        </div>
        <div className="md:block hidden grow h-full bg-color_3 overflow-hidden md:min-w-[300px] border-l w-[40%]">
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
          <div className="grow  md:block hidden h-full ">
            <BlogPreReview reviewId={reviewId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
