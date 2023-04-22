import React from "react";
import { dateConverter, dateUnit } from "../../functions/dateConverter";
function Education(props) {
  return (
    <div className="">
      <div className="md:flex justify-between md:w-[90%] mx-2 md:mx-auto md:mt-5  mt-3 ">
        <div className="md:w-[70%]">
          <div className="font-bold text-[23px]  text-text_1 mb-2">
            Education
          </div>
          {props.portfolioData &&
            props.portfolioData.education &&
            props.portfolioData.education.map((edu, index) => {
              return (
                <div
                  key={index}
                  className={` ${
                    index === 0 ? "" : ""
                  }  border-l  border-l-color_11 border-l-[2px]  ${
                    props.portfolioData.experience.length - 1 === index
                      ? " pb-1 "
                      : "pb-4 pt-1"
                  } `}
                >
                  <div className="flex items-center">
                    <div className="w-[10px]  flex justify-center rounded-r-xl items-center h-[2px] bg-color_11"></div>
                    <div className="  text-text_1 mx-2 text-[20px] font-semibold capitalize">
                      {edu && edu.institution}
                    </div>
                  </div>
                  <div className="mx-2">
                    <div className="text-color_4 mx-3">
                      {edu && edu.education}, {edu && edu.course}
                    </div>
                    <div className="text-text_2 text-color_4 mx-3">
                      {edu &&
                        edu.from &&
                        edu.from.split("T")[0].split("-") &&
                        dateConverter(edu.from.split("T")[0].split("-")[1]) +
                          " " +
                          edu.from.split("T")[0].split("-")[0]}{" "}
                      -
                      {edu.attending ? (
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
                      {edu && edu.description}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="md:max-w-[450px] mt-2 md:mt-0">
          <div className="font-bold text-[23px]  text-text_1  ">Skills</div>
          <div className="flex flex-wrap justify-between">
            {props.portfolioData &&
              props.portfolioData.skills &&
              props.portfolioData.skills.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className="grow m-1 md:w-[200px] my-1 bg-[#fafafa] border p-2 rounded "
                  >
                    <div className="capitalize font-semibold text-text_1 rounded-md">
                      {skill.skill},{" "}
                      <span className="text-sm text-text_1">{skill.level}</span>
                      <div className="text-color_4 text-text_2 font-normal">
                        {skill.year} years, {skill.month} months
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
