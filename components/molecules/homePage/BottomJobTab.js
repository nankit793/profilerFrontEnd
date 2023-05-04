import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "../Popover";
// import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs, View, Text, Image } from "react-pdf";
import { useRouter } from "next/router";
import { ifLogged } from "../../ifLogged";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import {
  errorNotification,
  successNotification,
} from "../../atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";

function BottomJobTab(props) {
  const [portfolioData, setPortfolioData] = useState(null);
  const [resume, setResume] = useState("");

  const [viewPortfolioResume, setViewPortfolioResume] = useState({
    id: "",
    show: false,
    error: false,
    loader: true,
  });
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  const viewResume = async (id) => {
    if (id) {
      setViewPortfolioResume({
        id: id,
        error: false,
        loader: true,
      });
      try {
        const save = await fetch(
          `${process.env.BACKEND_URL}/jobResume?pid=${id}`,
          {
            method: "GET",
          }
        );

        let finalSave = await save.json();
        if (
          save &&
          save.status === 200 &&
          finalSave &&
          finalSave.media &&
          finalSave.media.resume
        ) {
          setViewPortfolioResume({
            id: id,
            error: false,
            loader: false,
          });
          setResume(finalSave.media.resume);
        } else {
          setResume("");
          setViewPortfolioResume({
            id: id,
            error: true,
            loader: false,
          });
        }
      } catch (error) {
        setResume("");
        setViewPortfolioResume({
          id: id,
          error: true,
          loader: false,
        });
      }
    } else {
      errorNotification("try again later");
    }
  };

  return (
    <>
      {portfolioData && portfolioData.length > 0 ? (
        portfolioData.map((portfolio, index) => {
          return (
            <>
              {" "}
              <div
                className="bg-color_2 border drop-shadow-sm mb-5 cursor-pointer  p-3  rounded"
                key={index}
              >
                <div className="flex justify-between items-center  pr-3">
                  <div
                    onClick={() => {
                      router.push(`/view/portfolio/${portfolio._id}`);
                    }}
                    className="text-text_1 font-semibold text-[17px]"
                  >
                    {portfolio.title ? portfolio.title : "Portfolio"}
                  </div>

                  <div className=" rounded-full text-text_1 cursor-pointer">
                    {ifLogged() &&
                      router.query.uid === localStorage.getItem("userid") && (
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
                                  router.push(
                                    `/view/portfolio/${portfolio._id}`
                                  );
                                }}
                                id="operationButton"
                                className="py-1  duration-200 cursor-pointer flex items-center "
                              >
                                visit
                              </div>
                              {/* <div
                                // onClick={() => {
                                //   router.push(
                                //     `/update/jobProfile?pid=${portfolio._id}`
                                //   );
                                // }}
                                id="operationButton"
                                className="text-text_1 text-[maroon] py-1 duration-200 cursor-pointer flex items-center "
                              >
                                deactivate
                              </div> */}
                            </div>
                          }
                          text={
                            <div className="">
                              <MoreHorizIcon />
                            </div>
                          }
                        />
                      )}
                  </div>
                </div>
                <div className="my-2 text-text_2">
                  {portfolio && portfolio.about && portfolio.about}
                </div>
                <div className="my-1 text-text_2 flex gap-2 flex-wrap">
                  {portfolio &&
                    portfolio.skills &&
                    portfolio.skills.map((item) => {
                      return (
                        <>
                          {item && (
                            <div className="border rounded-full bg-color_5 text-color_2 px-5 py-1">
                              {item.skill}
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
                {viewPortfolioResume.id === portfolio._id &&
                resume &&
                !viewPortfolioResume.error &&
                !viewPortfolioResume.loader ? (
                  <div
                    onClick={() => {
                      setViewPortfolioResume({
                        id: "",
                        error: false,
                        loader: true,
                      });
                    }}
                    className="rounded-full bg-color_7 hover:bg-color_5 duration-200 px-5 py-2 text-color_2 mt-3 text-sm cursor-pointer w-min whitespace-nowrap"
                  >
                    close resume
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      viewResume(portfolio._id);
                    }}
                    className="rounded-full bg-color_7 hover:bg-color_5 duration-200 px-5 py-2 text-color_2 mt-3 text-sm cursor-pointer w-min whitespace-nowrap"
                  >
                    view resume
                  </div>
                )}
                {viewPortfolioResume.id === portfolio._id && (
                  <>
                    {viewPortfolioResume.error
                      ? "try again later"
                      : viewPortfolioResume.loader
                      ? "loading"
                      : resume && (
                          <div className="w-full flex justify-start textRemove">
                            <div className="border overflow-x-auto rounded">
                              <Document
                                file={resume && resume}
                                //    onLoadSuccess={onDocumentLoadSuccess}
                              >
                                <Page pageIndex={0} />
                              </Document>
                            </div>
                          </div>
                        )}
                  </>
                )}
                {/* <div className="flex justify-start gap-3 flex-wrap mt-2 text-sm">
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
                </div> */}
              </div>
            </>
          );
        })
      ) : (
        <div className="text-text_1 font-semibold flex justify-center my-5">
          user has not created portfolio yet
        </div>
      )}
      <NotificationContainer />
    </>
  );
}

export default BottomJobTab;
