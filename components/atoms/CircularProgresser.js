import React from "react";
import { CircularProgress } from "@mui/material";
import { Height } from "@mui/icons-material";

function CircularProgresser() {
  return (
    <>
      <div className="flex justify-center h-min w-min items-center">
        <CircularProgress />
      </div>
    </>
  );
}

export default CircularProgresser;
