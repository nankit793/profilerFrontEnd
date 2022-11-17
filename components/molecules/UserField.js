import React from "react";

function UserField(props) {
  console.log(props);
  return (
    <div
      className={`w-full flex justify-between py-3 border-b  ${props.classFields}`}
    >
      <div className="font-semibold text-text_1">{props.keyName}</div>
      <div className="text-text_2 w-[70%] text-right overflow-x-auto ">
        {props.value}
      </div>
    </div>
  );
}

export default UserField;
