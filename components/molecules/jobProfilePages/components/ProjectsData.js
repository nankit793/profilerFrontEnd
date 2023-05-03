import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import InputField from "../../../atoms/input/InputField";
import ButtonPrimary from "../../../atoms/input/ButtonPrimary";

function ProjectsData(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [desc, setDesc] = useState("");

  const onSubmit = () => {
    if (title && from && (to || checkBox)) {
      let data;
      if (checkBox) {
        data = {
          title,
          url,
          desc,
          from,
          working: checkBox,
        };
      } else {
        data = {
          title,
          from,
          desc,
          url,
          to,
        };
      }
      setError("");
      if (!props.edited) {
        setSuccess("project added");
        props.onClick(data, false, false, "projects");
      } else {
        setSuccess("project updated");
        props.onClick(data, true, props.index, "projects");
      }
    } else {
      setSuccess("");
      setError("Enter all required field");
    }
  };

  useEffect(() => {
    if (props.edited) {
      setTitle(props.educationData.title && props.educationData.title);
      setCheckBox(props.educationData.working && props.educationData.working);
      setDesc(props.educationData.desc && props.educationData.desc);
      const attendYear = new Date(props.educationData.to).getFullYear();
      let attendMonth = new Date(props.educationData.to).getMonth() + 1;
      if (attendMonth <= 9) {
        attendMonth = "0" + attendMonth;
      }
      setTo(`${attendYear}-${attendMonth}`);
      const attendYearFrom = new Date(props.educationData.from).getFullYear();
      let attendMonthFrom = new Date(props.educationData.from).getMonth() + 1;
      if (attendMonthFrom <= 9) {
        attendMonthFrom = "0" + attendMonthFrom;
      }
      setFrom(`${attendYearFrom}-${attendMonthFrom}`);
      setUrl(
        props.educationData &&
          props.educationData.url &&
          props.educationData.url
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="mx-2 mt-2">
        <div className="font-semibold text-text_1  mb-1">
          Title <span className="text-[red]">*</span>{" "}
        </div>
        <input
          className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
          maxLength={30}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          name="title"
        />

        <div className="font-semibold text-text_1 mt-2 mb-1">
          URL or link of project
        </div>
        <input
          className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
          type="text"
          name="url"
        />
        <div className="font-semibold text-text_1  mb-1 mt-3">
          From <span className="text-[red]">*</span>
        </div>
        <input
          className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
          value={from}
          type="month"
          onChange={(e) => {
            setFrom(e.target.value);
          }}
          name="from"
          //   onChange={onChange}
        />
        {!checkBox && (
          <>
            <div className="font-semibold text-text_1  mb-1 mt-3">
              To <span className="text-[red]">*</span>
            </div>
            <input
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              value={to}
              type="month"
              onChange={(e) => {
                setTo(e.target.value);
              }}
              name="to"
              //   onChange={onChange}
            />
          </>
        )}
        <div className="text-sm font-semibold text-text_1">
          <Checkbox
            checked={checkBox}
            onChange={(e) => {
              setCheckBox(!checkBox);
            }}
            size="small"
          />
          Currently working
        </div>
        <div className="font-semibold text-text_1  mb-1 mt-3">
          Project Description
        </div>
        <InputField
          className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
          length={300}
          multiline={true}
          value={desc}
          type="text"
          name="company"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </div>
      <div className="">
        <div className="flex justify-center p-3 text-maroon">
          {error && error}
        </div>
        <div className="flex justify-center p-3 text-[green]">
          {success && success}
        </div>
        <ButtonPrimary
          disabled={!(title && from && (to || checkBox))}
          id={!(title && from && (to || checkBox)) ? "" : "operationButton"}
          onClick={onSubmit}
          disabledClass="w-full p-4 hover:bg-color_7 text-center text-[white] rounded-none bg-color_7 text-md font-semibold f"
          className="w-full p-4 justify-center bg-color_5 rounded-none hover:bg-color_7 duration-200 cursor-pointer text-[white] text-md font-semibold flex items-center d"
          text={props.edited ? `update project` : `add project`}
        />
      </div>
    </div>
  );
}

export default ProjectsData;
