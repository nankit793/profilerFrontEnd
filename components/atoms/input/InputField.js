import React from "react";
import { TextField } from "@mui/material";

function InputField(props) {
  return (
    <>
      <div className="w-full">
        <TextField
          id="outlined-basic"
          // size="string"
          required={props.required || false}
          type={props.type}
          // placeholder={props.placeholder}
          fullWidth={true}
          onChange={props.onChange}
          label={props.label}
          name={props.name}
          variant="outlined"
        />
      </div>
    </>
  );
}

export default InputField;
