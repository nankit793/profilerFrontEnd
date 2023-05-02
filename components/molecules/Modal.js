import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function BasicModal(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "100%",
    // bgcolor: "background.paper",
    // boxShadow: 24,
    p: 1,
  };
  // console.log(props.hideBackdrop);
  return (
    <div>
      <div onClick={props.onClick} className={`${props.textClass}`}>
        {props.text}
      </div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        // hideBackdrop={props.hideBackdrop}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={`rounded outline-none ${
            props.windowWidth ? props.windowWidth : "md:w-[60%]"
          } w-[90%] bg-color_2`}
          sx={style}
        >
          <div>{props.data}</div>
        </Box>
      </Modal>
    </div>
  );
}
