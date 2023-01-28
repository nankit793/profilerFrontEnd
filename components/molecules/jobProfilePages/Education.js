import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import SwipeableTemporaryDrawer from "../Drawer";
import EducationData from "./components/EducationData";

import DeleteIcon from "@mui/icons-material/Delete";

function Education(props) {
  const [jobEducationData, setJobEducationData] = useState();

  useEffect(() => {
    setJobEducationData(props.data);
  }, []);

  useEffect(() => {
    // console.log(jobEducationData);
    // setJobEducationData(props.data);
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
    console.log(data);
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
        <div className="flex justify-between flex-wrap w-full">
          <div className="text-lg text-text_2 font-semibold ">Education</div>
          <SwipeableTemporaryDrawer
            anchor="right"
            click={
              <div className="p-2 rounded lowercase bg-color_5 hover:bg-color_7 px-3 cursor-pointer text-[white] flex items-center duration-200">
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
        {jobEducationData && jobEducationData["education"] && (
          <div className="md:flex justify-start gap-5 flex-wrap ">
            {jobEducationData["education"].map((item, index) => {
              return (
                <div
                  key={index}
                  className="border px-2 pb-3  bg-color_2 drop-shadow w-full md:w-[35%] md:my-0 my-5"
                >
                  <div className="w-full flex justify-end items-center gap-2">
                    <SwipeableTemporaryDrawer
                      anchor="right"
                      click={
                        <div className="text-text_2 hover:text-color_2 duration-200 cursor-pointer flex items-center p-1 rounded-full hover:bg-color_7">
                          <AddIcon fontSize="small" />
                        </div>
                      }
                      data={
                        <EducationData
                          edited={true}
                          educationData={jobEducationData["education"][index]}
                          index={index}
                          onClick={onClick}
                        />
                      }
                    />

                    <div
                      onClick={() => {
                        removeEducation(index);
                      }}
                      className="text-text_2 hover:text-color_2 duration-200 cursor-pointer flex items-center p-1 rounded-full hover:bg-color_7"
                    >
                      <DeleteIcon fontSize="small" />
                    </div>
                  </div>
                  <div className="mx-3 font-semibold  whitespace-nowrap  flex-wrap text-text_1 text-[17px] flex justify-start items-center gap-2">
                    {item.institution && item.institution}
                  </div>
                  <div className="mx-3 my-2 flex flex-wrap justify-start gap-2 whitespace-nowrap">
                    <div>{item.education && item.education},</div>
                    <div>{item.institution && item.institution},</div>
                  </div>
                  <div className="mx-3 flex gap-5 justify-start items-end">
                    {item.attending && (
                      <div className="font-medium whitespace-nowrap text-text_2 italic text-[15px]">
                        currently attending
                      </div>
                    )}
                    <div className="text-sm">
                      {item.clearedOn
                        ? `${
                            new Date(item.clearedOn).getMonth() + 1
                          }/${new Date(item.clearedOn).getFullYear()} `
                        : ""}
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
