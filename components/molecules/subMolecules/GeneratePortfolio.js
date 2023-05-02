import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { useRouter } from "next/router";
import {
  successNotification,
  errorNotification,
} from "../../atoms/AlertMessage";
import { axiosPost } from "../../functions/axiosCall";

function GeneratePortfolio(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onGenerate = async () => {
    setLoading(true);
    const generated = await axiosPost(
      `${process.env.BACKEND_URL}/portfolio/generate`
    );
    if (generated && generated.state && generated.portfolioID) {
      successNotification("portfolio has been generated", "Redirecting");
      setSuccess(true);
      setTimeout(() => {
        router.push(`/update/jobProfile?pid=${generated.portfolioID}`);
      }, 3000);
    } else {
      errorNotification(
        generated.message ? generated.message : "Error occured"
      );
    }
    setLoading(false);
  };
  return (
    <>
      <Modal
        width="100"
        onClick={handleOpen}
        onClose={handleClose}
        textClass=""
        hideBackdrop={true}
        text={<div className="">{props.button}</div>}
        open={open}
        windowWidth="md:w-[40%]"
        data={
          <div className="mx-2">
            <div className="text-text_2">
              You can only generate 2 portfolios for free!
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
                  if (!loading && !success) {
                    onGenerate();
                  }
                }}
                className="bg-color_7 p-2  font-semibold text-[white] cursor-pointer px-5 rounded"
              >
                {loading ? "loading" : "Generate"}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default GeneratePortfolio;
