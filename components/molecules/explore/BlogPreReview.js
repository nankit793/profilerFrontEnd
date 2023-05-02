import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { dateConverter, dateUnit } from "../../functions/dateConverter";
import axios from "axios";
import Image from "next/image";

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

  const sessionStorage = useSelector((state) => state.sessionStorageReducer);

  useEffect(() => {
    if (sessionStorage && sessionStorage.isSession && sessionStorage.session) {
      setReviewId(sessionStorage.session);
    }
  }, [sessionStorage]);

  useEffect(() => {
    if (reviewId) {
      axios
        .get(`${process.env.BACKEND_URL}/blogPost/noview/${reviewId}`, {
          headers: { userid: localStorage.getItem("userid") },
        })
        .then(function (response) {
          console.log(response);
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
            var regExp =
              /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match =
              response &&
              response.data &&
              response.data.blog.redirectURL.match(regExp);
            setYoutubeVideoCode(
              match && match[7].length == 11 ? match[7] : false
            );
          } else {
            console.log("here");
            setFetchingFailed(true);
          }
        })
        .catch(function (error) {
          setFetchingFailed(true);
          console.log(error.message);
          // setImage(null);
        });
    }
  }, [reviewId]);
  return (
    <div className="w-full">
      {reviewId ? (
        <>
          <div className="px-2 ">
            <div className="w-full my-2  flex justify-between items-start">
              <div className="flex gap-7 text-center">
                <div className="">
                  {isLiked ? (
                    <div className="text-[red]">
                      <FavoriteIcon />
                    </div>
                  ) : (
                    <div className=" text-text_1">
                      <FavoriteBorderIcon fontSize="small" />
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
              <div className="flex gap-2">
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
                  <BookmarkBorderIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 px-2 pb-2">
            <div className="text-color_4 cursor-pointer">read full</div>
            <div className="text-color_4 cursor-pointer">report</div>
          </div>
          <div className="overflow-y-scroll h-[70vh]">
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
                    <div key={index} className="my-2">
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
            <div className="text-center my-3 cursor-pointer text-[blue]">
              Read full
            </div>
          </div>
        </>
      ) : (
        "summary of the selected blog will appear here"
      )}
    </div>
  );
}

export default BlogPreReview;
