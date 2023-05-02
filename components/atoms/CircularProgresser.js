import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

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
