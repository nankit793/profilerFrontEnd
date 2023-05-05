import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { axiosDelete, axiosPost } from "./functions/axiosCall";
import { errorNotification, successNotification } from "./atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";
import * as getBookmarksAction from "../redux-next/getBookmarks/actions";
import * as getUserPortfolioBookmarks from "../redux-next/getPortfolioBookmarks/action";
function Bookmarks() {
  const [bookMarks, setBookMarks] = useState([]);
  const [portfolioBookMarksState, setPortfolioBookMarks] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarksReducer);
  const portfolioBookmarks = useSelector(
    (state) => state.portfolioBookmarksReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarks && bookmarks.isFetched && bookmarks.bookmarks) {
      setBookMarks(bookmarks.bookmarks);
    } else {
      setBookMarks([]);
    }
  }, [bookmarks]);

  useEffect(() => {
    if (
      portfolioBookmarks &&
      portfolioBookmarks.isFetched &&
      portfolioBookmarks.bookmarks
    ) {
      setPortfolioBookMarks(portfolioBookmarks.bookmarks);
    } else {
      setBookMarks([]);
    }
  }, [portfolioBookmarks]);

  const removeBookmark = async (blog) => {
    const removed = await axiosPost(
      `${process.env.BACKEND_URL}/removeBookmark?blogId=${blog._id}`
    );
    if (removed && removed.state) {
      successNotification("blog has been removed");
      const a = [];
      bookMarks.forEach((element) => {
        if (element._id !== blog._id) {
          a.push(element);
        }
        setBookMarks(a);
        dispatch(getBookmarksAction.getUserBookmarks_update(a));
      });
    } else {
      errorNotification("Error! try again later");
    }
  };
  const removePortfolioBookmark = async (portfolio) => {
    const removed = await axiosDelete(
      `${process.env.BACKEND_URL}/portfolio/bookmarks?pid=${portfolio._id}`
    );
    if (removed && removed.state) {
      successNotification("blog has been removed");
      const a = [];
      portfolioBookMarksState.forEach((element) => {
        if (element._id !== portfolio._id) {
          a.push(element);
        }
        setPortfolioBookMarks(a);
        dispatch(getUserPortfolioBookmarks.getUserPortfolioBookmarks_update(a));
      });
    } else {
      errorNotification("Error! try again later");
    }
  };
  return (
    <div className="">
      <div className="my-2 text-text_1 font-semibold text-[20px]">Blogs</div>
      <div className="max-h-[45vh] overflow-y-auto border bg-color_2 p-1">
        {bookMarks.length !== 0 &&
          bookMarks.map((mark, index) => {
            if (mark) {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded bg-color_3  mb-2 cursor-pointer border duration-200"
                >
                  <div className="w-[90%]">
                    <div className="font-semibold text-[20px] text-text_1 break-words">
                      {mark.heading}
                    </div>
                    <div className=" text-[15px] text-text_2 break-words">
                      {mark.paragraphs &&
                        mark.paragraphs[0] &&
                        mark.paragraphs[0].paragraph &&
                        mark.paragraphs[0].paragraph.slice(0, 100)}
                      ...
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      removeBookmark(mark);
                    }}
                    className="text-text_1 hover:bg-color_9 p-1  flex justify-center items-center rounded-full duration-200"
                  >
                    <CloseIcon />
                  </div>
                </div>
              );
            }
          })}

        {bookMarks.length === 0 && (
          <div className="font-semibold text-center text-text_1">
            no bookmarks added
          </div>
        )}
      </div>
      <div className="my-2 text-text_1 font-semibold text-[20px] mt-4">
        Portfolios
      </div>
      <div className="max-h-[45vh] overflow-y-auto bg-color_2 p-1">
        {portfolioBookMarksState.length !== 0 &&
          portfolioBookMarksState.map((mark, index) => {
            if (mark) {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-2  rounded bg-color_3 mb-2 cursor-pointer border duration-200"
                >
                  <div className="w-[90%]">
                    <div className="font-semibold text-[20px] text-text_1 break-words">
                      {mark.title}
                    </div>
                    <div className=" text-[15px] text-text_2 mt-1 break-words">
                      {mark.about && mark.about.slice(0, 300)}
                      ...
                    </div>
                    <div>
                      <div className="my-2 text-text_2 flex gap-1 flex-wrap">
                        {mark &&
                          mark.skills &&
                          mark.skills.map((item, index) => {
                            return (
                              <>
                                {item && (
                                  <div
                                    key={index}
                                    className="border rounded-full bg-color_2 text-text_1 px-2  text-color_4"
                                  >
                                    {item.skill}
                                  </div>
                                )}
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      removePortfolioBookmark(mark);
                    }}
                    className="text-text_1 hover:bg-color_9 p-1  flex justify-center items-center rounded-full duration-200"
                  >
                    <CloseIcon />
                  </div>
                </div>
              );
            }
          })}

        {portfolioBookMarksState.length === 0 && (
          <div className="font-semibold text-center text-text_1">
            no bookmarked portfolio
          </div>
        )}
      </div>
      <NotificationContainer />
    </div>
  );
}

export default Bookmarks;
