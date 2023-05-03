import React from "react";
import InputField from "../atoms/input/InputField";
import Checkbox from "@mui/material/Checkbox";

function UserInputFields(props) {
  return (
    <>
      <div className="flex flex-start border bg-color_2 rounded">
        <div className="text-text_1 flex items-center whitespace-nowrap text-sm p-2 mr-2  bg-color_8 rounded-l">
          {props.keyName}
        </div>
        <div className={`w-full md:mt-0  p-2`}>
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
