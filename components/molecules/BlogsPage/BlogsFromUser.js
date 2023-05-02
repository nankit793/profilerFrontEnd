import React, { useState, useEffect } from "react";
import axios from "axios";
import * as getAuthorBlogs from "../../../redux-next/getAuthorBlogs/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

function BlogsFromUser(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAuthorBlogs.getAuthorBlogs(props.author._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.author]);
  const blogs = useSelector((state) => state.authorBlogsReducer);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <>
      <div className="bg-color_2 h-[85vh] overflow-y-auto ">
        {blogs &&
          blogs.isFetched &&
          blogs.blogs.length !== 0 &&
          blogs.blogs.map((blog, index) => {
            return (
              <>
                <div
                  onClick={() => {
                    router.push(`http://localhost:3000/view/blog/${blog._id}`);
                  }}
                  className={`flex justify-start gap-3  duration-200 bg-color_2 cursor-pointer  p-2  hover:bg-color_3 duration-300   ${
                    blog._id === props.currBlog ? "bg-color_6" : ""
                  } `}
                >
                  {/* <div className="w-[20%] min-w-[100px]  h-full  h-full bg-color_3 rounded-full m-2 overflow-hidden">
                    <Image
                      unoptimized
                      fill={true}
                      src={`${process.env.BACKEND_URL}/blogPost/image/${blog.imageURL}`}
                      alt="image"
                      width="100%"
                      height="100%"
                      className="rounded-full"
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div> */}
                  <div className="overflow-x-auto">
                    <div className="font-semibold text-text_1 break-words">
                      {blog.heading}
                    </div>
                    <div className=" text-color_4 text-sm">
                      {blog.tag},{" "}
                      {blog &&
                        blog.activities &&
                        blog.activities.blogUpload.split("T")[0]}
                    </div>
                    <div className="text-text_2 text-sm break-words">
                      {blog.paragraphs &&
                        blog.paragraphs[0] &&
                        blog.paragraphs[0].paragraph &&
                        blog.paragraphs[0].paragraph.slice(0, 250)}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default BlogsFromUser;
