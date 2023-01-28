import React, { useEffect, useState } from "react";

// import { Scrollbars } from "react-custom-scrollbars";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function UpdateProfileSideNav(props) {
  return (
    <>
      <div className="  h-full bg-color_3 overflow-h-scroll">
        {/* <div className="flex justify-between items-center px-3 py-3 drop-shadow-sm" >
                    <div className="h-[100px] w-[100px] rounded-full bg-[blue]"></div>
                    <div className="flex flex-col justify-between text-right">
                        <div className="font-bold text-[20px]">
                            {props.data.userBasicData.name ? props.data.userBasicData.name : ""}
                        </div>
                        <div className="font-semibold text-[15px] text-text_1">
                            {props.data.userBasicData.userid ? props.data.userBasicData.userid : ""}
                        </div>
                    </div>
                </div> */}
        <div className=" mx-3 pt-3">
          <div
            className={`w-full rounded text-color_7 cursor-pointer hover:bg-color_3 px-3 py-5 font-semibold text-[16px] `}
          >
            Overview
          </div>

          {props.data.buttons.map((item) => {
            return (
              <>
                <div
                  onClick={() => {
                    props.onClicker(item);
                  }}
                  className={`  ${
                    props.selectedPage && props.selectedPage.id === item.id
                      ? "bg-color_5 text-[white]"
                      : "bg-color_3 text-color_7  "
                  } duration-100  w-full cursor-pointer hover:bg-color_5 hover:text-[white] rounded px-3 py-5 my-1 
                         font-semibold text-[16px]`}
                >
                  {item.name}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UpdateProfileSideNav;
