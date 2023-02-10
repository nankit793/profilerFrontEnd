import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import SwipeableTemporaryDrawer from "../Drawer";
import EducationData from "./components/EducationData";
import Popover from "../Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function Education(props) {
  const [jobEducationData, setJobEducationData] = useState();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setJobEducationData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (jobEducationData && jobEducationData["education"]) {
      setShowSkeleton(false);
    }
  }, [jobEducationData]);

  const onClick = (data, edited, index) => {
    if (!edited) {
      jobEducationData["education"].push(data);
    } else {
      jobEducationData["education"][index] = data;
    }

    setJobEducationData((prevState) => ({
      ...prevState,
      ["education"]: jobEducationData["education"],
    }));

    props.onChange({
      name: "education",
      value: jobEducationData["education"],
    });
  };

  const removeEducation = (index) => {
    jobEducationData["education"].splice(index, 1);
    setJobEducationData((prevState) => ({
      ...prevState,
      ["education"]: jobEducationData["education"],
    }));
    props.onChange({
      name: "education",
      value: jobEducationData["education"],
    });
  };
  return (
    <>
      <div className="">
        <div className="flex justify-between  w-full items-center">
          <div className="text-lg text-text_2 font-semibold ">Education</div>
          <div className="h-[2px] bg-color_6 w-full rounded-full mx-5 md:block hidden"></div>
          <SwipeableTemporaryDrawer
            anchor="right"
            click={
              <div className="p-2 rounded lowercase bg-color_5 whitespace-nowrap hover:bg-color_7 px-3 cursor-pointer text-[white] flex items-center duration-200">
                <AddIcon fontSize="small" sx={{ color: "white" }} /> add
                Education
              </div>
            }
            data={<EducationData onClick={onClick} />}
          />
        </div>
        {jobEducationData &&
          jobEducationData["education"] &&
          jobEducationData["education"].length === 0 && (
            <div className="text-text_2 text-sm font-semibold text-center my-10 ">
              You have not added any graduation details
            </div>
          )}
        {showSkeleton && (
          <Box sx={{ width: "100%" }} className="mt-10">
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
        {jobEducationData && jobEducationData["education"] && (
          <div className="md:flex justify-start gap-5 flex-wrap mt-5">
            {jobEducationData["education"].map((item, index) => {
              return (
                <div
                  key={index}
                  className="border px-2 pb-3 h-min  bg-color_2 drop-shado-sm w-full md:w-[45%] md:my-0 my-5"
                >
                  <div className="text-right">
                    <Popover
                      data={
                        <>
                          <SwipeableTemporaryDrawer
                            anchor="right"
                            click={
                              <div className="text-text_2 hover:text-color_4 duration-200 cursor-pointer w-min flex items-center p-1 ">
                                Edit
                              </div>
                            }
                            data={
                              <EducationData
                                edited={true}
                                educationData={
                                  jobEducationData["education"][index]
                                }
                                index={index}
                                onClick={onClick}
                              />
                            }
                          />
                          <div
                            onClick={() => {
                              removeEducation(index);
                            }}
                            id="operationButton"
                            className="text-maroon  duration-200 cursor-pointer flex items-center p-1 "
                          >
                            Delete
                          </div>
                        </>
                      }
                      text={
                        <div className="">
                          <MoreHorizIcon />
                        </div>
                      }
                    />
                  </div>
                  <div className="w-full flex justify-between flex-wrap items-center my-2 gap-2">
                    <div className="mx-3 font-semibold   flex-wrap text-text_1 text-[17px] flex justify-start items-center gap-2">
                      {item.institution && item.institution}
                    </div>
                  </div>
                  <div className="mx-3 my-2 flex flex-wrap justify-start gap-2 whitespace-nowrap text-text_2">
                    <div>{item.education && item.education},</div>
                    <div>{item.course && item.course}</div>
                  </div>
                  <div className="mx-3 flex gap-5 flex-wrap justify-start items-end text-text_2">
                    {item.attending && (
                      <div className="font-medium whitespace-nowrap text-text_2 italic text-[15px]">
                        currently attending
                      </div>
                    )}
                    <div className="text-sm flex">
                      {item.from
                        ? `${new Date(item.from).getMonth() + 1}/${new Date(
                            item.from
                          ).getFullYear()} `
                        : "start"}{" "}
                      {item.to
                        ? `- ${new Date(item.to).getMonth() + 1}/${new Date(
                            item.to
                          ).getFullYear()} `
                        : "- end"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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

export default Education;
