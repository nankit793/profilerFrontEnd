import React from "react";

function UserField(props) {
  const handleClick = () => {
    if (props.value !== "Not provided") {
      window.open(props.value, "_blank");
    }
  };
  return (
    <div
      className={`w-full flex justify-between py-3 border-b border-dashed ${props.classFields}`}
    >
      <div className="font-semibold text-text_1">{props.keyName}</div>
      <div
        className={`text-text_2 w-[70%] text-right overflow-x-auto ${
          props.link ? "text-[blue] underline cursor-pointer" : ""
        }`}
        onClick={props.link ? handleClick : null}
      >
        {props.link ? props.keyName : props.value}
      </div>
    </div>
  );
}

export default UserField;
