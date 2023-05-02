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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Avatar from "@mui/material/Avatar";
import BlogInteraction from "../../../components/molecules/BlogsPage/BlogInteraction";
import BlogComments from "../../../components/molecules/BlogsPage/BlogComments";
import {
  axiosDelete,
  axiosPost,
} from "../../../components/functions/axiosCall";
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
import PortfolioBlogs from "../../../components/molecules/portfolioPage/PortfolioBlogs";
import Education from "../../../components/molecules/portfolioPage/Education";
import PortfolioInteration from "../../../components/molecules/portfolioPage/PortfolioInteration";
import Certificates from "../../../components/molecules/portfolioPage/Certificates";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { Document, Page, pdfjs, View, Text } from "react-pdf";
function Portfolio() {
  const [portfolioData, setPortfolioData] = useState({});
  const [portfolioActivities, setPortfolioActivities] = useState({});
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [resume, setResume] = useState("");
  const bookmarks = useSelector((state) => state.portfolioBookmarksReducer);
  const [isBookMarked, setIsBookMarked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (bookmarks && bookmarks.isFetched && bookmarks.bookmarks) {
      bookmarks.bookmarks.forEach((element) => {
        if (element._id === router.query.pid) {
          setIsBookMarked(true);
        }
      });
    }
  }, [bookmarks, router.query.pid]);

  useEffect(() => {
    if (router.query.pid) {
      const fetcher = async () => {
        const data = await fetch(
          `${process.env.BACKEND_URL}/portfolio/get?pid=${router.query.pid}`,
          {
            meathod: "GET",
            headers: {
              userid: localStorage.getItem("userid"),
            },
          }
        );
        const saveData = await data.json();
        if (
          data &&
          data.status === 200 &&
          saveData &&
          saveData.portfolio &&
          saveData.portfolioAtActivities
        ) {
          setPortfolioData(saveData.portfolio);
          setPortfolioActivities(saveData.portfolioAtActivities);
          setIsLiked(saveData.isLiked);
          setNumLikes(saveData.portfolioAtActivities.numLikes);
          setNumComments(saveData.portfolioAtActivities.numReviews);
        }
      };
      fetcher();
    }
  }, [router.query.pid]);
  useEffect(() => {
    if (portfolioData && portfolioData.user && portfolioData.user.userid) {
      const fetcher = async () => {
        const data = await fetch(`${process.env.BACKEND_URL}/getbasic`, {
          headers: {
            userid: portfolioData.user.userid,
          },
        });
        const saveData = await data.json();
        if (data && data.status === 200 && saveData && saveData.data) {
          console.log(saveData);
        }
      };
      fetcher();
    }
  }, [portfolioData]);

  useEffect(() => {
    const viewResume = async () => {
      if (router.query.pid) {
        try {
          const save = await fetch(
            `${process.env.BACKEND_URL}/jobResume?pid=${router.query.pid}`,
            {
              method: "GET",
            }
          );
          let finalSave = await save.json();
          if (
            save &&
            save.status === 200 &&
            finalSave &&
            finalSave.media &&
            finalSave.media.resume
          ) {
            setResume(finalSave.media.resume);
          } else {
            setResume("");
          }
        } catch (error) {
          setResume("");
        }
      } else {
        errorNotification("try again later");
      }
    };
    viewResume();
  }, [router.query.pid]);

  const bookmark = async () => {
    const bookmarked = await axiosPost(
      `${process.env.BACKEND_URL}/portfolio/bookmarks?pid=${router.query.pid}`
    );
    if (bookmarked && bookmarked.state) {
      successNotification(
        "you can view Bookmarked portfolio on your profile",
        "portfolio has been bookmarked"
      );
      setIsBookMarked(true);
    } else if (bookmarked && !bookmarked.state) {
      errorNotification(bookmarked.message);
    }
  };
  const removeBookmark = async () => {
    const bookmarked = await axiosDelete(
      `${process.env.BACKEND_URL}/portfolio/bookmarks?pid=${router.query.pid}`
    );
    if (bookmarked && bookmarked.state) {
      successNotification("Bookmark removed from the portfolio");
      setIsBookMarked(false);
    } else if (bookmarked && !bookmarked.state) {
      errorNotification(bookmarked.message);
    }
  };

  return (
    <>
      <div className="pt-16  w-full bg-color_1 border-b-[1px]">
        <div className=" flex justify-end items-end rounded-full text-color_2 flex gap-3 items-start">
          <div className="">
            {!isBookMarked ? (
              <div
                onClick={bookmark}
                className="hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer text-color_7"
              >
                <BookmarkBorderIcon />
              </div>
            ) : (
              <div
                onClick={removeBookmark}
                className=" hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer text-color_7"
              >
                <BookmarkAddedIcon />
              </div>
            )}
          </div>
          <div className="text-center flex items-center bg-color_7 px-2 rounded-l-xl">
            <RemoveRedEyeIcon fontSize="small" />
            <div className="pl-1">
              {portfolioActivities && portfolioActivities.views}
            </div>
          </div>
        </div>
        <div className="flex md:gap-10 gap-2 md:flex-row flex-col items-start justify-center mx-3 pt-2">
          <div className="w-[200px] h-[200px] md:mx-0 mx-auto">
            {portfolioData &&
              portfolioData.user &&
              portfolioData.user.userid && (
                <Image
                  unoptimized
                  // fill
                  src={`${process.env.BACKEND_URL}/profilePhoto/direct?userid=${portfolioData.user.userid}`}
                  alt="Picture of the author"
                  // objectFit="revert"
                  width="100%"
                  height="100%"
                  className="rounded"
                  layout="responsive"
                  objectFit="cover"
                />
              )}
          </div>
          <div className="md:w-[70%] md:flex gap-3 justify-between items-end">
            <div className="">
              {/* <div className="text-semibold text-text_1 text-[20px]">
                Hello, My name is
              </div> */}
              <div className="text-[23px] font-bold uppercase text-color_2">
                {portfolioData && portfolioData.user && portfolioData.user.name}
              </div>
              <div className="md:w-[90%]  text-text_1 text-sm">
                {portfolioData.about}
              </div>
            </div>
            <div className="bg-color_7 px-3 w-fit md:mt-0 mt-5 rounded whitespace-nowrap p-2 text-color_2">
              Download CV
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-color_2 mt-2 rounded-t-md w-fit mx-auto  gap-2 text-color_2">
          <div>
            {portfolioData &&
            portfolioData.user &&
            portfolioData.user.linkdn ? (
              <div
                className="mx-auto mt-1 p-1 hover:bg-color_7 flex justify-center items-center rounded-full duration-200 cursor-pointer"
                onClick={() => {
                  window.open(portfolioData.user.linkdn, "_blank");
                }}
              >
                <Avatar
                  alt="Facebook"
                  src="/images/linkedin.png"
                  sx={{ width: 25, height: 25 }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          {portfolioData &&
          portfolioData.user &&
          portfolioData.user.facebook ? (
            <div
              className="mx-auto mt-1 p-1 h-min hover:bg-color_7 flex justify-center items-center rounded-full duration-200 cursor-pointer"
              onClick={() => {
                window.open(portfolioData.user.facebook, "_blank");
              }}
            >
              <Avatar
                alt="Facebook"
                src="/images/facebook.png"
                sx={{ width: 25, height: 25 }}
              />
            </div>
          ) : (
            ""
          )}
          <div>
            {portfolioData &&
            portfolioData.user &&
            portfolioData.user.instagram ? (
              <div
                className="mx-auto p-1 mt-1 hover:bg-color_7 flex justify-center items-center rounded-full duration-200 cursor-pointer"
                onClick={() => {
                  window.open(portfolioData.user.instagram, "_blank");
                }}
              >
                <Avatar
                  alt="Facebook"
                  src="/images/insta.png"
                  sx={{ width: 30, height: 30 }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {portfolioData &&
            portfolioData.user &&
            portfolioData.user.youtube ? (
              <div
                className="mx-auto mt-1 p-1 hover:bg-color_7 flex justify-center items-center rounded-full duration-200 cursor-pointer"
                onClick={() => {
                  window.open(portfolioData.user.youtube, "_blank");
                }}
              >
                <Avatar
                  alt="Facebook"
                  src="/images/youtube.png"
                  sx={{ width: 25, height: 25 }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {portfolioData &&
            portfolioData.user &&
            portfolioData.user.github ? (
              <div
                className="mx-auto mt-1 p-1 hover:bg-color_7 flex justify-center items-center rounded-full duration-200 cursor-pointer"
                onClick={() => {
                  window.open(portfolioData.user.github, "_blank");
                }}
              >
                <Avatar
                  alt="Facebook"
                  src="/images/github.png"
                  sx={{ width: 25, height: 25 }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className=" mt-3 md:w-[80%] mx-2 md:mx-auto">
        <div className="font-bold text-text_1 text-[25px] mb-2">Experience</div>
        {portfolioData &&
          portfolioData.experience &&
          portfolioData.experience.map((job, index) => {
            return (
              <div
                key={index}
                className={` ${
                  index === 0 ? "" : ""
                } border-l  border-l-color_11 border-l-[2px] ${
                  portfolioData.experience.length - 1 === index
                    ? " pb-1 "
                    : "pb-4 pt-1"
                } `}
              >
                <div className="flex items-center">
                  <div className="w-[10px]  flex justify-center rounded-r-xl items-center h-[2px] bg-color_11"></div>
                  <div className="px-2  text-text_1 text-[20px] font-semibold capitalize">
                    {job && job.company}
                  </div>
                </div>
                <div className="px-2">
                  <div className="text-color_4 mx-3">
                    {job && job.designation}, {job && job.employementType}
                  </div>
                  <div className="text-text_2 text-color_4 mx-3">
                    {job &&
                      job.from &&
                      job.from.split("T")[0].split("-") &&
                      dateConverter(job.from.split("T")[0].split("-")[1]) +
                        " " +
                        job.from.split("T")[0].split("-")[0]}{" "}
                    -
                    {job.working ? (
                      <span className="font-semibold italic "> present</span>
                    ) : (
                      job &&
                      job.to &&
                      job.to.split("T")[0].split("-") &&
                      dateConverter(job.to.split("T")[0].split("-")[1]) +
                        " " +
                        job.to.split("T")[0].split("-")[0]
                    )}
                  </div>
                  <div className="text-text_2 text-[16px] mx-3">
                    {job && job.description}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <PortfolioBlogs portfolioData={portfolioData} />
      <Education portfolioData={portfolioData} />
      <Certificates portfolioData={portfolioData} />

      {resume && (
        <div className="w-full px-3 mt-10  md:px-10 flex justify-center textRemove">
          <div className="border overflow-x-auto rounded">
            <Document
              file={resume && resume}
              //    onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageIndex={0} />
            </Document>
          </div>
        </div>
      )}

      <PortfolioInteration
        pid={router.query.pid}
        isLiked={isLiked}
        numLikes={numLikes}
        author={portfolioData.user}
        numComments={numComments}
        setNumLikes={setNumLikes}
        setNumComments={setNumComments}
      />
      <Footer />
    </>
  );
}

export default Portfolio;
