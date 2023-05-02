import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function UpdateProfileSideNav(props) {
  return (
    <>
      <div className="  h-full bg-color_3 ">
        <div className=" mr-5 pt-3 ">
          {props.data.buttons.map((item) => {
            return (
              <>
                <div
                  onClick={() => {
                    props.onClicker(item);
                  }}
                  className={`  ${
                    props.selectedPage && props.selectedPage.id === item.id
                      ? "bg-color_5 text-[white]  pl-7"
                      : "bg-color_3 text-text_1 pl-2 "
                  } duration-200  w-full cursor-pointer py-4 hover:bg-color_5  hover:text-[white] rounded-r-full my-3 
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
