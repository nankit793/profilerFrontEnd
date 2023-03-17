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
import { Avatar } from "@mui/material";
import BlogInteraction from "../../../components/molecules/BlogsPage/BlogInteraction";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BlogComments from "../../../components/molecules/BlogsPage/BlogComments";
import { axiosPost } from "../../../components/functions/axiosCall";
import {
  errorNotification,
  successNotification,
} from "../../../components/atoms/AlertMessage";
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
  const [fetchingFailed, setFetchingFailed] = useState(false);
  const followingList = useSelector((state) => state.followingListReducer);

  const bookmarks = useSelector((state) => state.bookmarksReducer);
  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    const bid = router.query.bid;
    console.log("bid changed");
    axios
      .get(`http://localhost:5000/blogPost/get/${bid}`, {
        headers: { userid: localStorage.getItem("userid") },
      })
      .then(function (response) {
        if (response.status === 200) {
          setBlogData(response.data.blog);
          setIsLiked(response.data.liked);
          setNumLikes(response.data.blog.activities.numLikes || 0);
          setNumComments(response.data.blog.activities.numComments || 0);
          setBlogDate(
            response.data.blog &&
              response.data.blog.activities &&
              response.data.blog.activities.blogUpload &&
              response.data.blog.activities.blogUpload.split("T")[0].split("-")
          );
          var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
          var match = response.data.blog.redirectURL.match(regExp);
          setYoutubeVideoCode(
            match && match[7].length == 11 ? match[7] : false
          );
        } else {
          setFetchingFailed(true);
        }
      })
      .catch(function (error) {
        setFetchingFailed(true);
        console.log(error.message);
        // setImage(null);
      });
  }, [router.query.bid]);
  useEffect(() => {
    if (blogData && blogData.author && blogData.author) {
      axios
        .get(
          `http://localhost:5000/profilePhoto?userid=${blogData.author.userid}`
        )
        .then(function (response) {
          if (response.status === 200) {
            setImage(response.data);
          } else {
            setImage(null);
          }
        })
        .catch(function (error) {
          setImage(null);
        });
      axios
        .get(`http://localhost:5000/blogPost/image/${blogData.imageURL}`)
        .then(function (response) {
          if (response.status === 200) {
            setBlogImage(response.data);
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
      `http://localhost:5000/bookMarks?blogId=${router.query.bid}`
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
      `http://localhost:5000/removeBookmark?blogId=${router.query.bid}`
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
      `http://localhost:5000/follow?id=${blogData.author._id}`
    );
    if (response && response.state) {
      try {
        const newArr = followingList.userFollowingList;
        newArr.push(blogData.author._id);
        setAlreadyFollowing(true);
        dispatch(getFollowingList.updateFollowingList(newArr));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unfollow = async () => {
    const response = await axiosPost(
      `http://localhost:5000/unfollow?id=${blogData.author._id}`
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
    // }
    // errorNotification("can't follow now", "try again later");
    // }
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
            <div className="md:mt-0 mt-3 md:w-[25%] w-full h-[100vh] border-r md:pt-14 flex flex-col">
              <div className="mt-2 flex justify-between rounded mx-3 ">
                <div className="bg-color_2 rounded-l border  text-center py-3 text-color_7 w-[50%]">
                  Based on Blog
                </div>
                <div className="py-3 text-center text-color_4 border-t border-r border-b shadow-inner border-b-color_4 border-b-[3px] w-[50%]">
                  {(blogData && blogData.author && blogData.author.name) ||
                    "user"}
                  {"'s "} blogs
                </div>
              </div>
              <BlogsFromUser
                currBlog={blogData._id}
                author={blogData && blogData.author && blogData.author}
              />
            </div>
            <div className="px-3 w-full md:w-[75%] overflow-y-scroll md:h-screen pt-14 bg-[#fafafa]">
              <div className=" flex pt-2 py-2  justify-between  mt-2 rounded-xl">
                <div
                  className="flex justify-start gap-3 cursor-pointer w-[50%]"
                  onClick={() => {
                    router.push(`/home/${blogData.author.userid}`);
                  }}
                >
                  <div className="w-[70px] h-[70px] bg-color_8 rounded-full">
                    <Image
                      unoptimized
                      // fill
                      src={`http://localhost:5000/profilePhoto?userid=${blogData.author.userid}`}
                      alt="Picture of the author"
                      // objectFit="revert"
                      width={150}
                      className="rounded-full"
                      height={150}
                    />
                    {/* {image ? (
                      <Image
                        unoptimized
                        // fill
                        src={image}
                        alt="Picture of the author"
                        // objectFit="revert"
                        width={150}
                        className="rounded-full"
                        height={150}
                      />
                    ) : (
                      <PersonIcon fontSize="large" sx={{ fontSize: "40px" }} />
                    )} */}
                  </div>
                  <div className="">
                    <div className=" text-text_1 text-[17px]">
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
                <div className="text-[30px] font-bold text-text_1">
                  {blogData && blogData.heading}
                </div>

                {blogImage ? (
                  <>
                    <div className=" mt-2 w-full bg-color_3 rounded md:block hidden">
                      <Image
                        unoptimized
                        fill={true}
                        src={`http://localhost:5000/blogPost/image/${blogData.imageURL}`}
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
                        src={`http://localhost:5000/blogPost/image/${blogData.imageURL}`}
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
          </div>
          <Footer />
        </>
      ) : (
        <>
          {fetchingFailed ? (
            <div className="">
              <div className="h-[90vh] w-full flex justify-center items-center">
                Eighter blog does not exist or you have lost Internet connection
              </div>
              <Footer />
            </div>
          ) : (
            <div className="h-[90vh] w-full flex justify-center items-center">
              <CircularProgresser />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Blog;
