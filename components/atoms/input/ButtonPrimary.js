import React from "react";

import { Button } from "@mui/material";

function ButtonPrimary(props) {
  return (
    <>
      <div className="">
        <Button
          variant="text"
          // disabled={true}
          //   color={props.color}
          //   startIcon={`${props.startIcon}` || false}
          //   endIcon={`${props.endIcon}` || false}
          fullWidth={true}
          className={`capitalize ${props.className}`}
          onClick={props.onClick ? props.onClick : null}
          disableFocusRipple={props.disableFocusRipple || true}
          type={props.type}
        >
          {props.icon}
          {props.text}
        </Button>
      </div>
    </>
  );
}

export default ButtonPrimary;
