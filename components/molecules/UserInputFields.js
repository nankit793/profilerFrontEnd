import React from "react";
import InputField from "../atoms/input/InputField";
import Checkbox from "@mui/material/Checkbox";

function UserInputFields(props) {
  return (
    <>
      <div className="">
        <div className="text-[16px] font-semibold text-color_7 ">
          {props.keyName}
        </div>
        <div className={`w-full mt-1 md:mt-0 w-full`}>
          <InputField
            length={props.length}
            value={props.value}
            type={props.type}
            unit={props.unit}
            name={props.name}
            multiline={props.multiline ? true : false}
            onChange={props.onChange}
          />
          {props.checkBox && (
            <>
              <div className="text-sm text-color_7">
                <Checkbox size="small" />
                {props.checkBoxValue}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserInputFields;
