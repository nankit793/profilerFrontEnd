import React, { useState, useEffect } from "react";
import InputField from "../../../atoms/input/InputField";
import AddIcon from "@mui/icons-material/Add";

import UpgradeIcon from "@mui/icons-material/Upgrade";
import Checkbox from "@mui/material/Checkbox";
function ExperienceData(props) {
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [roleDesc, setRoleDesc] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onClick = () => {
    if (company && designation && from && (to || checkBox)) {
      let data;
      setError("");
      if (checkBox) {
        data = {
          company,
          designation,
          from,
          description: roleDesc,
          working: checkBox,
        };
      } else {
        data = {
          company,
          designation,
          from,
          description: roleDesc,
          to,
          working: false,
        };
      }
      if (props.edit) {
        props.onClick(data, true, props.index);
        setSuccess("Experience Updated");
      } else {
        props.onClick(data, false, false);
        setSuccess("Experience added");
      }
    } else {
      setSuccess("");
      setError("enter all required fields");
    }
  };
  if (!props.edit) {
    return (
      <>
        <div className="flex justify-between flex-col h-full">
          <div className="px-2 mt-2">
            <div className="font-semibold text-text_1  mb-1">
              Company <span className="text-[red]">*</span>{" "}
            </div>
            <input
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              maxlength={30}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              value={company}
              type="text"
              name="company"
              //   onChange={onChange}
            />
            <div className="font-semibold text-text_1  mb-1 mt-3">
              Designation <span className="text-[red]">*</span>
            </div>
            <input
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              maxlength={30}
              value={designation}
              type="text"
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
              name="designation"
              //   onChange={onChange}
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
            <div className="text-md font-semibold">
              <Checkbox
                onChange={(e) => {
                  setCheckBox(!checkBox);
                }}
                size="small"
              />
              Currently working
            </div>
            <div className="font-semibold text-text_1  mb-1 mt-3">
              Role Description
            </div>
            <InputField
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              length={300}
              multiline={true}
              value={roleDesc}
              type="text"
              name="company"
              onChange={(e) => {
                setRoleDesc(e.target.value);
              }}
            />
          </div>

          <div>
            <div className=" relative  w-full text-maroon text-center text-md ">
              {error && error}
            </div>
            <div className=" relative  w-full text-[green] text-center text-md ">
              {success && success}
            </div>
            <div
              onClick={onClick}
              className="w-full cursor-pointer hover:bg-color_5 duration-200 bg-color_7 flex items-center p-4 mt-5 text-[white] font-semibold justify-center"
            >
              {" "}
              <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
              Add
            </div>
          </div>
        </div>
      </>
    );
  }
  if (props.edit) {
    useEffect(() => {
      setCompany(props.jobExperienceData.company);
      setDesignation(props.jobExperienceData.designation);
      const fromYear = new Date(props.jobExperienceData.from).getFullYear();
      let fromMonth = new Date(props.jobExperienceData.from).getMonth() + 1;
      if (fromMonth <= 9) {
        fromMonth = "0" + fromMonth;
      }
      setFrom(`${fromYear}-${fromMonth}`);

      if (!props.jobExperienceData.working) {
        const toYear = new Date(props.jobExperienceData.to).getFullYear();
        let toMonth = new Date(props.jobExperienceData.to).getMonth() + 1;
        if (toMonth <= 9) {
          toMonth = "0" + toMonth;
        }
        setTo(`${toYear}-${toMonth}`);
      }
      setCheckBox(props.jobExperienceData.working ? true : false);
      setRoleDesc(props.jobExperienceData.description);
    }, []);

    return (
      <>
        <div className="flex justify-between flex-col h-full">
          <div className="px-2 mt-2">
            <div className="font-semibold text-text_1  mb-1">
              Company <span className="text-[red]">*</span>
            </div>
            <input
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              maxlength={30}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              value={company}
              type="text"
              name="company"
              //   onChange={onChange}
            />
            <div className="font-semibold text-text_1  mb-1 mt-3">
              Designation <span className="text-[red]">*</span>
            </div>
            <input
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              maxlength={30}
              value={designation}
              type="text"
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
              name="designation"
              //   onChange={onChange}
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
            <div className="text-md">
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
              Role Description
            </div>
            <InputField
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              length={300}
              multiline={true}
              value={roleDesc}
              type="text"
              onChange={(e) => {
                setRoleDesc(e.target.value);
              }}
              name="description"
              //   onChange={onChange}
            />
          </div>
          <div>
            <div className=" relative w-full text-maroon text-center text-md ">
              {error && error}
            </div>
            <div className=" relative w-full text-[green] text-center text-md ">
              {success && success}
            </div>

            <div
              onClick={onClick}
              className="w-full cursor-pointer hover:bg-color_5 duration-200 bg-color_7 flex items-center p-4 mt-5 text-[white] font-semibold justify-center"
            >
              <UpgradeIcon fontSize="small" sx={{ marginRight: "5px" }} />
              update
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ExperienceData;
