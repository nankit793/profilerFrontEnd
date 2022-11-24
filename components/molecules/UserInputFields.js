import React from "react";
import InputField from "../atoms/input/InputField";
function UserInputFields(props) {
  return (
    <>
      <div className="w-full my-3 flex justify-between ">
        <div className="text-[16px] font-semibold text-text_1 ">
          {props.keyName}
        </div>
        <div className="w-[60%]">
          <InputField
            value={props.value}
            type={props.type}
            name={props.name}
            onChange={props.onChange}
          />
        </div>
      </div>
    </>
  );
}

export default UserInputFields;
