import React from "react";
import { Alert } from "@mui/material";

function Alert() {
  return (
    <Alert severity={props.severity}>
      <AlertTitle>{props.title}</AlertTitle>
      {props.desc}
      <strong>{props.strong}</strong>
    </Alert>
  );
}

export default Alert;
