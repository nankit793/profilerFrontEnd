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
import PortfolioBlogs from "../../../components/molecules/portfolioPage/PortfolioBlogs";
import Education from "../../../components/molecules/portfolioPage/Education";

function Portfolio() {
  const [portfolioData, setPortfolioData] = useState({});
  const [portfolioActivities, setPortfolioActivities] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (router.query.pid) {
      const fetcher = async () => {
        const data = await fetch(
          `http://localhost:5000/portfolio/get?pid=${router.query.pid}`
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
        }
      };
      fetcher();
    }
  }, [router.query.pid]);
  useEffect(() => {
    console.log(
      portfolioData && portfolioData.user && portfolioData.user.userid,
      portfolioData
    );
    if (portfolioData && portfolioData.user && portfolioData.user.userid) {
      const fetcher = async () => {
        const data = await fetch(`http://localhost:5000/getbasic`, {
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

  return (
    <>
      <div className="pt-16  w-full bg-color_9">
        <div className=" flex justify-end rounded-full text-color_2 flex gap-3 items-start">
          <div className="text-center flex items-center bg-color_4 px-2 rounded-l-xl">
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
                  src={`http://localhost:5000/profilePhoto?userid=${portfolioData.user.userid}`}
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
              <div className="text-semibold text-text_1 text-[20px]">
                Hello, My name is
              </div>
              <div className="text-[23px] font-bold uppercase text-color_2">
                {portfolioData && portfolioData.user && portfolioData.user.name}
              </div>
              <div className="md:w-[90%] text-text_1 text-sm">
                {portfolioData.about}
              </div>
            </div>
            <div className="bg-color_7 px-3 w-fit md:mt-0 mt-5 rounded whitespace-nowrap p-2 text-color_2">
              Download CV
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-color_4 px-5 py-2 mt-2 rounded-t-xl w-fit mx-auto gap-3 text-color_2">
          <Avatar
            alt="linkedin"
            src="/images/linkedin.png"
            sx={{ width: 25, height: 25 }}
          />
          <div>
            <RemoveRedEyeIcon />
          </div>
          <div>
            <RemoveRedEyeIcon />
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
      <Education />
    </>
  );
}

export default Portfolio;
