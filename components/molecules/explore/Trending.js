import TrendingFlatRounded from "@mui/icons-material/TrendingFlatRounded";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { dateConverter, dateUnit } from "../../functions/dateConverter";
import { useDispatch } from "react-redux";
import { axiosPost } from "../../functions/axiosCall";
import * as getFollowingList from "../../../redux-next/followerList/actions";
import * as sessionStorageAction from "../../../redux-next/sessionStorage/actions";
import axios from "axios";
import SwipeableTemporaryDrawer from "../Drawer";
import BlogPreReview from "./BlogPreReview";

function Trending(props) {
  const trendingBlogs = useSelector((state) => state.trendinBlogsReducer);
  const [followersData, setFollowersData] = useState();
  const [mainBlogs, setMainBlogs] = useState([]);
  const followingList = useSelector((state) => state.followingListReducer);
  const sessionStorage = useSelector((state) => state.sessionStorageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      followingList &&
      followingList.isFecthed &&
      followingList.userFollowingList
    ) {
      setFollowersData(followingList.userFollowingList);
    }
  }, [followingList]);

  useEffect(() => {
    if (
      trendingBlogs &&
      trendingBlogs.isFetched &&
      trendingBlogs.trendings &&
      trendingBlogs.trendings.trendings
    ) {
      setMainBlogs(trendingBlogs.trendings.trendings);
    } else {
      setMainBlogs([]);
    }
  }, [trendingBlogs]);
  const buttons = [
    { name: "News" },
    { name: "Entertainment" },
    { name: "Politics" },
    { name: "Fashion" },
    { name: "Cooking" },
    { name: "Sports" },
    { name: "Market" },
    { name: "Crypto" },
    { name: "Technology" },
    // { name: "News" },
    // { name: "News" },
    // { name: "News" },
    // { name: "News" },
    // { name: "News" },
    // { name: "News" },
    // { name: "News" },
    // { name: "News" },
  ];
  const follow = async (author) => {
    const response = await axiosPost(
      `${process.env.BACKEND_URL}/follow?id=${author._id}`
    );
    if (response && response.state) {
      try {
        const newArr = followingList.userFollowingList;
        newArr.push(author._id);
        dispatch(getFollowingList.updateFollowingList(newArr));
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const unfollow = async (author) => {
    const response = await axiosPost(
      `${process.env.BACKEND_URL}/unfollow?id=${author._id}`
    );
    if (response && response.state) {
      let a = [];
      for (
        let index = 0;
        index < followingList.userFollowingList.length;
        index++
      ) {
        const element = followingList.userFollowingList[index];
        if (element !== author._id) {
          a.push(element);
        }
      }
      dispatch(getFollowingList.updateFollowingList(a));
    }
    // }
    // errorNotification("can't follow now", "try again later");
    // }
  };

  return (
    <div>
      <div className="md:flex flex-wrap md:mx-0 mx-2 justify-evenly md:px-3 pt-4 hidden">
        {mainBlogs &&
          mainBlogs.map((e) => {
            const blog = e.blog;
            return (
              <>
                <div
                  key={e._id}
                  onClick={() => {
                    dispatch(
                      sessionStorageAction.userReviewBlog(
                        blog && blog._id && blog._id
                      )
                    );
                  }}
                  className={`${
                    sessionStorage.session === blog._id
                      ? "border-color_9 bg-color_6"
                      : "bg-color_2"
                  }   border cursor-pointer md:min-w-[400px] duration-200 hover:drop-shadow mx-auto max-w-[450px] rounded md:w-[45%] mb-3`}
                >
                  <div className="w-full flex justify-between px-2 py-2 ">
                    <div className="flex justify-start gap-2 items-start">
                      <div className="rounded-full drop-shadow overflow-hidden h-[50px] w-[50px] bg-color_8 text-color_2">
                        <Image
                          unoptimized
                          // fill
                          src={`${process.env.BACKEND_URL}/profilePhoto/direct?userid=${blog.author.userid}`}
                          alt="image"
                          width="100%"
                          height="140%"
                          layout="responsive"
                          objectFit="cover"
                        />
                      </div>{" "}
                      <div>
                        <div className="text-text_1 font-semibold">
                          {blog.author && blog.author.name}
                        </div>
                        <div className="text-text_2">
                          {" "}
                          {blog.author && blog.author.userid}
                        </div>
                      </div>
                    </div>
                    <div>
                      {blog.author.userid !==
                        localStorage.getItem("userid") && (
                        <>
                          {followersData &&
                          blog &&
                          blog.author &&
                          followersData.includes(blog.author._id) ? (
                            <div
                              onClick={() => {
                                unfollow(blog.author);
                              }}
                              className="text-[blue]"
                            >
                              unfollow
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                follow(blog.author);
                              }}
                              className="text-[blue]"
                            >
                              follow
                            </div>
                          )}
                        </>
                      )}

                      <div>
                        {/* {blog &&
                      blog.blogUpload &&
                      blog.from.split("T")[0].split("-") &&
                      dateConverter(blog.from.split("T")[0].split("-")[1]) +
                        " " +
                        blog.from.split("T")[0].split("-")[0]}{" "}} */}
                      </div>
                    </div>
                  </div>
                  <Image
                    unoptimized
                    // fill
                    src={`${process.env.BACKEND_URL}/blogPost/image/${blog.imageURL}`}
                    alt="image"
                    width="100%"
                    height="40%"
                    layout="responsive"
                    objectFit="cover"
                  />
                  <div className="px-2">
                    <div className="py-1 text-[19px] text-text_1">
                      {blog && blog.heading}
                    </div>
                    <div className="text-text_2">
                      qiojri ejr jjepjetmlkm n nlnlk n knlk tnlkwe ne ntn e tne
                      n ntnt kn kynkl n qiojri ejr jjepjetmlkm n nlnlk n knlk
                      tnlkwe ne ntn e tne n ntnt kn kynkl n qiojri ejr
                      jjepjetmlkm n nlnlk n knlk tnlkwe ne ntn e tne n ntnt kn
                      kynkl n qiojri ejr jjepjetmlkm n nlnlk n knlk tnlkwe ne
                      ntn e tne n ntnt kn kynkl n qiojri ejr jjepjetmlkm n nlnlk
                      n knlk tnlkwe ne ntn e tne n ntnt kn kynkl n
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="mx-2 md:px-3 pt-4 md:hidden">
        {mainBlogs &&
          mainBlogs.map((e) => {
            const blog = e.blog;
            return (
              <>
                <SwipeableTemporaryDrawer
                  anchor="bottom"
                  click={
                    <div
                      id="operationButton"
                      key={e._id}
                      onClick={() => {
                        dispatch(
                          sessionStorageAction.userReviewBlog(
                            blog && blog._id && blog._id
                          )
                        );
                      }}
                      className={`${
                        sessionStorage.session === blog._id
                          ? "border-color_9 bg-color_6"
                          : "bg-color_2"
                      }   border cursor-pointer md:min-w-[400px] duration-200 hover:drop-shadow mx-auto max-w-[450px] rounded md:w-[45%] mb-3`}
                    >
                      <div className="w-full flex justify-between px-2 py-2 ">
                        <div className="flex justify-start gap-2 items-start">
                          <div className="rounded-full drop-shadow overflow-hidden h-[50px] w-[50px] bg-color_8 text-color_2">
                            <Image
                              unoptimized
                              // fill
                              src={`${process.env.BACKEND_URL}/profilePhoto/direct?userid=${blog.author.userid}`}
                              alt="image"
                              width="100%"
                              height="140%"
                              layout="responsive"
                              objectFit="cover"
                            />
                          </div>{" "}
                          <div>
                            <div className="text-text_1 font-semibold">
                              {blog.author && blog.author.name}
                            </div>
                            <div className="text-text_2">
                              {" "}
                              {blog.author && blog.author.userid}
                            </div>
                          </div>
                        </div>
                        <div>
                          {blog.author.userid !==
                            localStorage.getItem("userid") && (
                            <>
                              {followersData &&
                              blog &&
                              blog.author &&
                              followersData.includes(blog.author._id) ? (
                                <div
                                  onClick={() => {
                                    unfollow(blog.author);
                                  }}
                                  className="text-[blue]"
                                >
                                  unfollow
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    follow(blog.author);
                                  }}
                                  className="text-[blue]"
                                >
                                  follow
                                </div>
                              )}
                            </>
                          )}

                          <div>
                            {/* {blog &&
                      blog.blogUpload &&
                      blog.from.split("T")[0].split("-") &&
                      dateConverter(blog.from.split("T")[0].split("-")[1]) +
                        " " +
                        blog.from.split("T")[0].split("-")[0]}{" "}} */}
                          </div>
                        </div>
                      </div>
                      <Image
                        unoptimized
                        // fill
                        src={`${process.env.BACKEND_URL}/blogPost/image/${blog.imageURL}`}
                        alt="image"
                        width="100%"
                        height="40%"
                        layout="responsive"
                        objectFit="cover"
                      />
                      <div className="px-2">
                        <div className="py-1 text-[19px] text-text_1">
                          {blog && blog.heading}
                        </div>
                        <div className="text-text_2">
                          qiojri ejr jjepjetmlkm n nlnlk n knlk tnlkwe ne ntn e
                          tne n ntnt kn kynkl n qiojri ejr jjepjetmlkm n nlnlk n
                          knlk tnlkwe ne ntn e tne n ntnt kn kynkl n qiojri ejr
                          jjepjetmlkm n nlnlk n knlk tnlkwe ne ntn e tne n ntnt
                          kn kynkl n qiojri ejr jjepjetmlkm n nlnlk n knlk
                          tnlkwe ne ntn e tne n ntnt kn kynkl n qiojri ejr
                          jjepjetmlkm n nlnlk n knlk tnlkwe ne ntn e tne n ntnt
                          kn kynkl n
                        </div>
                      </div>
                    </div>
                  }
                  classNameDrawer="text-color_2"
                  data={
                    <div className="grow  h-full ">
                      <BlogPreReview />
                    </div>
                  }
                />
              </>
            );
          })}
      </div>
      <div className="mx-auto px-3 py-2 rounded border cursor-pointer flex justify-center w-fit text-text_1 mb-3">
        load more
      </div>
    </div>
  );
}

export default Trending;
