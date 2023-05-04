import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/InputAdornment";
import NotificationsIcon from "@mui/icons-material/Notifications";
function InputField(props) {
  if (props.multiline) {
    return (
      <>
        <div className="w-full h-fit subpixel-antialiased">
          <textarea
            id="outlined-start-adornment"
            // size="small"
            className={`${
              props.className
                ? props.className
                : " w-full outline-none h-full bg-[white]"
            }`}
            value={props.value}
            rows={props.rows ? props.rows : 8}
            required={props.required || false}
            multiline={true}
            size="small"
            // width="100%"
            onChange={props.onChange}
            label={props.label}
            name={props.name}
            variant={props.variant ? props.variant : "outlined"}
            maxLength={props.length}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          ></textarea>
        </div>
        {/* <div className="text-sm w-fit ml-auto mx-3 bg-color_4 px-4 py-1 rounded-full relative top-[-18px] text-[white]">
          {props.value ? props.value.length : 0}/{props.length}
        </div> */}
      </>
    );
  }
  if (!props.multiline) {
    return (
      <>
        {props.unit ? (
          <div className="w-full bg-color_2 subpixel-antialiased ">
            <textarea
              id=""
              className="border-color_2"
              value={props.value}
              required={props.required || false}
              type={props.type ? props.type : "text"}
              placeholder={props.placeholder}
              size="small"
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
            ></textarea>
          </div>
        ) : (
          <div className="w-full text-text_2 ">
            <input
              id=""
              className=" w-full outline-none"
              value={props.value}
              required={props.required || false}
              type={props.type ? props.type : "text"}
              placeholder={props.placeholder}
              size="small"
              fullWidth={true}
              onChange={props.onChange}
              sx={{ backgroundColor: "transparent" }}
              label={props.label}
              name={props.name}
              variant="standard"
              maxLength={props.length}
              inputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div className="font-semibold text-text_2 ">
                      {props.length}
                    </div>
                  </InputAdornment>
                ),
                // maxLength: props.length,
              }}
            />
          </div>
        )}
      </>
    );
  }
}

export default InputField;
