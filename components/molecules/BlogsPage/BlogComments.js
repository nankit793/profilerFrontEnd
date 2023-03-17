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
import { FamilyRestroomRounded } from "@mui/icons-material";
function BlogComments(props) {
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({});
  const [editComment, setEditComment] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
      `http://localhost:5000/commentService/getComments?blogId=${props.blogId}`,
      setLoading
    );
  }, [props.blogId]);
  useEffect(() => {
    setLoading(false);
    if (data && data.comments) {
      setComments(data.comments);
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
          `http://localhost:5000/editComment?blogId=${props.blogId}&cid=${editComment._id}`,
          { comment: editComment.text },
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
        .catch(function (error) {
          console.log(error.message);
          // setImage(null);
        });
    }
  };
  const deleteComment = (comment) => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios
      .delete(
        `http://localhost:5000/editComment?blogId=${props.blogId}&cid=${comment._id}`,
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
        } else if (
          response &&
          response.data &&
          !response.data.state &&
          response.data.message
        ) {
          errorNotification(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const pinComment = (comment) => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios
      .put(
        `http://localhost:5000/commentService/pinComment?blogId=${props.blogId}&cid=${comment._id}`,
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
        } else if (
          response &&
          response.data &&
          !response.data.state &&
          response.data.message
        ) {
          errorNotification(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const unpinComment = (comment) => {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    axios
      .put(
        `http://localhost:5000/commentService/unpinComment?blogId=${props.blogId}&cid=${comment._id}`,
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
        } else if (
          response &&
          response.data &&
          !response.data.state &&
          response.data.message
        ) {
          errorNotification(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <div className="border rounded-t-md h-min mb-2 mt-2 bg-color_2 md:w-[75%] w-full mr-auto">
      {/* <div className="flex justify-between items-center border-b  p-2 bg-color_9  rounded-t-md"> */}
      {/* <div className="text-text_1 font-semibold text-[19px] text-color_7">
          Comments
        </div> */}
      {/* </div> */}
      <div
        className="text-color_4 my-2 cursor-pointer w-fit px-3"
        onClick={() => {
          props.setShowComments(false);
        }}
      >
        close comments
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
                    className="flex justify-start items-start gap-5 my-1 rounded md:mx-1 cursor-pointer border-color_2 border hover:border-color_9 duration-200 p-3 hover:bg-color_3"
                  >
                    <div className="flex items-center">
                      <Image
                        unoptimized
                        // fill
                        src={`http://localhost:5000/profilePhoto?userid=${comment.user.userid}`}
                        alt="pic"
                        // objectFit="revert"
                        width={50}
                        className="rounded-full bg-color_3"
                        height={50}
                      />
                    </div>
                    <div className="w-[90%] ">
                      <div className="text-text_1">
                        {comment && comment.user && comment.user.name}{" "}
                        {comment && comment.edited && (
                          <span className="text-sm text-text_2">(edited)</span>
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
                          <div className="flex justify-end gap-2">
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
                              className="mt-1 rounded px-3 py-1 bg-color_7 hover:bg-color_5 duration-200 text-[white] w-fit"
                            >
                              Update comment
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-text_2 text-sm">
                          {comment.text}
                        </div>
                      )}
                    </div>
                    {loggedIn && (
                      <div className="flex justify-center gap-2 text-sm text-color_4">
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

export default BlogComments;
