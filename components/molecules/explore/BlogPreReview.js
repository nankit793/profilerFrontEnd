import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { dateConverter, dateUnit } from "../../functions/dateConverter";
import axios from "axios";
import Image from "next/image";
import { axiosPost } from "../../functions/axiosCall";
import {
  errorNotification,
  successNotification,
} from "../../atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";
import CircularProgresser from "../../atoms/CircularProgresser";
// mui
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
function BlogPreReview() {
  const [reviewId, setReviewId] = useState("");
  const [blogData, setBlogData] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [views, setViews] = useState(0);
  const [blogDate, setBlogDate] = useState(null);
  const [fetchingFailed, setFetchingFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const sessionStorage = useSelector((state) => state.sessionStorageReducer);
  const bookmarks = useSelector((state) => state.bookmarksReducer);

  const router = useRouter();

  useEffect(() => {
    if (sessionStorage && sessionStorage.isSession && sessionStorage.session) {
      setReviewId(sessionStorage.session);
    }
  }, [sessionStorage]);

  useEffect(() => {
    if (reviewId) {
      setLoading(true);
      axios
        .get(`${process.env.BACKEND_URL}/blogPost/noview/${reviewId}`, {
          headers: { userid: localStorage.getItem("userid") },
        })
        .then(function (response) {
          if (response.status === 200) {
            setBlogData(response && response.data && response.data.blog);
            setIsLiked(response && response.data && response.data.liked);
            setNumLikes(
              (response &&
                response.data &&
                response.data.blog.activities.numLikes) ||
                0
            );
            setViews(
              (response &&
                response.data &&
                response.data.blog.activities.views) ||
                0
            );
            setNumComments(
              (response &&
                response.data &&
                response.data.blog.activities.numComments) ||
                0
            );
            setBlogDate(
              response &&
                response.data &&
                response.data.blog &&
                response.data.blog.activities &&
                response.data.blog.activities.blogUpload &&
                response.data.blog.activities.blogUpload
                  .split("T")[0]
                  .split("-")
            );
            setLoading(false);
          } else {
            setFetchingFailed(true);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setFetchingFailed(true);
          setLoading(false);
        });
    }
  }, [reviewId]);

  useEffect(() => {
    if (bookmarks && bookmarks.isFetched && bookmarks.bookmarks) {
      bookmarks.bookmarks.forEach((element) => {
        if (element._id === reviewId) {
          setIsBookMarked(true);
        }
      });
    }
  }, [bookmarks, reviewId]);

  const bookmark = async () => {
    const bookmarked = await axiosPost(
      `${process.env.BACKEND_URL}/bookMarks?blogId=${reviewId}`
    );
    if (bookmarked && bookmarked.state) {
      successNotification(
        "you can view Bookmarked blogs on your profile",
        "blog has been bookmarked"
      );
      setIsBookMarked(true);
    } else if (bookmarked && !bookmarked.state) {
      errorNotification(bookmarked.message);
    }
  };
  const removeBookmark = async () => {
    const bookmarked = await axiosPost(
      `${process.env.BACKEND_URL}/removeBookmark?blogId=${reviewId}`
    );
    if (bookmarked && bookmarked.state) {
      successNotification("Bookmark removed from the blog");
      setIsBookMarked(false);
    } else if (bookmarked && !bookmarked.state) {
      errorNotification(bookmarked.message);
    }
  };

  const liked = async () => {
    const liked = await axiosPost(
      `${process.env.BACKEND_URL}/like?blogId=${reviewId}`
    );
    if (liked && liked.state) {
      successNotification("Blog Liked");
      setIsLiked(true);
      setNumLikes(numLikes + 1);
    } else if (liked && !liked.state) {
      errorNotification(liked.message);
    }
  };
  const unliked = async () => {
    const liked = await axiosPost(
      `${process.env.BACKEND_URL}/unlike?blogId=${reviewId}`
    );
    if (liked && liked.state) {
      successNotification("Blog Uniked");
      setIsLiked(false);
      setNumLikes(numLikes - 1);
    } else if (liked && !liked.state) {
      errorNotification(liked.message);
    }
  };
  return (
    <div className="w-full">
      {reviewId ? (
        <>
          {loading ? (
            <div className="w-full h-full text-text_2 flex justify-center items-center">
              <CircularProgresser />
            </div>
          ) : (
            <>
              <div className="px-2 ">
                <div className="w-full my-2 flex-wrap flex justify-between  items-center">
                  <div className="flex gap-10 grow text-center cursor-pointer">
                    <div className="">
                      {isLiked && isLiked ? (
                        <div onClick={unliked} className="text-[red] ">
                          <FavoriteIcon />
                        </div>
                      ) : (
                        <div onClick={liked} className="">
                          <FavoriteBorderIcon />
                        </div>
                      )}
                      <div className="text-sm text-text_2">{numLikes}</div>
                    </div>
                    <div className="text-text_1 text-center">
                      <CommentIcon fontSize="small" />
                      <div className="text-sm text-text_2">{numComments}</div>
                    </div>
                    <div className="text-text_1 text-center">
                      <RemoveRedEyeIcon fontSize="small" />
                      <div className="text-sm text-text_2">{views}</div>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="text-left text-color_4 text-text-[15px] ">
                      {blogDate &&
                        dateConverter(blogDate[1]) +
                          " " +
                          parseInt(blogDate[2]) +
                          dateUnit(blogDate[2]) +
                          " " +
                          blogDate[0]}
                    </div>
                    <div>
                      {!isBookMarked ? (
                        <div
                          onClick={bookmark}
                          className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer text-color_5"
                        >
                          <BookmarkBorderIcon />
                        </div>
                      ) : (
                        <div
                          onClick={removeBookmark}
                          className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer text-color_5"
                        >
                          <BookmarkAddedIcon />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex gap-3  px-2 pb-2">
                <div
                  onClick={() => {
                    reviewId && router.push(`/view/blog/${reviewId}`);
                  }}
                  className="text-color_4 cursor-pointer"
                >
                  read full
                </div>
                <div className="text-color_4 cursor-pointer">report</div>
              </div>
              <div className="overflow-y-scroll md:h-[70vh] h-[80vh]">
                <Image
                  unoptimized
                  // fill
                  src={`${process.env.BACKEND_URL}/blogPost/image/${
                    blogData && blogData.imageURL
                  }`}
                  alt="image"
                  width="100%"
                  height="60%"
                  layout="responsive"
                  objectFit="cover"
                />
                <div className="">
                  {blogData &&
                    blogData.paragraphs &&
                    blogData.paragraphs.slice(0, 1).map((para, index) => {
                      return (
                        <div key={index} className="my-2 mx-2">
                          <div className="font-serif  text-[20px] text-text_1">
                            {para.subHead && para.subHead}
                          </div>
                          <div className="font-serif  text-[18px] text-text_2">
                            {para.paragraph && para.paragraph}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div
                  onClick={() => {
                    reviewId && router.push(`/view/blog/${reviewId}`);
                  }}
                  className="text-center my-3 cursor-pointer text-[blue]"
                >
                  Read full
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full text-text_2 flex justify-center items-center">
          summary of the selected blog will appear here
        </div>
      )}
      <NotificationContainer />
    </div>
  );
}

export default BlogPreReview;
