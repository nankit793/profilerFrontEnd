import React from "react";
import { CircularProgress } from "@mui/material";
import { Height } from "@mui/icons-material";

function CircularProgresser(props) {
  return (
    <>
      <div className="flex justify-center h-min w-min items-center">
        <CircularProgress size={props.size ? props.size : 40} />
      </div>
    </>
  );
}

export default CircularProgresser;
