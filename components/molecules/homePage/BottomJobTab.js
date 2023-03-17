import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "../Popover";
// import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function BottomJobTab(props) {
  const dispatch = useDispatch();
  const [userBasicData, setUserBasicData] = useState(null);
  const userData = useSelector((state) => state.basicDataReducer);

  useEffect(() => {
    if (
      userData &&
      userData.userData &&
      userData.userData.data &&
      userData.userData.data.newData
    ) {
      setUserBasicData(userData.userData.data.newData.jobProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  return (
    <>
      {userBasicData && userBasicData.generated ? (
        <div className="rounded ">
          <div className="flex justify-between items-center  pr-3">
            <div className="text-text_1 text-[20px] font-semibold">
              Portfolio
            </div>
            <div className=" rounded-full text-text_1 cursor-pointer">
              <Popover
                data={
                  <>
                    <div
                      // onClick={() => {
                      //   removeEducation(index);
                      // }}
                      id="operationButton"
                      className="text-text_1  duration-200 cursor-pointer flex items-center p-1 "
                    >
                      edit
                    </div>
                    <div
                      // onClick={() => {
                      //   removeEducation(index);
                      // }}
                      id="operationButton"
                      className="text-color_7  duration-200 cursor-pointer flex items-center p-1 "
                    >
                      visit
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
          <div className="my-2 text-text_2">
            {userBasicData && userBasicData.about && userBasicData.about}
          </div>
          <div className="my-3 text-text_2 flex gap-2 flex-wrap">
            {userBasicData &&
              userBasicData.skills &&
              userBasicData.skills.map((item) => {
                return (
                  <>
                    <div className=" border rounded-full text-text_2 bg-color_2 px-5 py-[3px]">
                      {item}
                    </div>
                  </>
                );
              })}
          </div>
          <div className="  rounded-md text-[blue] text-sm cursor-pointer w-min whitespace-nowrap">
            View Resume
          </div>
          <div className="flex justify-start gap-3 flex-wrap mt-2">
            <div className="text-text_1 font-semibold border-r flex justify-center items-center gap-2 pr-2">
              <RemoveRedEyeIcon fontSize="small" />
              <span className="font-normal text-text_2"> 1.2K </span>
            </div>
            <div className="text-text_1 font-semibold border-r flex justify-center items-center gap-2 pr-2">
              <DownloadIcon fontSize="small" />{" "}
              <span className="font-normal text-text_2"> 11 </span>
            </div>
            <div className="text-text_1 font-semibold flex justify-center items-center gap-2 pr-2">
              <FavoriteIcon fontSize="small" />{" "}
              <span className="font-normal text-text_2"> 10 </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-text_1 font-semibold flex justify-center my-5">
          user has not created portfolio yet
        </div>
      )}
    </>
  );
}

export default BottomJobTab;
