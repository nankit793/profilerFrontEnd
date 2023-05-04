import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Image from "next/image";
import InputField from "../../atoms/input/InputField";
import {
  errorNotification,
  successNotification,
} from "../../atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";
import CircularProgresser from "../../atoms/CircularProgresser";
import { axiosGet } from "../../functions/axiosCall";
import FamilyRestroomRounded from "@mui/icons-material/FamilyRestroomRounded";
import { useRouter } from "next/router";
function PortfolioReviews(props) {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [editComment, setEditComment] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    if (accesstoken && refreshtoken && userid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    axiosGet(
      setData,
      `${process.env.BACKEND_URL}/portfolio/getReviews?pid=${props.pid}`,
      setLoading
    );
  }, [props.pid]);
  useEffect(() => {
    setLoading(false);
    if (data && data.reviews && data.reviews.reviews) {
      setComments(data.reviews.reviews);
    } else {
      setComments([]);
    }
  }, [data]);

  const updateComments = () => {
    if (editComment.text && editComment.text.length < 5) {
      errorNotification("Comment should be more than 4 characters");
    } else {
      const accesstoken = localStorage.getItem("accessToken");
      const refreshtoken = localStorage.getItem("idToken");
      const userid = localStorage.getItem("userid");
      axios
        .put(
          `${process.env.BACKEND_URL}/portfolio/review/edit?pid=${props.pid}&rid=${editComment._id}`,
          { text: editComment.text },
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
            successNotification("Comment updated");
            const updatedItems = comments.map((item) => {
              if (item._id === editComment._id) {
                return { ...item, text: editComment.text, edited: true };
              }
              return item; // return the original item for all other cases
            });
            setComments(updatedItems);
            setEditComment();
          }
        })
        .catch(function (response) {
          if (
            response &&
            response.response &&
            response.response.data &&
            !response.response.data.state &&
            response.response.data.message
          ) {
            errorNotification(response.response.data.message);
          }
        });
    }
  };
  const deleteComment = (comment) => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios
      .delete(
        `${process.env.BACKEND_URL}/portfolio/review/edit?pid=${props.pid}&rid=${comment._id}`,

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
          successNotification("Comment deleted");
          const index = comments.findIndex((item) => item._id === comment._id);
          if (index === -1) return;
          const newArray = [...comments];
          newArray.splice(index, 1);
          setComments(newArray);
          props.setNumComments(props.numComments - 1);
          setEditComment();
        }
      })
      .catch(function (response) {
        if (
          response &&
          response.response &&
          response.response.data &&
          !response.response.data.state &&
          response.response.data.message
        ) {
          errorNotification(response.response.data.message);
        }
      });
  };
  const pinComment = (comment) => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios

      .put(
        `${process.env.BACKEND_URL}/portfolio/review/pin?pid=${props.pid}&rid=${comment._id}`,
        { body: {} },
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
          successNotification("Comment pinned at top");
          const updatedItems = comments.map((item) => {
            if (item._id === comment._id) {
              return { ...item, pinned: true };
            }
            return item; // return the original item for all other cases
          });
          setComments(updatedItems);
        }
      })
      .catch(function (response) {
        if (
          response &&
          response.response &&
          response.response.data &&
          !response.response.data.state &&
          response.response.data.message
        ) {
          errorNotification(response.response.data.message);
        }
      });
  };
  const unpinComment = (comment) => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios
      .put(
        `${process.env.BACKEND_URL}/portfolio/review/unpin?pid=${props.pid}&rid=${comment._id}`,
        { body: {} },
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
          successNotification("unpinned comment");
          const updatedItems = comments.map((item) => {
            if (item._id === comment._id) {
              return { ...item, pinned: false };
            }
            return item; // return the original item for all other cases
          });
          setComments(updatedItems);
        }
      })
      .catch(function (response) {
        if (
          response &&
          response.response &&
          response.response.data &&
          !response.response.data.state &&
          response.response.data.message
        ) {
          errorNotification(response.response.data.message);
        }
      });
  };
  return (
    <div className="border rounded-t-md h-min mb-2 mt-2 bg-color_2 md:w-[75%] md:min-w-[400px] w-full mr-auto">
      <div
        className="text-color_4 my-2 cursor-pointer w-fit px-3"
        onClick={() => {
          props.setShowComments(false);
        }}
      >
        close reviews
        {/* <CloseIcon fontSize="medium" /> */}
      </div>
      <div className="flex justify-center align-center">
        {loading && <CircularProgresser />}
      </div>
      <div className="h-full pb-5 overflow-y-auto max-h-[500px] ">
        {comments &&
          comments.length > 0 &&
          comments.map((comment, index) => {
            return (
              <>
                {comment && (
                  <div
                    key={index}
                    className="md:flex justify-between gap-5 my-1 rounded md:mx-1 cursor-pointer duration-200 p-3 hover:bg-color_6 "
                  >
                    <div className="flex justify-start gap-5 md:w-[80%]">
                      <div
                        onClick={() => {
                          router.push(
                            `/home/${
                              comment.user &&
                              comment.user.userid &&
                              comment.user.userid
                            }`
                          );
                        }}
                        className="flex items-start "
                      >
                        <Image
                          unoptimized
                          // fill
                          src={`${process.env.BACKEND_URL}/profilePhoto/direct?userid=${comment.user.userid}`}
                          alt="pic"
                          // objectFit="revert"
                          width={50}
                          // layout="responsive"
                          objectFit="cover"
                          className="rounded-full bg-color_3"
                          height={50}
                        />
                      </div>
                      <div className="w-full overflow-x-auto grow">
                        <div className="text-text_1">
                          {comment && comment.user && comment.user.name}{" "}
                          {comment && comment.edited && (
                            <span className="text-sm text-text_2">
                              (edited)
                            </span>
                          )}
                        </div>
                        {editComment && editComment._id === comment._id ? (
                          <>
                            <InputField
                              className="border w-full rounded p-1 focus:outline-color_1 focus:outline"
                              value={editComment.text}
                              length={500}
                              type="text"
                              multiline={true}
                              onChange={(e) => {
                                setEditComment((prevState) => ({
                                  ...prevState,
                                  text: e.target.value,
                                }));
                              }}
                              //  name="from"
                              //   onChange={onChange}
                            />
                            <div className="flex text-sm justify-end gap-2 ">
                              <div
                                onClick={() => {
                                  setEditComment();
                                }}
                                className="mt-1 rounded px-3 py-1 border border-color_9   duration-200 text-color_7 w-fit"
                              >
                                Cancel
                              </div>
                              <div
                                onClick={updateComments}
                                className="text-sm mt-1 rounded px-3 py-1 bg-color_7 hover:bg-color_5 duration-200 text-[white] w-fit"
                              >
                                Update comment
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-text_2 break-words text-sm ">
                            {comment.text}
                          </div>
                        )}
                      </div>
                    </div>
                    {loggedIn && (
                      <div className="flex justify-start md:mt-0 mt-3 gap-2 text-sm text-color_4">
                        {localStorage.getItem("userid") ===
                          comment.user.userid && (
                          <div
                            onClick={() => {
                              setEditComment(comment);
                            }}
                            className="hover:underline"
                          >
                            Edit
                          </div>
                        )}
                        {(props.author.userid ===
                          localStorage.getItem("userid") ||
                          localStorage.getItem("userid") ===
                            comment.user.userid) && (
                          <div
                            onClick={() => {
                              deleteComment(comment);
                            }}
                            className="hover:underline"
                          >
                            Delete
                          </div>
                        )}
                        {props.author.userid ===
                          localStorage.getItem("userid") && (
                          <>
                            {comment && comment.pinned ? (
                              <div
                                onClick={() => {
                                  unpinComment(comment);
                                }}
                                className="hover:underline"
                              >
                                Unpin
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  pinComment(comment);
                                }}
                                className="hover:underline"
                              >
                                Pin
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            );
          })}
      </div>
      <NotificationContainer />
    </div>
  );
}

export default PortfolioReviews;
