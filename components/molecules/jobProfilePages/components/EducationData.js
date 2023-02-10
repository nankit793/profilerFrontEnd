import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ButtonPrimary from "../../../atoms/input/ButtonPrimary";
function EducationData(props) {
  const [institution, setInstitution] = useState("");
  const [education, setEducation] = useState("none");
  const [clearedOn, setClearedOn] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [course, setCourse] = useState("");
  const [from, setFrom] = useState(null);

  const onSubmit = () => {
    if (
      institution &&
      education &&
      education !== "none" &&
      course &&
      (clearedOn || checkBox) &&
      from
    ) {
      const data = {
        institution,
        education,
        attending: checkBox,
        from,
        to: clearedOn,
        course,
      };
      // const el = document.getElementsByName("operationButton");
      // el.id = "operationButton";
      // el.click();
      setError("");
      if (!props.edited) {
        setSuccess("education added");
        props.onClick(data, false, false);
      } else {
        setSuccess("education updated");
        props.onClick(data, true, props.index);
      }
    } else {
      setSuccess("");
      setError("Enter all required field");
    }
  };
  useEffect(() => {
    if (props.edited) {
      setInstitution(
        props.educationData.institution && props.educationData.institution
      );
      setEducation(
        props.educationData.education && props.educationData.education
      );
      setCheckBox(
        props.educationData.attending && props.educationData.attending
      );
      const attendYear = new Date(props.educationData.to).getFullYear();
      let attendMonth = new Date(props.educationData.to).getMonth() + 1;
      if (attendMonth <= 9) {
        attendMonth = "0" + attendMonth;
      }
      setClearedOn(`${attendYear}-${attendMonth}`);
      const attendYearFrom = new Date(props.educationData.from).getFullYear();
      let attendMonthFrom = new Date(props.educationData.from).getMonth() + 1;
      if (attendMonthFrom <= 9) {
        attendMonthFrom = "0" + attendMonthFrom;
      }
      setFrom(`${attendYearFrom}-${attendMonthFrom}`);
    }
    setCourse(
      props.educationData &&
        props.educationData.course &&
        props.educationData.course
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className="mx-2 mt-2">
          <div className="font-semibold text-text_1  mb-1">
            Institution <span className="text-[red]">*</span>{" "}
          </div>
          <input
            className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
            maxlength={50}
            onChange={(e) => {
              setInstitution(e.target.value);
            }}
            value={institution}
            type="text"
            name="institution"
            //   onChange={onChange}
          />
          <div className="font-semibold mt-2 text-text_1  mb-1">
            Education <span className="text-[red]">*</span>{" "}
          </div>
          <div>
            <FormControl className="flex w-full justify-end w-full mt-1 text-left">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={education}
                onChange={(e) => {
                  setEducation(e.target.value);
                  console.log(e.target.value);
                }}
                name="zodiac"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="B.A">B.A</MenuItem>
                <MenuItem value="B.A.M.S">B.A.M.S</MenuItem>
                <MenuItem value="B.B.M">B.B.M</MenuItem>
                <MenuItem value="B.C.A">B.C.A </MenuItem>
                <MenuItem value="B.Com">B.Com</MenuItem>
                <MenuItem value="B.E">B.E</MenuItem>
                <MenuItem value="B.Ed">B.Ed</MenuItem>
                <MenuItem value="B.F.A">B.F.A</MenuItem>
                <MenuItem value="B.H.M.S">B.H.M.S</MenuItem>
                <MenuItem value="B.Sc">B.Sc</MenuItem>
                <MenuItem value="B.Tech">B.Tech</MenuItem>
                <MenuItem value="B.U.M.S">B.U.M.S</MenuItem>
                <MenuItem value="B.V.A">B.V.A</MenuItem>
                <MenuItem value="BACHELORS DEGREE">BACHELORS DEGREE</MenuItem>
                <MenuItem value="BHM">BHM</MenuItem>
                <MenuItem value="BMS">BMS</MenuItem>
                <MenuItem value="Graduation">Graduation</MenuItem>
                <MenuItem value="LLB">LLB</MenuItem>
                <MenuItem value="M.A">M.A</MenuItem>
                <MenuItem value="M.B.A">M.B.A</MenuItem>
                <MenuItem value="M.C.A">M.C.A</MenuItem>
                <MenuItem value="M.Com">M.Com</MenuItem>
                <MenuItem value="M.E">M.E</MenuItem>
                <MenuItem value="M.Sc">M.Sc</MenuItem>
                <MenuItem value="M.Tech">M.Tech</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="font-semibold mt-2 text-text_1  mb-1">
            Course <span className="text-[red]">*</span>
          </div>
          <input
            className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
            maxlength={30}
            onChange={(e) => {
              setCourse(e.target.value);
            }}
            placeholder="Ex: Computer Science,  Human Resources"
            value={course}
            type="text"
            name="company"
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
          <div className="font-semibold mt-2 text-text_1  mb-1">
            {checkBox && `Expected to clear `}
            {!checkBox && `Cleared on`}
            <span className="text-[red]">*</span>
          </div>
          <input
            className="border w-full rounded p-3  mt-1 focus:outline-color_1 focus:outline"
            value={clearedOn}
            type="month"
            onChange={(e) => {
              setClearedOn(e.target.value);
            }}
            name="from"
          />

          <div className="text-md font-semibold">
            <Checkbox
              checked={checkBox}
              onChange={(e) => {
                setCheckBox(!checkBox);
              }}
              size="small"
            />
            attending
          </div>
        </div>
        <div className="">
          <div className="flex justify-center p-3 text-maroon">
            {error && error}
          </div>
          <div className="flex justify-center p-3 text-[green]">
            {success && success}
          </div>
          <ButtonPrimary
            disabled={
              !(
                institution &&
                education !== "none" &&
                course &&
                (clearedOn || checkBox) &&
                from
              )
            }
            id="operationButton"
            onClick={onSubmit}
            disabledClass="w-full p-4 justify-center  rounded-none bg-color_6 hover:bg-color_6 text-md font-semibold flex items-center"
            className="w-full p-4 justify-center bg-color_5 rounded-none hover:bg-color_7 duration-200 cursor-pointer text-[white] text-md font-semibold flex items-center d"
            text={props.edited ? `update education` : `add education`}
          />
          {/* {props.edited ? `update education` : `add education`} */}
          {/* </ButtonPrimary> */}
        </div>
      </div>
    </>
  );
}

export default EducationData;
