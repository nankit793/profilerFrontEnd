import React from "react";
import { TextField, InputAdornment } from "@mui/material";

function InputField(props) {
  if (props.multiline) {
    return (
      <>
        <div className="w-full bg-color_2  subpixel-antialiased  ">
          <TextField
            id=""
            className=""
            value={props.value}
            required={props.required || false}
            multiline={true}
            size="medium"
            fullWidth={true}
            onChange={props.onChange}
            label={props.label}
            name={props.name}
            variant={"outlined"}
            inputProps={{
              maxLength: props.length,
            }}
          />
        </div>
      </>
    );
  }
  if (!props.multiline) {
    return (
      <>
        {props.unit ? (
          <div className="w-full bg-color_2 subpixel-antialiased ">
            <TextField
              id=""
              className=""
              value={props.value}
              required={props.required || false}
              type={props.type ? props.type : "text"}
              placeholder={props.placeholder}
              size="medium"
              fullWidth={true}
              onChange={props.onChange}
              label={props.label}
              name={props.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {props.unit ? (
                      <div className="font-semibold text-text_2 ">
                        {props.unit}
                      </div>
                    ) : (
                      ""
                    )}
                  </InputAdornment>
                ),
                maxLength: props.length,
              }}
              variant={"outlined"}
            />
          </div>
        ) : (
          <div className="w-full bg-color_2 subpixel-antialiased ">
            <TextField
              id=""
              className=""
              value={props.value}
              required={props.required || false}
              type={props.type ? props.type : "text"}
              placeholder={props.placeholder}
              size="medium"
              fullWidth={true}
              onChange={props.onChange}
              label={props.label}
              name={props.name}
              variant={"outlined"}
              inputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {props.unit ? (
                      <div className="font-semibold text-text_2 ">
                        {props.length}
                      </div>
                    ) : (
                      ""
                    )}
                  </InputAdornment>
                ),
                maxLength: props.length,
              }}
            />
          </div>
        )}
      </>
    );
  }
}

export default InputField;
