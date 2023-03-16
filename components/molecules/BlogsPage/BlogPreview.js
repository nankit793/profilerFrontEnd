import React from "react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

function BlogPreview(props) {
  return (
    <>
      <div className="w-full text-text_1 font-semibold text-[30px]">
        {props.blogStructure.heading}
      </div>
      {props.image ? (
        <div className="md:max-h-[500px] mt-2 max-w-[400px]  min-h-[200px] min-w-[200px] rounded overflow-hidden">
          <Image
            unoptimized
            // fill
            alt="image"
            src={props.image.url}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      ) : (
        ""
      )}
      <div className="mt-2 px-3 py-1  font-mono rounded-full border border-color_9 bg-color_2 w-min text-text_1">
        {props.blogStructure.tag}
      </div>
      <div className="mt-2">
        {props.blogStructure.paragraphs.map((para) => {
          return (
            <>
              <div className="text-text_2 my-2 font-serif text-[18px] ">
                {para.paragraph}
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
            <div>
              <iframe
                width="420"
                height="315"
                src="https://www.youtube.com/watch?v=_fWyWcZB7VA"
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
