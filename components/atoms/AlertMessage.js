import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

export let AlertMessage = function ({ severity, title, desc }) {
  // setTimeout(() => {
  //   return "";
  // }, 3000);

  return (
    <div className="fixed top-20 right-2">
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {desc}
        <strong>{}</strong>
      </Alert>
    </div>
  );
};
