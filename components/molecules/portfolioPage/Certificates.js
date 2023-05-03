import React from "react";
import { dateConverter, dateUnit } from "../../functions/dateConverter";
import Projects from "./Projects";

function Certificates(props) {
  return (
    <>
      <div className="md:flex justify-between gap-5 md:w-[90%]  md:mx-auto  mt-4">
        <div className="md:mx-0 mx-2">
          <div className="font-bold text-[23px]  text-text_1 mb-2">
            Certificates
          </div>
          {props.portfolioData &&
            props.portfolioData.certificates &&
            props.portfolioData.certificates.map((edu, index) => {
              return (
                <div
                  key={index}
                  className={` ${
                    index === 0 ? "" : ""
                  }  border-l-color_11 border-l-[2px]  ${
                    props.portfolioData.certificates.length - 1 === index
                      ? " pb-1 "
                      : "pb-4 pt-1"
                  } `}
                >
                  <div className="flex items-center">
                    <div className="w-[10px]  flex justify-center rounded-r-xl items-center h-[2px] bg-color_11"></div>
                    <div className="  text-text_1 mx-2 text-[20px] font-semibold capitalize">
                      {edu && edu.title}
                    </div>
                  </div>
                  <div className="mx-2">
                    <div className="text-color_4 mx-3">
                      {edu && edu.organization}
                    </div>
                    <div className=" text-color_4 mx-3">
                      {edu.attending ? (
                        <span className="font-semibold italic ">learning</span>
                      ) : (
                        edu &&
                        edu.recievedOn &&
                        edu.recievedOn.split("T")[0].split("-") &&
                        dateConverter(
                          edu.recievedOn.split("T")[0].split("-")[1]
                        ) +
                          " " +
                          edu.recievedOn.split("T")[0].split("-")[0]
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Projects portfolioData={props.portfolioData} />
      </div>
    </>
  );
}

export default Certificates;
