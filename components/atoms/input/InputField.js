import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
function InputField(props) {
  if (props.multiline) {
    return (
      <>
        <div className="w-full  h-fit subpixel-antialiased">
          <TextField
            id="outlined-start-adornment"
            className="bg-[white]"
            value={props.value}
            required={props.required || false}
            multiline={true}
            size="medium"
            fullWidth={true}
            onChange={props.onChange}
            label={props.label}
            name={props.name}
            variant={props.variant ? props.variant : "outlined"}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
              maxLength: props.length,
            }}
          />
          <div className="text-sm w-fit ml-auto mx-3 bg-color_4 px-4 py-1 rounded-full relative top-[-18px] text-[white]">
            {props.value ? props.value.length : 0}/{props.length}
          </div>
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
          <div className="w-full bg-color_2 text-color_9">
            <TextField
              id=""
              className="font-semibold"
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
                    <div className="font-semibold text-text_2 ">
                      {props.length}
                    </div>
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
