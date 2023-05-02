import React from "react";
import { dateConverter, dateUnit } from "../../functions/dateConverter";

function Projects(props) {
  return (
    <>
      <div className="md:mx-0 mx-2 mt-4">
        <div className="font-bold text-right text-[23px]  text-text_1 mb-2">
          Projects
        </div>
        {props.portfolioData &&
          props.portfolioData.projects &&
          props.portfolioData.projects.map((edu, index) => {
            return (
              <div
                key={index}
                className={` ${
                  index === 0 ? "" : ""
                }  border-r  text-right border-r-color_11 border-r-[2px]  ${
                  props.portfolioData.certificates.length - 1 === index
                    ? " pb-1 "
                    : "pb-4 pt-1"
                } `}
              >
                <div className="flex justify-end  items-center">
                  <div className="  text-text_1 mx-2 text-[20px] font-semibold capitalize">
                    {edu && edu.title}
                  </div>
                  <div className="w-[10px]  flex justify-center rounded-r-xl items-center h-[2px] bg-color_11"></div>
                </div>
                <div className="text-text_2 text-[16px] mx-3">
                  {edu && edu.desc}
                </div>
                <div className="text-text_2 text-color_4 mx-3">
                  {edu &&
                    edu.from &&
                    edu.from.split("T")[0].split("-") &&
                    dateConverter(edu.from.split("T")[0].split("-")[1]) +
                      " " +
                      edu.from.split("T")[0].split("-")[0]}{" "}
                  -
                  {edu.working ? (
                    <span className="font-semibold italic "> present</span>
                  ) : (
                    edu &&
                    edu.to &&
                    edu.to.split("T")[0].split("-") &&
                    dateConverter(edu.to.split("T")[0].split("-")[1]) +
                      " " +
                      edu.to.split("T")[0].split("-")[0]
                  )}
                </div>
                <div className="text-text_2 text-[16px] mx-3">
                  {edu && edu.url ? "click here" : ""}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Projects;
