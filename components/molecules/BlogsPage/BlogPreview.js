import React, { useState, useEffect } from "react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

function BlogPreview(props) {
  console.log(props.otherImages, props.blogStructure.paragraphs);
  const [youtubeVideoCode, setYoutubeVideoCode] = useState(false);
  useEffect(() => {
    if (
      props.blogStructure &&
      props.blogStructure.selectedRedirection === "youtube"
    ) {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = props.blogStructure.redirectURL.match(regExp);
      setYoutubeVideoCode(match && match[7].length == 11 ? match[7] : false);
    }
  }, []);
  return (
    <>
      <div className="w-full text-text_1 font-semibold text-[30px]">
        {props.blogStructure.heading}
      </div>
      {props.image ? (
        <>
          {props.edited && !props.change ? (
            <>
              <div className=" mt-2 w-full bg-color_3 rounded md:block hidden">
                <Image
                  unoptimized
                  fill={true}
                  src={`http://localhost:5000/blogPost/image/${props.image.url}`}
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
                  src={`http://localhost:5000/blogPost/image/${props.image.url}`}
                  alt="image"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            </>
          ) : (
            <>
              <div className=" mt-2 w-full bg-color_3 rounded md:block hidden">
                <Image
                  unoptimized
                  fill={true}
                  src={props.image.url}
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
                  src={props.image.url}
                  alt="image"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            </>
          )}
        </>
      ) : (
        ""
      )}
      <div className="mt-2 px-3 py-1  font-mono rounded-full border border-color_9 bg-color_2 w-min text-text_1">
        {props.blogStructure.tag}
      </div>
      <div className="mt-2">
        {props.blogStructure.paragraphs.map((para, index) => {
          return (
            <>
              <div className="mb-8">
                <div
                  key={index}
                  className="font-serif  text-[20px] text-text_1"
                >
                  {para.subHead && para.subHead}
                </div>
                <div className="text-text_2 my-2 font-serif text-[18px] ">
                  {para.paragraph}
                </div>
                <div className=" mt-2 w-[50%] bg-color_3 rounded md:block hidden">
                  {para.imageURL ? (
                    <Image
                      unoptimized
                      fill={true}
                      src={`http://localhost:5000/blogPost/image/${para.imageURL}`}
                      alt="image"
                      width="100%"
                      height="40%"
                      layout="responsive"
                      objectFit="cover"
                    />
                  ) : (
                    <>
                      {props.otherImages[`p${index + 1}`] &&
                        props.otherImages[`p${index + 1}`].imageURL && (
                          <Image
                            unoptimized
                            fill={true}
                            src={`${
                              props.otherImages[`p${index + 1}`] &&
                              props.otherImages[`p${index + 1}`].imageURL
                            }`}
                            alt="image"
                            width="100%"
                            height="40%"
                            layout="responsive"
                            objectFit="cover"
                          />
                        )}
                    </>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
      {props.blogStructure.redirectURL && (
        <>
          {props.blogStructure.selectedRedirection === "website" ? (
            <div
              onClick={() => {
                window.open(props.blogStructure.redirectURL, "_blank");
              }}
              className="mt-2 text-[blue] cursor-pointer"
            >
              Click here for more information{" "}
              <span className="text-text_1 italic text-sm">
                {" "}
                (This link will take you to external site)
              </span>{" "}
            </div>
          ) : (
            <div className="text-text_1 mt-3">
              view on youtube{" "}
              <span
                onClick={() => {
                  window.open(props.blogStructure.redirectURL, "_blank");
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
        </>
      )}

      <div className="mt:mb-0 mb-20 flex justify-evenly mt-5 text-text_1 bg-color_8 rounded-xl p-3 border items-center gap-5">
        <div>
          <FavoriteBorderIcon />
        </div>
        <div>
          <ChatBubbleOutlineIcon />
        </div>
        <div>
          <ShareIcon />
        </div>
      </div>
    </>
  );
}

export default BlogPreview;
