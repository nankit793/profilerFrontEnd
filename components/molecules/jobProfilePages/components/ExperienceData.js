import React, { useState, useEffect } from "react";
import InputField from "../../../atoms/input/InputField";
import AddIcon from "@mui/icons-material/Add";
import ButtonPrimary from "../../../atoms/input/ButtonPrimary";
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
      setCompany("");
      setCheckBox(false);
      setDesignation("");
      setError("");
      setSuccess("");
      setFrom(null);
      setTo(null);
      setRoleDesc("");
    } else {
      setSuccess("");
      setError("enter all required fields");
    }
  };
  useEffect(() => {
    if (props.edit) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              type="month"
              value={from ? from : 0}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
              //   onChange={onChange}
            />
            {!checkBox && (
              <>
                <div className="font-semibold text-text_1  mb-1 mt-3">
                  To <span className="text-[red]">*</span>
                </div>
                <input
                  className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
                  value={to ? to : 0}
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
                checked={checkBox}
                onChange={() => {
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

            <ButtonPrimary
              disabled={!(company && designation && from && (to || checkBox))}
              id={
                !(company && designation && from && (to || checkBox))
                  ? ""
                  : "operationButton"
              }
              onClick={onClick}
              disabledClass="w-full p-4 hover:bg-color_7 text-center text-[white] rounded-none bg-color_7 text-md font-semibold f"
              className="w-full p-4 justify-center bg-color_5 rounded-none hover:bg-color_7 duration-200 cursor-pointer text-[white] text-md font-semibold flex items-center d"
              text={`add experience`}
            />
          </div>
        </div>
      </>
    );
  }
  if (props.edit) {
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
            <ButtonPrimary
              disabled={!(company && designation && from && (to || checkBox))}
              id={
                !(company && designation && from && (to || checkBox))
                  ? ""
                  : "operationButton"
              }
              onClick={onClick}
              disabledClass="w-full p-4 hover:bg-color_7 text-center text-[white] rounded-none bg-color_7 text-md font-semibold f"
              className="w-full p-4 justify-center bg-color_5 rounded-none hover:bg-color_7 duration-200 cursor-pointer text-[white] text-md font-semibold flex items-center d"
              text={`update experience`}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ExperienceData;
