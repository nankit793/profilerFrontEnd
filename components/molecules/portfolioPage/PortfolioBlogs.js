import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
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
          `http://localhost:5000/blogPost/author/${props.portfolioData.user._id}`
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
    <div className="bg-[#fafafa] mt-4 w-full ">
      <div className="text-center p-2 font-bold text-text_1 text-[25px]">
        My Blogs
      </div>
      <div className="md:flex px-6  gap-3">
        {blogsData &&
          blogsData
            .slice(blogViewIndex.start, blogViewIndex.end)
            .map((blog, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="border rounded md:max-w-[450px] md:w-[45%] bg-color_2"
                  >
                    <div className="absolu">
                      <Image
                        unoptimized
                        // fill
                        src={`http://localhost:5000/blogPost/image/${blog.imageURL}`}
                        alt="image"
                        width="100%"
                        height="50%"
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                    <div className="px-3 my-2">
                      <div
                        className="text-color_7 text-[20px] w-[90%]  decoration-1  hover:underline-offset-8 "
                        onClick={() => {
                          router.push(`/view/blog/${blog._id}`);
                        }}
                      >
                        {blog.heading && blog.heading}
                      </div>
                      <div className="text-text_2  ">
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
                </>
              );
            })}
      </div>
      <div className="flex gap-3 justify-center py-5">
        <div
          onClick={() => {
            setBlogViewIndex({
              start: blogViewIndex.start - 3,
              end: blogViewIndex.end - 3,
            });
          }}
          className="bg-color_4 rounded-md text-color_2  px-5 py-2 cursor-pointer"
        >
          prev
        </div>
        <div
          onClick={() => {
            setBlogViewIndex({
              start: blogViewIndex.start + 3,
              end: blogViewIndex.end + 3,
            });
          }}
          className="bg-color_4 rounded-md text-color_2  px-5 py-2 cursor-pointer"
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default PortfolioBlogs;
