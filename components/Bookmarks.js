import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { axiosPost } from "./functions/axiosCall";
import { errorNotification, successNotification } from "./atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";
import * as getBookmarksAction from "../redux-next/getBookmarks/actions";
function Bookmarks() {
  const [bookMarks, setBookMarks] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarksReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmarks && bookmarks.isFetched && bookmarks.bookmarks) {
      setBookMarks(bookmarks.bookmarks);
    } else {
      setBookMarks([]);
    }
  }, [bookmarks]);
  const removeBookmark = async (blog) => {
    const removed = await axiosPost(
      `http://localhost:5000/removeBookmark?blogId=${blog._id}`
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
  return (
    <div className="">
      <div className="my-2 text-text_1 font-semibold text-[20px]">Blogs</div>
      {bookMarks.length !== 0 &&
        bookMarks.map((mark, index) => {
          if (mark) {
            return (
              <div
                key={index}
                className="flex justify-between items-center p-2 border rounded bg-color_2 mb-2 cursor-pointer hover:border-color_9 duration-200"
              >
                <div className="w-[90%]">
                  <div className="font-semibold text-[20px] text-text_1">
                    {mark.heading}
                  </div>
                  <div className=" text-[15px] text-text_2">
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
      <NotificationContainer />
    </div>
  );
}

export default Bookmarks;
