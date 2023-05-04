import React, { useState, useEffect } from "react";
import ProjectsData from "./components/ProjectsData";
import Popover from "../Popover";
import CertificateData from "./components/CertificateData";

// mui
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SwipeableTemporaryDrawer from "../Drawer";
import AddIcon from "@mui/icons-material/Add";

function Projects(props) {
  const [jobData, setJobData] = useState();

  useEffect(() => {
    setJobData(props.data);
  }, [props.data]);
  const onClick = (data, edited, index, name) => {
    if (!edited) {
      jobData[name].push(data);
    } else {
      jobData[name][index] = data;
    }
    setJobData((prevState) => ({
      ...prevState,
      [name]: jobData[name],
    }));

    props.onChange({
      name: name,
      value: jobData[name],
    });
  };
  const removeEducation = (index, name) => {
    jobData[name].splice(index, 1);
    setJobData((prevState) => ({
      ...prevState,
      [name]: jobData[name],
    }));
    props.onChange({
      name: name,
      value: jobData[name],
    });
  };
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between whitespace-nowrap">
          <div className="text-text_2 font-semibold text-lg ">Projects</div>
          <div className="h-[2px] bg-color_6 w-full rounded-full mx-5 md:block hidden"></div>
          <SwipeableTemporaryDrawer
            anchor="right"
            click={
              <div className="py-2 lowercase mb-2 flex items-center px-3 bg-color_5 rounded-full text-[white] whitespace-nowrap w-min">
                <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
                add projects
              </div>
            }
            data={<ProjectsData onClick={onClick} />}
          />
        </div>
        {jobData && jobData["projects"] && jobData["projects"].length === 0 && (
          <div className="flex justify-center text-text_1 font-semibold mt-10 mb-20">
            you have not added any projects
          </div>
        )}
        <div className="my-10">
          {jobData && jobData["projects"] && (
            <div className="md:flex justify-start gap-5 flex-wrap ">
              {jobData["projects"].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="max-h-[400px] border h-min  px-3 pb-3 bg-color_2 drop-shadow w-full md:w-[45%] md:my-0 my-5"
                  >
                    <div className="flex justify-between items-center pt-2">
                      <div className="w-full flex justify-between flex-wrap items-center  gap-2">
                        <div className="font-semibold text-text_1 text-[17px]">
                          {item.title && item.title}
                        </div>
                      </div>
                      <Popover
                        data={
                          <>
                            <SwipeableTemporaryDrawer
                              anchor="right"
                              click={
                                <div className="text-text_2 hover:text-color_4 duration-200 cursor-pointer flex items-center p-1 ">
                                  Edit
                                </div>
                              }
                              data={
                                <ProjectsData
                                  edited={true}
                                  educationData={jobData["projects"][index]}
                                  index={index}
                                  onClick={onClick}
                                />
                              }
                            />
                            <div
                              id="operationButton"
                              onClick={() => {
                                removeEducation(index, "projects");
                              }}
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

                    <div className=" my-1 text-text_2">
                      <div>{item.desc && item.desc},</div>
                      {item.url && (
                        <div
                          onClick={() => {
                            window.open(item.url, "_blank");
                          }}
                          className="cursor-pointer text-[blue] text-sm underline "
                        >
                          visit
                        </div>
                      )}
                    </div>
                    <div className=" flex gap-5 justify-start items-end text-text_2">
                      {item.attending && (
                        <div className="font-medium whitespace-nowrap text-text_2 italic text-[15px]">
                          present
                        </div>
                      )}
                      <div className="text-sm flex">
                        {item.from
                          ? `${new Date(item.from).getMonth() + 1}/${new Date(
                              item.from
                            ).getFullYear()} `
                          : "start"}{" "}
                        {item.working && (
                          <div className="font-medium whitespace-nowrap text-text_2 italic text-[15px]">
                            - present
                          </div>
                        )}
                        {!item.working && (
                          <>
                            {item.to
                              ? `- ${
                                  new Date(item.to).getMonth() + 1
                                }/${new Date(item.to).getFullYear()} `
                              : "- end"}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5 items-center whitespace-nowrap">
        <div className="text-text_2 font-semibold text-lg">Certificates</div>
        <div className="h-[2px] bg-color_6 w-full rounded-full mx-5 md:block hidden"></div>

        <SwipeableTemporaryDrawer
          anchor="right"
          click={
            <div className="py-2 lowercase mb-2 flex items-center px-3 bg-color_5 rounded-full text-[white] whitespace-nowrap w-min">
              <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
              add certificates
            </div>
          }
          data={<CertificateData onClick={onClick} />}
        />
      </div>
      {jobData &&
        jobData["certificates"] &&
        jobData["certificates"].length === 0 && (
          <div className="flex justify-center text-text_1 font-semibold mt-10 mb-20">
            you have not added any certificates
          </div>
        )}

      <div className="my-10">
        {jobData && jobData["certificates"] && (
          <div className="md:flex justify-start gap-5 flex-wrap ">
            {jobData["certificates"].map((item, index) => {
              return (
                <div
                  key={index}
                  className="border h-min  px-2 pb-3 bg-color_2 drop-shadow w-full md:w-[45%] md:my-0 my-5"
                >
                  <div className="text-right">
                    <div className="flex justify-between items-center">
                      <div className="mx-2 font-semibold text-text_1 text-[17px] mt-2 ">
                        {item.title && item.title}
                      </div>
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
                                <CertificateData
                                  edited={true}
                                  educationData={jobData["certificates"][index]}
                                  index={index}
                                  onClick={onClick}
                                />
                              }
                            />
                            <div
                              id="operationButton"
                              onClick={() => {
                                removeEducation(index, "certificates");
                              }}
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
                  </div>
                  <div className="mx-2 font-semibold text-text_1 text-[17px]">
                    <span className="text_text_1 font-normal text-sm">
                      from
                    </span>{" "}
                    {item.organization && item.organization}
                  </div>
                  <div className="mx-2 my-1 text-text_2">
                    {/* {!item.attending && (
                      <div className="underline text-sm cursor-pointer">
                        image preview
                      </div>
                    )} */}
                  </div>
                  <div className="mx-3 flex gap-5 justify-start items-end text-text_2">
                    {item.attending && (
                      <div className="font-medium  whitespace-nowrap text-text_2 italic text-[15px]">
                        currently learning
                      </div>
                    )}
                    {!item.attending && (
                      <div className="text-sm flex">
                        Achieved on{" "}
                        {item.recievedOn
                          ? `${
                              new Date(item.recievedOn).getMonth() + 1
                            }/${new Date(item.recievedOn).getFullYear()} `
                          : "start"}{" "}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-color_6 px-3  md:mb-0 mb-10">
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

export default Projects;
