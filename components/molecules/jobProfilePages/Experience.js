/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "../../../components/molecules/Modal";
import SwipeableTemporaryDrawer from "../Drawer";
import ExperienceData from "./components/ExperienceData";
// import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Popover from "../Popover";

// mui

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Skeleton from "@mui/material/Skeleton";

function Experience(props) {
  const [jobExperienceData, setJobExperienceData] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setJobExperienceData(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (jobExperienceData && jobExperienceData["experience"]) {
      setShowSkeleton(false);
    }
  }, [jobExperienceData]);

  const onClick = (data, edited, index) => {
    if (!edited) {
      jobExperienceData["experience"].push(data);
    } else {
      jobExperienceData["experience"][index] = data;
    }
    setJobExperienceData((prevState) => ({
      ...prevState,
      ["experience"]: jobExperienceData["experience"],
    }));
    props.onChange({
      name: "experience",
      value: jobExperienceData["experience"],
    });
  };
  const removeExperience = (index) => {
    jobExperienceData["experience"].splice(index, 1);
    setJobExperienceData((prevState) => ({
      ...prevState,
      ["experience"]: jobExperienceData["experience"],
    }));
    props.onChange({
      name: "experience",
      value: jobExperienceData["experience"],
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-text_2 whitespace-nowrap font-semibold text-lg ">
          Experience
        </div>
        <div className="h-[2px] bg-color_6 w-full rounded-full mx-5 md:block hidden"></div>
        <SwipeableTemporaryDrawer
          anchor="right"
          click={
            <div className="py-2 lowercase mb-2 flex items-center px-3 bg-color_5 hover:bg-color_5 rounded-full text-[white] whitespace-nowrap w-min">
              <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
              add experience
            </div>
          }
          data={<ExperienceData onClick={onClick} />}
        />
      </div>
      <Modal
        onClick={handleOpen}
        onClose={handleClose}
        textClass=""
        hideBackdrop={true}
        // text={<DeleteIcon fontSize="small" />}
        open={open}
        data={<div>hello there</div>}
      />
      {jobExperienceData &&
        jobExperienceData.experience &&
        jobExperienceData.experience.length === 0 && (
          <div className="text-semibold text-center my-10 text-md text-text_2">
            <div>
              <SentimentDissatisfiedIcon />
            </div>
            You have not added any experience yet.
          </div>
        )}
      {showSkeleton && (
        <Box sx={{ width: "100%" }} className="mt-10">
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
      {jobExperienceData && jobExperienceData.experience && (
        <div className="md:flex gap-5 mt-5 flex-wrap">
          {jobExperienceData.experience.map((item, index) => {
            return (
              <div
                className="border h-min  bg-color_2 drop-shadow md:w-[45%] md:my-0 my-4"
                key={index}
              >
                <div className="flex mt-2 justify-between items-center font-semibold px-3 bg-color_2 text-text_1  w-full text-[16px]">
                  <div>{item.company && item.company}</div>
                  <div className="flex justify-center">
                    <Popover
                      text={<MoreHorizIcon />}
                      data={
                        <div className="w-full text-text_1 px-2 bg-[white]">
                          <div>
                            <SwipeableTemporaryDrawer
                              anchor="right"
                              click={<div className="mb-2">Edit</div>}
                              data={
                                <ExperienceData
                                  edit={true}
                                  jobExperienceData={
                                    jobExperienceData["experience"][index]
                                  }
                                  index={index}
                                  onClick={onClick}
                                />
                              }
                            />
                          </div>
                          <div
                            id="operationButton"
                            onClick={() => {
                              removeExperience(index);
                            }}
                            className="cursor-pointer text-maroon"
                          >
                            Delete
                          </div>
                        </div>
                      }
                    />

                    {/* <div
                      onClick={() => {
                        // handleOpen();
                        // removeExperience();
                      }}
                      className="my-[5px] px-[5px] flex  justify-center items-center  rounded-full  text-text_1  hover:bg-color_7 hover:text-color_2 duration-200 cursor-pointer"
                    >
                      <DeleteIcon fontSize="small" />
                    </div> */}
                  </div>
                </div>
                <div className="mx-3  mt-2 mb-2">
                  <div className="flex justify-between flex-wrap">
                    <div className=" text-text_1 font-semibold text-[15px]">
                      {item.designation ? item.designation : ""}
                    </div>
                    <div className="flex justify-start gap-1 font-semibold text-text_2 text-sm">
                      <div>
                        {item.from
                          ? `${new Date(item.from).getMonth() + 1}/${new Date(
                              item.from
                            ).getFullYear()} `
                          : "start"}
                      </div>{" "}
                      <div>
                        {" "}
                        {item.working ? (
                          <div className="font-medium whitespace-nowrap text-text_2 italic text-[15px]">
                            - present
                          </div>
                        ) : item.to ? (
                          `- ${new Date(item.to).getMonth() + 1}/${new Date(
                            item.to
                          ).getFullYear()} `
                        ) : (
                          "- end"
                        )}
                      </div>
                      {/* <div>{item.to ? `${new Date(item.to).getMonth() + 1}/${new Date(item.to).getFullYear()} ` : ""}</div> */}
                    </div>
                  </div>
                  <div className="text-text_2 mt-2">
                    {item.description && item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="bg-color_6 px-3">
        <div className="w-full border-b  text-color_5  text-[22px] font-semibold mt-10 ">
          Tips
        </div>
        <div className="w-full text-color_4 text-[15px] my-2 pb-2">
          <div>1) usefull tips for user will be provided here</div>
          <div>2) usefull tips for user will be provided here</div>
          <div>3) usefull tips for user will be provided here</div>
          <div>4) usefull tips for user will be provided here</div>
        </div>
      </div>
    </>
  );
}

export default Experience;
