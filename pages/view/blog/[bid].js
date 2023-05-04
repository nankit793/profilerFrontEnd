import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  dateConverter,
  dateUnit,
} from "../../../components/functions/dateConverter";
import Avatar from "@mui/material/Avatar";
import BlogInteraction from "../../../components/molecules/BlogsPage/BlogInteraction";
import BlogComments from "../../../components/molecules/BlogsPage/BlogComments";
import { axiosPost } from "../../../components/functions/axiosCall";
import {
  errorNotification,
  successNotification,
} from "../../../components/atoms/AlertMessage";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import * as getFollowingList from "../../../redux-next/followerList/actions";
import BlogsFromUser from "../../../components/molecules/BlogsPage/BlogsFromUser";
import Footer from "../../../components/footer/Footer";
import CircularProgresser from "../../../components/atoms/CircularProgresser";
function Blog() {
  const [blogData, setBlogData] = useState();
  const [image, setImage] = useState(null);
  const [blogImage, setBlogImage] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [blogDate, setBlogDate] = useState(null);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [youtubeVideoCode, setYoutubeVideoCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchingFailed, setFetchingFailed] = useState(false);
  const followingList = useSelector((state) => state.followingListReducer);

  const bookmarks = useSelector((state) => state.bookmarksReducer);
  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    const bid = router.query.bid;
    if (bid) {
      setLoading(true);
      axios
        .get(`${process.env.BACKEND_URL}/blogPost/get/${bid}`, {
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
            setLoading(false);
          } else {
            setLoading(false);
            setFetchingFailed(true);
          }
        })
        .catch(function (error) {
          setLoading(false);
          setFetchingFailed(true);
          // setImage(null);
        });
    }
  }, [router.query.bid]);
  useEffect(() => {
    if (blogData && blogData.author && blogData.author) {
      axios
        .get(
          `${process.env.BACKEND_URL}/profilePhoto?userid=${blogData.author.userid}`
        )
        .then(function (response) {
          if (response.status === 200) {
            setImage(response && response.data && response.data);
          } else {
            setImage(null);
          }
        })
        .catch(function (error) {
          setImage(null);
        });
      axios
        .get(`${process.env.BACKEND_URL}/blogPost/image/${blogData.imageURL}`)
        .then(function (response) {
          if (response.status === 200) {
            setBlogImage(response && response.data && response.data);
          } else {
            setBlogImage(null);
          }
        })
        .catch(function (error) {
          setBlogImage(null);
        });
    }
  }, [blogData]);

  useEffect(() => {
    if (bookmarks && bookmarks.isFetched && bookmarks.bookmarks) {
      bookmarks.bookmarks.forEach((element) => {
        if (element._id === router.query.bid) {
          setIsBookMarked(true);
        }
      });
    }
  }, [bookmarks, router.query.bid]);

  useEffect(() => {
    if (
      followingList.userFollowingList &&
      blogData &&
      blogData.author &&
      followingList.userFollowingList.includes(blogData.author._id)
    ) {
      setAlreadyFollowing(true);
    } else {
      setAlreadyFollowing(false);
    }
  }, [followingList, blogData]);
  const bookmark = async () => {
    const bookmarked = await axiosPost(
      `${process.env.BACKEND_URL}/bookMarks?blogId=${router.query.bid}`
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
      `${process.env.BACKEND_URL}/removeBookmark?blogId=${router.query.bid}`
    );
    if (bookmarked && bookmarked.state) {
      successNotification("Bookmark removed from the blog");
      setIsBookMarked(false);
    } else if (bookmarked && !bookmarked.state) {
      errorNotification(bookmarked.message);
    }
  };
  const follow = async () => {
    const response = await axiosPost(
      `${process.env.BACKEND_URL}/follow?id=${blogData.author._id}`
    );
    if (response && response.state) {
      try {
        const newArr = followingList.userFollowingList;
        newArr.push(blogData.author._id);
        setAlreadyFollowing(true);
        dispatch(getFollowingList.updateFollowingList(newArr));
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const unfollow = async () => {
    const response = await axiosPost(
      `${process.env.BACKEND_URL}/unfollow?id=${blogData.author._id}`
    );
    if (response && response.state) {
      let a = [];
      for (
        let index = 0;
        index < followingList.userFollowingList.length;
        index++
      ) {
        const element = followingList.userFollowingList[index];
        if (element !== blogData.author._id) {
          a.push(element);
        }
      }
      setAlreadyFollowing(false);
      dispatch(getFollowingList.updateFollowingList(a));
    }
  };

  return (
    <>
      <Head>
        <title>
          {blogData && blogData.heading ? blogData.heading + " | " : ""}
          {/* {userBasicData.name ? userBasicData.name + " - " : ""}  */}
          imProfile
        </title>
        <meta
          name="description"
          content="With imProfile, you can easily create a professional portfolio and express your thoughts, ideas, and insights through its built-in blogging feature"
        ></meta>
        <link rel="canonical" href="/" />
      </Head>

      {!fetchingFailed && blogData ? (
        <>
          <div className="flex md:flex-row flex-col-reverse flex-col justify-start items-start ">
            <div className="md:mt-0 mt-3 md:min-w-[250px] md:w-[25%] w-full h-[100vh] border-r md:pt-14 flex flex-col ">
              <div className="">
                <div className="text-text_1 pl-2 pt-2 ">
                  More from{" "}
                  <span className="font-semibold">
                    {(blogData && blogData.author && blogData.author.name) ||
                      "user"}
                  </span>
                </div>
                <div className="">
                  <BlogsFromUser
                    currBlog={blogData._id}
                    author={blogData && blogData.author && blogData.author}
                  />
                </div>
              </div>
              {/* <div className="border overflow-hidden rounded-xl m-2"> */}
              {/* <div className="text-text_1 px-2 bg-color_8 py-1 ">
                  More like this
                </div> */}
              {/* <BlogsFromUser
                  currBlog={blogData._id}
                  author={blogData && blogData.author && blogData.author}
                /> */}
              {/* </div> */}
            </div>
            {loading && (
              <div className="flex items-center mx-auto  h-[90vh]">
                <CircularProgresser />
              </div>
            )}
            {!loading && (
              <div className="px-3 w-full md:w-[75%] overflow-y-scroll md:h-screen pt-14 bg-[#fafafa]">
                <div className=" flex pt-2 py-2  justify-between  mt-2 rounded-xl">
                  <div
                    className="flex justify-start gap-3 cursor-pointer w-[50%]"
                    onClick={() => {
                      router.push(`/home/${blogData.author.userid}`);
                    }}
                  >
                    <div className="w-[65px] h-[65px] overflow-hidden bg-color_8 rounded-full ">
                      {image ? (
                        <Image
                          unoptimized
                          // fill
                          src={`data:image/png;base64,` + image}
                          fill={true}
                          // fill
                          alt="Picture of the author"
                          // objectFit="revert"
                          width="100%"
                          height="100%"
                          layout="responsive"
                          objectFit="cover"
                          object-position="center"
                        />
                      ) : (
                        <>
                          <div className="rounded-full w-[150px] h-[150px] overflow-hidden flex justify-center items-center bg-color_1 text-color_2">
                            <PersonIcon fontSize="large" />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="">
                      <div className=" text-text_1 text-[17px] break-words">
                        {blogData && blogData.author && blogData.author.name}
                      </div>

                      {/* <div className="text-color_4">|</div> */}
                      <div className="text-left text-color_4 text-text-[15px] ">
                        {blogDate &&
                          dateConverter(blogDate[1]) +
                            " " +
                            parseInt(blogDate[2]) +
                            dateUnit(blogDate[2]) +
                            " " +
                            blogDate[0]}
                      </div>
                    </div>
                  </div>
                  <div>
                    {localStorage.getItem("userid") !==
                      blogData.author.userid && (
                      <>
                        {alreadyFollowing ? (
                          <div
                            onClick={unfollow}
                            className="text-[blue] cursor-pointer text-right"
                          >
                            Unfollow
                          </div>
                        ) : (
                          <div
                            onClick={follow}
                            className="text-[blue] cursor-pointer text-right"
                          >
                            Follow
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex gap-2 flex-row  flex-wrap">
                      {blogData && blogData.author && blogData.author.linkdn ? (
                        <div
                          className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-300 cursor-pointer"
                          onClick={() => {
                            window.open(
                              blogData &&
                                blogData.author &&
                                blogData.author.linkdn,
                              "_blank"
                            );
                          }}
                        >
                          <Avatar
                            alt="Linkedin"
                            src="/images/linkedin.png"
                            sx={{ width: 25, height: 25 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {blogData && blogData.author && blogData.author.linkdn ? (
                        <div
                          className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-300 cursor-pointer "
                          onClick={() => {
                            window.open(
                              blogData &&
                                blogData.author &&
                                blogData.author.linkdn,
                              "_blank"
                            );
                          }}
                        >
                          <Avatar
                            alt="Linkedin"
                            src="/images/linkedin.png"
                            sx={{ width: 25, height: 25 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-300 cursor-pointer text-color_5"
                        onClick={() => {
                          const url = location.href;
                          navigator.clipboard.writeText(url);
                          successNotification("Link copied to clipboard");
                        }}
                      >
                        <Avatar
                          alt="copyLink"
                          src="/images/copyLink.png"
                          sx={{ width: 25, height: 25 }}
                        />
                      </div>

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

                <>
                  <div className="text-[30px] font-bold text-text_1 break-words">
                    {blogData && blogData.heading}
                  </div>

                  {blogImage ? (
                    <>
                      <div className=" mt-2 w-full bg-color_3 rounded md:block hidden">
                        <Image
                          unoptimized
                          fill={true}
                          src={`${process.env.BACKEND_URL}/blogPost/image/${blogData.imageURL}`}
                          alt="image"
                          width="100%"
                          height="40%"
                          layout="responsive"
                          objectFit="cover"
                        />
                      </div>
                      <div className=" mt-2 w-full bg-color_3 rounded md:hidden block">
                        <Image
                          unoptimized
                          fill={true}
                          src={`${process.env.BACKEND_URL}/blogPost/image/${blogData.imageURL}`}
                          alt="image"
                          width="100%"
                          height="100%"
                          layout="responsive"
                          objectFit="cover"
                        />
                      </div>
                    </>
                  ) : (
                    <PersonIcon fontSize="large" sx={{ fontSize: "40px" }} />
                  )}
                  <div className=" mt-3 md:w-[85%] w-full mx-auto">
                    {blogData &&
                      blogData.paragraphs &&
                      blogData.paragraphs.map((para, index) => {
                        return (
                          <div key={index} className="my-2">
                            <div className="font-serif  text-[20px] text-text_1 break-words">
                              {para.subHead && para.subHead}
                            </div>
                            <div className="font-serif  text-[18px] text-text_2 break-words">
                              {para.paragraph && para.paragraph}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {blogData &&
                    blogData.redirectURL &&
                    blogData.selectedRedirection === "website" && (
                      <div className="text-text_1 mt-3">
                        This link will take you to external site{" "}
                        <span
                          onClick={() => {
                            window.open(blogData.redirectURL, "_blank");
                          }}
                          className="text-[blue] cursor-pointer"
                        >
                          {" "}
                          (click here){" "}
                        </span>
                      </div>
                    )}
                  {blogData &&
                    blogData.redirectURL &&
                    blogData.selectedRedirection === "youtube" && (
                      <div className="text-text_1 mt-3">
                        view on youtube{" "}
                        <span
                          onClick={() => {
                            window.open(blogData.redirectURL, "_blank");
                          }}
                          className="text-[blue] cursor-pointer"
                        >
                          {" "}
                          (click here){" "}
                        </span>
                        <iframe
                          className="video"
                          title="Youtube player"
                          width="100%"
                          height="500px"
                          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                          src={`https://youtube.com/embed/${
                            youtubeVideoCode && youtubeVideoCode
                          }?autoplay=0`}
                        ></iframe>
                      </div>
                    )}
                  <div className="text-right md:px-20 text-text_2">
                    ~{" "}
                    {(blogData && blogData.author && blogData.author.name) ||
                      "user"}
                  </div>
                  <BlogInteraction
                    isLiked={isLiked}
                    blogId={router.query.bid}
                    numLikes={numLikes}
                    numComments={numComments}
                    author={blogData && blogData.author}
                    setBlogData={setBlogData}
                    setNumComments={setNumComments}
                  />
                </>
              </div>
            )}
          </div>

          <Footer />
        </>
      ) : (
        <>
          {fetchingFailed && (
            <div className="">
              <div className="h-[90vh] w-full flex justify-center items-center">
                Eighter blog does not exist or you have lost Internet connection
              </div>
              <Footer />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Blog;
