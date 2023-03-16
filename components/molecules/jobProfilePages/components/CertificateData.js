import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import InputField from "../../../atoms/input/InputField";
import ButtonPrimary from "../../../atoms/input/ButtonPrimary";
function CertificateData(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [recievedOn, setRecievedOn] = useState(false);
  // const [attending, setAttending] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  const onSubmit = () => {
    if (title && organization && (checkBox || recievedOn)) {
      let data;
      if (checkBox) {
        data = {
          title,
          organization,
          attending: checkBox,
        };
      } else {
        data = {
          title,
          organization,
          recievedOn,
          // image
        };
      }
      setError("");
      if (!props.edited) {
        setSuccess("project added");
        props.onClick(data, false, false, "certificates");
      } else {
        setSuccess("project updated");
        props.onClick(data, true, props.index, "certificates");
      }
    } else {
      setSuccess("");
      setError("Enter all required field");
    }
  };
  useEffect(() => {
    if (props.edited) {
      setTitle(props.educationData.title && props.educationData.title);
      setCheckBox(
        props.educationData.attending && props.educationData.attending
      );
      setOrganization(
        props.educationData.organization && props.educationData.organization
      );
      const attendYear = new Date(props.educationData.recievedOn).getFullYear();
      let attendMonth = new Date(props.educationData.recievedOn).getMonth() + 1;
      if (attendMonth <= 9) {
        attendMonth = "0" + attendMonth;
      }
      setRecievedOn(`${attendYear}-${attendMonth}`);
      // setUrl(
      //   props.educationData &&
      //     props.educationData.url &&
      //     props.educationData.url
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-2 mt-2 h-full">
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
          Organization <span className="text-[red]">*</span>{" "}
        </div>
        <input
          className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
          maxLength={30}
          onChange={(e) => {
            setOrganization(e.target.value);
          }}
          value={organization}
          type="text"
          name="title"
        />
        {!checkBox && (
          <>
            <div className="font-semibold text-text_1  mb-1 mt-3">
              Recieved on <span className="text-[red]">*</span>
            </div>
            <input
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              value={recievedOn}
              type="month"
              onChange={(e) => {
                setRecievedOn(e.target.value);
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
          Currently learning
        </div>
        {!checkBox && (
          <div className="p-2 bg-color_5 text-[white] text-center mt-2 cursor-pointer font-semibold rounded">
            image input here
          </div>
        )}
      </div>
      <div className="flex justify-center p-3 text-maroon">
        {error && error}
      </div>
      <div className="flex justify-center p-3 text-[green]">
        {success && success}
      </div>
      <ButtonPrimary
        disabled={!(title && organization && (checkBox || recievedOn))}
        id="operationButton"
        onClick={onSubmit}
        disabledClass="w-full p-4 justify-center  rounded-none bg-color_6 hover:bg-color_6 text-md font-semibold flex items-center"
        className="w-full p-4 justify-center bg-color_5 rounded-none hover:bg-color_7 duration-200 cursor-pointer text-[white] text-md font-semibold flex items-center d"
        text={props.edited ? `update certificate` : `add certificate`}
      />
    </>
  );
}

export default CertificateData;
