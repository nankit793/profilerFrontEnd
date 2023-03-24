import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "../Popover";
// import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function BottomJobTab(props) {
  const [portfolioData, setPortfolioData] = useState(null);
  const userData = useSelector((state) => state.basicDataReducer);
  const router = useRouter();

  useEffect(() => {
    if (
      userData &&
      userData.userData &&
      userData.userData.data &&
      userData.userData.data.newData
    ) {
      setPortfolioData(userData.userData.data.newData.portfolios);
      console.log(userData.userData.data.newData.portfolios);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  return (
    <>
      {portfolioData && portfolioData.length > 0 ? (
        portfolioData.map((portfolio, index) => {
          return (
            <>
              {" "}
              <div
                className="rounded mb-5 cursor-pointer  p-3  rounded"
                key={index}
              >
                <div className="flex justify-between items-center  pr-3">
                  <div className="text-text_1 text-[20px] font-semibold text-[17px]">
                    Portfolio {index + 1}
                  </div>

                  <div className=" rounded-full text-text_1 cursor-pointer">
                    <Popover
                      data={
                        <div className="px-3 py-1 text-left">
                          <div
                            onClick={() => {
                              router.push(
                                `/update/jobProfile?pid=${portfolio._id}`
                              );
                            }}
                            id="operationButton"
                            className="text-text_1  duration-200 cursor-pointer flex items-center "
                          >
                            edit
                          </div>
                          <div
                            onClick={() => {
                              router.push(`/view/portfolio/${portfolio._id}`);
                            }}
                            id="operationButton"
                            className="py-1  duration-200 cursor-pointer flex items-center "
                          >
                            visit
                          </div>
                          <div
                            // onClick={() => {
                            //   router.push(
                            //     `/update/jobProfile?pid=${portfolio._id}`
                            //   );
                            // }}
                            id="operationButton"
                            className="text-text_1 text-[maroon] py-1 duration-200 cursor-pointer flex items-center "
                          >
                            deactivate
                          </div>
                        </div>
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
                  {portfolio && portfolio.about && portfolio.about}
                </div>
                <div className="my-3 text-text_2 flex gap-2 flex-wrap">
                  {portfolio &&
                    portfolio.skills &&
                    portfolio.skills.map((item) => {
                      return (
                        <>
                          <div className=" text-color_4">{item}</div>
                        </>
                      );
                    })}
                </div>
                <div className="  rounded-md text-[blue] text-sm cursor-pointer w-min whitespace-nowrap">
                  View Resume
                </div>
                <div className="flex justify-start gap-3 flex-wrap mt-2 text-sm">
                  <div className="text-text_1 font-semibold border-r flex justify-center items-center gap-2 pr-2">
                    <RemoveRedEyeIcon fontSize="small" />
                    <span className="font-normal text-text_2 "> 1.2K </span>
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
            </>
          );
        })
      ) : (
        <div className="text-text_1 font-semibold flex justify-center my-5">
          user has not created portfolio yet
        </div>
      )}
    </>
  );
}

export default BottomJobTab;
