import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  errorNotification,
  successNotification,
} from "../../atoms/AlertMessage";
import Modal from "../../molecules/Modal";
import { useRouter } from "next/router";

import { CleaningServices } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import { Document, Page, pdfjs, View, Text, Image } from "react-pdf";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CircularProgresser from "../../atoms/CircularProgresser";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function Resume(props) {
  const [image, setImage] = useState("");
  const [showTab, setShowTab] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showRemoveLoader, setShowRemoveLoader] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [showUploaderMessage, setShowUploaderMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const caller = async () => {
      const userid = localStorage.getItem("userid");
      const save = await fetch("http://localhost:5000/jobResume", {
        method: "GET",
        headers: {
          userid: userid,
        },
      });
      let finalSave = await save.json();
      setShowLoader(false);
      if (save && save.status === 200 && save.statusText === "OK") {
        console.log(
          finalSave &&
            finalSave.media &&
            finalSave.media.resume &&
            finalSave.media.autoResume
        );
        if (finalSave && finalSave.media && finalSave.media.resume) {
          if (finalSave.media.autoResume) {
            setShowTab(true);
          } else {
            setShowTab(false);
          }
          setImage(finalSave.media.resume);
        } else {
          setShowTab(true);
        }
      }
    };
    caller();
  }, []);

  const onChange = (e) => {
    const file = e.target.files[0];
    if (true) {
      setImage(file);
      onClick(file);
    }
  };

  const onClick = async (image) => {
    if (image) {
      setShowUploader(true);
      setShowUploaderMessage("");
      const accesstoken = localStorage.getItem("accessToken");
      const refreshtoken = localStorage.getItem("idToken");
      const userid = localStorage.getItem("userid");
      let formData = new FormData();
      formData.append("resume", image);
      const save = await fetch(
        "http://localhost:5000/updateJobProfile/resume",
        {
          method: "PATCH",
          body: formData,
          headers: {
            accesstoken: accesstoken,
            refreshtoken: refreshtoken,
            userid: userid,
            change: "resume",
          },
        }
      );
      if (save && save.status === 200 && save.statusText === "OK") {
        setShowUploaderMessage("resume uploaded");
      } else {
        setShowUploaderMessage("error occured try again");
      }
      setShowUploader(false);
    }
  };
  const onClickRemove = async () => {
    setShowRemoveLoader(true);
    setShowUploaderMessage("");
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    let formData = new FormData();
    formData.append("resume", null);
    const save = await fetch("http://localhost:5000/updateJobProfile/resume", {
      method: "PATCH",
      body: formData,
      headers: {
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
        userid: userid,
        // change: "resume",
        removeResume: true,
      },
    });
    if (save && save.status === 200 && save.statusText === "OK") {
      setImage(null);
      setShowUploaderMessage("resume has been removed");
    } else {
      setShowUploaderMessage("failed to remove resume try again");
    }
    setShowRemoveLoader(false);
  };
  return (
    <div className="mb-20 w-full">
      <div className="flex justify-between items-center flex-wrap">
        <div className="text-lg font-semibold text-text_1 whitespace-nowrap">
          Upload Resume
        </div>
        {!showTab && (
          <div
            onClick={() => {
              setShowTab(true);
            }}
            className="p-4 cursor-pointer whitespace-nowrap bg-color_7 hover:bg-color_5 duration-200 rounded w-fit  text-[white] "
          >
            Let imProfile create your resume
          </div>
        )}
      </div>
      {!showLoader ? (
        <>
          {showTab && (
            <>
              <div className="mt-5 text-text_1 font-semibold text-lg">
                let imProfile create a resume for you
              </div>
              <div className="mt-2 text-text_2 text-md">
                Using the information provided, a PDF document can be generated
                to effectively convey the information. The document is designed
                to be visually appealing to enhance the overall look and feel of
                the document.
              </div>
              <div className="mt-5 text-text_1 font-semibold text-lg">
                Why let us create?
              </div>
              <div className="mt-2 text-text_2 text-md">
                Our platform offers a wide range of PDF formats to choose from,
                making it easy for you to find the perfect template that matches
                your personal style and career goals. The best part? You won't
                have to worry about updating your resume every time your
                information changes. Our system will do it for you. And unlike
                other services, we don't place any watermarks or logos on your
                resume, giving you complete control over your personal branding.
                In addition to being fast, easy, and free, our platform also
                offers a number of customization options to help you truly make
                your resume stand out.
              </div>
              <div className="flex gap-4 flex-wrap mt-5">
                <div
                  onClick={() => {
                    setShowTab(false);
                  }}
                  className="cursor-pointer px-5 p-3 border text-center font-semibold text-color_7 rounded bg-color_2 border-color_7"
                >
                  No, I will add my own Resume
                </div>
                <div className="cursor-pointer px-5 p-3 border text-center font-semibold  bg-color_7 rounded text-[white]">
                  Yes, I want imProfile to create my Resume
                </div>
              </div>
            </>
          )}
          {!showTab && (
            <>
              {!image && (
                <div className="mx-auto w-full md:w-[45%] drop-shadow-md mt-5  p-5 py-10 border-color_7 rounded-xl bg-color_8 ">
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="text-text_1">
                      <FileCopyIcon />
                    </div>
                    <div className="text-text_1 font-semibold mt-2">
                      Drag & Drop
                    </div>
                    <div className="text-text_1  font-semibold text-md">or</div>
                    <Button
                      variant="contained"
                      component="label"
                      className="px-5 lowercase hover:bg-color_5 drop-shadow py-2 cursor-pointer rounded bg-color_7  mt-2 text-[white]"
                    >
                      Upload resume
                      <input hidden onChange={onChange} type="file" />
                    </Button>
                  </div>
                </div>
              )}
              {image && (
                <>
                  <div className="flex flex-wrap gap-3 my-2">
                    <Modal
                      width="100"
                      onClick={handleOpen}
                      onClose={handleClose}
                      textClass=""
                      hideBackdrop={true}
                      text={
                        <div
                          // onClick={() => {
                          //   setImage(null);
                          // }}
                          className="border boder-color_5 p-3 bg-color_2 cursor-pointer rounded px-5 font-semibold text-md text-text_1"
                        >
                          {showRemoveLoader ? <CircularProgresser /> : "Remove"}
                        </div>
                      }
                      open={open}
                      data={
                        <div className="mx-2">
                          <div className="font-semibold text-text_1">
                            Your resume will be removed permanently!
                          </div>
                          <div className="flex gap-2 flex-wrap mt-5 justify-end">
                            <div
                              onClick={handleClose}
                              className="border border-color_5 p-2 font-semibold cursor-pointer text-text_1 px-5 rounded"
                            >
                              Cancel
                            </div>
                            <div
                              onClick={() => {
                                onClickRemove();
                                handleClose();
                              }}
                              className="bg-maroon p-2  font-semibold text-[white] cursor-pointer px-5 rounded"
                            >
                              Remove
                            </div>
                          </div>
                        </div>
                      }
                    />
                    <Button
                      variant="contained"
                      component="label"
                      className=" border boder-color_5  cursor-pointer text-[white] rounded px-8  capitalize bg-color_7 hover:bg-color_5 duration-100"
                    >
                      Change
                      <input hidden onChange={onChange} type="file" />
                    </Button>
                  </div>
                </>
              )}

              {showUploader && (
                <div className="flex justify-center text-text_2 items-center font-semibold">
                  uploading <CircularProgresser />
                </div>
              )}
              {showUploaderMessage && (
                <div className="text-text_2 font-semibold text-center mt-3">
                  {showUploaderMessage} <DoneIcon />
                </div>
              )}

              {!image && (
                <div className="mt-2 text-text_2 text-md font-semibold">
                  You have not selected any resume
                </div>
              )}
              <div className="textRemove">
                <div
                  className={`${image && "border"}   overflow-x-auto md:w-fit`}
                >
                  {image && (
                    <Document
                      file={image && image}
                      //    onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageIndex={0} />
                    </Document>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full flex justify-center my-10">
          <CircularProgresser />
        </div>
      )}
    </div>
  );
}

export default Resume;
