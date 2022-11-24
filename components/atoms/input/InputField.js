import React from "react";
import { TextField } from "@mui/material";

function InputField(props) {
  return (
    <>
      <div className="w-full bg-[#FBFCFC]  subpixel-antialiased  ">
        <TextField
          id=""
          className=""
          value={props.value}
          required={props.required || false}
          type={props.type ? props.type : "text"}
          // placeholder={props.placeholder}
          multiline={true}
          size="medium"
          fullWidth={true}
          onChange={props.onChange}
          label={props.label}
          name={props.name}
          variant={"outlined"}
        />
      </div>
    </>
  );
}

export default InputField;
