import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import InputField from "../../atoms/input/InputField";
// mui
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  successNotification,
  errorNotification,
} from "../../atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";
import BlogComments from "./BlogComments";

function BlogInteraction(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [comment, setComment] = useState("");
  const [error, SetError] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (props.isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [props.isLiked]);

  useEffect(() => {
    if (props.numLikes) {
      setNumLikes(props.numLikes);
    } else {
      setNumLikes(0);
    }
  }, [props.numLikes]);

  useEffect(() => {
    if (props.numComments) {
      setNumComments(props.numComments);
    } else {
      setNumComments(0);
    }
  }, [props.numComments]);

  const liked = () => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios
      .post(
        `${process.env.BACKEND_URL}/like?blogId=${props.blogId}`,
        {
          body: {},
        },
        {
          headers: {
            accesstoken: accesstoken,
            refreshtoken: refreshtoken,
            userid: userid,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200 && response.data && response.data.state) {
          setIsLiked(true);
          setNumLikes(numLikes + 1);
        }
      })
      .catch(function (error) {
        // console.log(error.message);
        // setImage(null);
      });
  };
  const unliked = () => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios
      .post(
        `${process.env.BACKEND_URL}/unlike?blogId=${props.blogId}`,
        {
          body: {},
        },
        {
          headers: {
            accesstoken: accesstoken,
            refreshtoken: refreshtoken,
            userid: userid,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200 && response.data && response.data.state) {
          setIsLiked(false);
          setNumLikes(numLikes - 1);
        }
      })
      .catch(function (error) {
        // console.log(error.message);
        // setImage(null);
      });
  };

  const addComment = () => {
    if (comment.length < 5) {
      SetError("Comment should be more than 5 characters");
      errorNotification("Comment should be more than 4 characters");
    } else {
      const accesstoken = localStorage.getItem("accessToken");
      const refreshtoken = localStorage.getItem("idToken");
      const userid = localStorage.getItem("userid");
      axios
        .post(
          `${process.env.BACKEND_URL}/comment?blogId=${props.blogId}`,
          { comment },
          {
            headers: {
              accesstoken: accesstoken,
              refreshtoken: refreshtoken,
              userid: userid,
            },
          }
        )
        .then(function (response) {
          if (response.status === 200 && response.data && response.data.state) {
            props.setNumComments(numComments + 1);
            successNotification("comment is added");
            setComment("");
          }
        })
        .catch(function (error) {
          // console.log(error.message);
          // setImage(null);
        });
    }
  };
  return (
    <>
      <div className="w-full md:min-h-[40vh] bg-color_3 border border-color_9 rounded-t-xl p-3 mb-10 mt-2">
        <div className="flex justify-start items-center gap-10  text-color_7">
          <div className="text-center">
            <div className="cursor-pointer text-text_1">
              {isLiked && isLiked ? (
                <div onClick={unliked} className="text-[red] ">
                  <FavoriteIcon />
                </div>
              ) : (
                <div onClick={liked} className="">
                  <FavoriteBorderIcon />
                </div>
              )}
            </div>
            <div className="text-color_4">{numLikes}</div>
          </div>
          <div className="text-center text-text_1">
            <CommentIcon />
            <div className="text-color_4">{numComments}</div>
          </div>
        </div>

        {showComments ? (
          <BlogComments
            setShowComments={setShowComments}
            numComments={props.numComments}
            blogId={props.blogId}
            setNumComments={props.setNumComments}
            author={props.author}
          />
        ) : (
          <>
            {/* <div className=" text-text_1 mt-2">Comments</div>
            <div className="flex justify-start items-start gap-5 mt-2">
              <div className="w-10 h-10 bg-color_7 rounded-full"></div>
              <div className="w-[90%]">
                <div className="text-text_1 font-semibold text-[17px]">
                  Ankit Negi
                </div>
                <div className="text-text_2 ">
                  w-full bg-color_3 border border-color_9 rounded-xl p-3 mb-10
                  mt-2 w-full bg-color_3 border border-color_9 rounded-xl p-3
                  mb-10 mt-2 w-full bg-color_3 border border-color_9 rounded-xl
                  p-3 mb-10 mt-2 w-full bg-color_3 border border-color_9
                  rounded-xl p-3 mb-10 mt-2
                </div>
              </div>
            </div> */}
            <div className="md:w-[60%] mt-2">
              <InputField
                length={500}
                type="text"
                className="border p-2 outline-none border-color_4 rounded-xl w-full max-w-[600px] bg-color_2 md:w-[80%]"
                value={comment}
                multiline={true}
                placeholder="add comment"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <div
                className="px-5 py-2 bg-color_7 hover:bg-color_5 duration-200 w-fit rounded-full cursor-pointer text-[white] mt-2"
                onClick={addComment}
              >
                Add comment
              </div>
            </div>
            {numComments > 0 && (
              <div
                onClick={() => {
                  setShowComments(true);
                }}
                className="text-color_4 mt-2 cursor-pointer w-fit"
              >
                view
                {numComments === 1
                  ? ` ${numComments} review`
                  : ` all ${numComments} review`}
              </div>
            )}
          </>
        )}
      </div>
      <NotificationContainer />
    </>
  );
}

export default BlogInteraction;
