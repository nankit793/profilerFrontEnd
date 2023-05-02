import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
function PortfolioBlogs(props) {
  const [blogsData, setBlogsData] = useState([]);
  const [blogViewIndex, setBlogViewIndex] = useState({
    start: 0,
    end: 3,
  });
  const router = useRouter();

  useEffect(() => {
    if (
      props.portfolioData &&
      props.portfolioData.user &&
      props.portfolioData.user._id
    ) {
      const fetcher = async () => {
        const data = await fetch(
          `${process.env.BACKEND_URL}/blogPost/author/${props.portfolioData.user._id}`
        );
        const saveData = await data.json();
        if (data && data.status === 200 && saveData && saveData.blogUpload) {
          setBlogsData(saveData.blogUpload);
        }
      };
      fetcher();
    }
  }, [props.portfolioData]);

  return (
    <div className=" bg-[#fafafa] mt-4 w-full ">
      <div className="text-center pt-3 pb-2 font-bold text-text_1 text-[25px]">
        My Blogs
      </div>
      <div className="md:flex justify-center flex-wrap px-2 md:px-6  gap-3 ">
        {blogsData &&
          blogsData
            .slice(blogViewIndex.start, blogViewIndex.end)
            .map((blog, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="border flex justify-start flex-col grow md:my-0 my-2 rounded md:max-h-[420px] md:min-h-[420px] md:max-w-[400px] md:min-w-[400px] md:w-[45%] bg-color_2 "
                  >
                    <div className="absolu">
                      <Image
                        unoptimized
                        // fill
                        src={`${process.env.BACKEND_URL}/blogPost/image/${blog.imageURL}`}
                        alt="image"
                        width="100%"
                        height="50%"
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                    <div className="px-3 my-2 flex flex-col justify-between h-full">
                      <div className="overflow-auto">
                        <div
                          className="text-color_7 text-[20px] w-[90%]  decoration-1  hover:underline-offset-8 "
                          onClick={() => {
                            router.push(`/view/blog/${blog._id}`);
                          }}
                        >
                          {blog.heading && blog.heading}
                        </div>
                        <div className="text-text_2 break-words overflow-auto">
                          {blog.paragraphs &&
                            blog.paragraphs[0].paragraph.slice(0, 250)}
                        </div>
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
                </>
              );
            })}
      </div>
      {/* <div>{   (blogsData.length / 3)} </div> */}
      <div className="flex gap-3 justify-center py-5">
        <div
          onClick={() => {
            if (blogViewIndex.start - 3 > 0) {
              setBlogViewIndex({
                start: blogViewIndex.start - 3,
                end: blogViewIndex.end - 3,
              });
            } else if (blogViewIndex.start === 0) {
              setBlogViewIndex({
                start: blogsData.length - 3,
                end: blogsData.length,
              });
            } else {
              setBlogViewIndex({
                start: 0,
                end: 3,
              });
            }
          }}
          className="bg-color_7 rounded text-color_2  px-2  py-2 cursor-pointer"
        >
          <NavigateBeforeIcon />
        </div>
        <div
          onClick={() => {
            if (blogsData.length > blogViewIndex.end) {
              setBlogViewIndex({
                start: blogViewIndex.start + 3,
                end: blogViewIndex.end + 3,
              });
            } else {
              setBlogViewIndex({
                start: 0,
                end: 3,
              });
            }
          }}
          className="bg-color_7 rounded text-color_2  px-2 py-2 cursor-pointer"
        >
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
}

export default PortfolioBlogs;
