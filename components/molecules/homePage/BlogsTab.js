import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
import axios from "axios";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddIcon from "@mui/icons-material/Add";
import Popover from "../Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ifLogged } from "../../ifLogged";
import { axiosDelete } from "../../functions/axiosCall";
import {
  errorNotification,
  successNotification,
} from "../../atoms/AlertMessage";
import Image from "next/image";
import { NotificationContainer } from "react-notifications";
import CircularProgresser from "../../atoms/CircularProgresser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as getAuthorBlogs from "../../../redux-next/getAuthorBlogs/actions";
function BlogsTab(props) {
  const router = useRouter();
  const [deleteData, setDeleteData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [deleteBlogLoading, setDeleteBlogLoading] = useState({
    id: "",
    state: false,
  });
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.authorBlogsReducer);

  const deleteBlog = async (blog) => {
    setDeleteBlogLoading({
      id: blog._id,
      state: true,
    });
    const deleted = await axiosDelete(
      `http://localhost:5000/deleteBlog?blogId=${blog._id}`
    );
    console.log(deleted);
    if (deleted && deleted.state) {
      successNotification("blog has been deleted");
      const a = [];
      blogs &&
        blogs.blogs.forEach((element) => {
          if (element._id !== blog._id) {
            a.push(element);
          }
        });
      dispatch(getAuthorBlogs.getAuthorBlogs_update(a));
      props.setBlogsCount(a.length);
    } else if (deleted && !deleted.state) {
      errorNotification(deleted.message);
    }
    setDeleteBlogLoading({
      id: "",
      state: false,
    });
  };
  const inBlogsSearch = (e) => {
    if (e) {
      const searched =
        blogs &&
        blogs.isFetched &&
        blogs.blogs.length !== 0 &&
        blogs.blogs.filter((b) => b.heading.match(e, "gi"));
      setSearchedBlogs(searched);
    } else {
      setSearchedBlogs([]);
    }
  };
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center mt-1 gap-2 flex-wrap">
          <input
            type="text"
            onChange={(e) => {
              inBlogsSearch(e.target.value);
              setSearchText(e.target.value);
            }}
            value={searchText}
            name=""
            placeholder="search in blogs of user"
            className="bg-color_2 w-full mx-auto md:min-w-[500px] md:w-[70%] rounded border p-2 focus:outline-none"
          />
          <div className="flex gap-2 md:mx-0 mx-3 flex-wrap md:justify-center justify-between grow">
            <div className="cursor-pointer hover:px-6 duration-200 w-min whitespace-nowrap text-text_1 bg-color_2 py-2 px-5 rounded-md border">
              Sort by
            </div>
            <div
              onClick={() => {
                router.push("/addBlog");
              }}
              className="p-2 cursor-pointer w-min whitespace-nowrap text-color_2 rounded bg-color_7  flex items-center justify-center hover:px-6 px-5 duration-200"
            >
              <div className="">
                <AddIcon fontSize="small" />
              </div>
              <div>Create blog</div>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto max-h-screen flex justify-center flex-wrap md:max-h-[80vh] md:pr-2 mt-2">
          {searchedBlogs &&
            searchedBlogs.length !== 0 &&
            searchedBlogs.map((blog) => {
              return blog.heading;
            })}
          {!searchText &&
            blogs &&
            blogs.isFetched &&
            blogs.blogs.length !== 0 &&
            blogs.blogs.map((blog, index) => {
              return (
                <div
                  key={index}
                  className="w-full rounded border border md:w-[45%] min-w-[300px] grow  bg-color_2 mb-2 hover:drop-shadow-md md:mx-2 cursor-pointer duration-200 hover:border-color_9"
                >
                  <div className="absolu">
                    <Image
                      unoptimized
                      // fill
                      src={`http://localhost:5000/blogPost/image/${blog.imageURL}`}
                      alt="image"
                      width="100%"
                      height="40%"
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-2">
                    <div className=" flex justify-between items-start">
                      <div
                        className="text-color_7 text-[20px] w-[90%]  decoration-1  hover:underline-offset-8 "
                        onClick={() => {
                          router.push(`/view/blog/${blog._id}`);
                        }}
                      >
                        {blog.heading && blog.heading}
                      </div>
                      {deleteBlogLoading.state &&
                      deleteBlogLoading.id === blog._id ? (
                        <div className=" h-[30px] w-[30px]  ">
                          <CircularProgresser size={30} />
                        </div>
                      ) : (
                        <>
                          {ifLogged() && (
                            <Popover
                              data={
                                <>
                                  <div
                                    onClick={(e) => {
                                      // removeEducation(index);
                                    }}
                                    id="operationButton"
                                    className="text-text_1  duration-200 cursor-pointer flex items-center p-1 "
                                  >
                                    Edit
                                  </div>
                                  <div
                                    onClick={() => {
                                      // removeEducation(index);
                                      deleteBlog(blog);
                                    }}
                                    id="operationButton"
                                    className="text-maroon  duration-200 cursor-pointer flex items-center p-1 "
                                  >
                                    Delete
                                  </div>
                                </>
                              }
                              text={
                                <div className="text-text_1">
                                  <MoreHorizIcon />
                                </div>
                              }
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-text_2 mt-3 my-2 ">
                      {blog.paragraphs &&
                        blog.paragraphs[0].paragraph.slice(0, 250)}
                    </div>
                    <div className="flex justify-between items-end ">
                      <div className="flex justify-start gap-3 flex-wrap rounded text-[white] mt-2 text-sm">
                        <div className="text-text_2 font-semibold flex justify-center items-center items-center gap-1 pr-2">
                          <FavoriteIcon fontSize="small" />{" "}
                          <span className="font-normal text-text_1">
                            {" "}
                            {blog.activities.numLikes}{" "}
                          </span>
                        </div>
                        <div className="text-text_2 font-semibold flex justify-center items-center items-center gap-1 pr-2">
                          <ChatBubbleOutlineIcon fontSize="small" />{" "}
                          <span className="font-normal text-text_1">
                            {blog.activities.numComments}{" "}
                          </span>
                        </div>
                        <div className="text-text_2 font-semibold flex justify-center items-center items-center gap-1 pr-2">
                          <RemoveRedEyeIcon fontSize="small" />
                          <span className="font-normal text-text_1">
                            {" "}
                            {blog.activities.views &&
                              blog.activities.views}{" "}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-start items-center gap-2">
                          <div className="text-color_4 w-min  text-sm  text-text_2">
                            {blog.tag && blog.tag}
                          </div>
                          <div className="text-color_4 text-sm">
                            {blog.activities &&
                              blog.activities.blogUpload &&
                              blog.activities.blogUpload.split("T")[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {blogs &&
          blogs.isFetched &&
          blogs.blogs &&
          blogs.blogs.length === 0 && (
            <div className="text-text_1 font-semibold w-full  flex justify-center items-center">
              user has not uploaded any blogs yet!
            </div>
          )}
      </div>
      <NotificationContainer />
    </>
  );
}

export default BlogsTab;
