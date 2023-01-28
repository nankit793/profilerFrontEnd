import React, { useState, useEffect } from "react";
import UserInputFields from "../UserInputFields";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "../../atoms/input/InputField";
function BasicInfo(props) {
  const [jobBasicData, setJobBasicData] = useState();
  const [skill, setSkill] = useState("");
  const [hobby, setHobby] = useState("");
  const [showAddField, setShowAddField] = useState(false);
  const [addField, setAddField] = useState({
    name: "",
    value: "",
  });
  useEffect(() => {
    setJobBasicData(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    setJobBasicData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    props.onChange({
      name: name,
      value: value,
    });
  };
  const handleCloseTag = (tag, el) => {
    const newArr = [];
    jobBasicData[el].forEach((element, index) => {
      if (jobBasicData[el].indexOf(tag) !== index) {
        newArr.push(element);
      }
    });
    const e = {
      target: {
        name: el,
        value: newArr,
      },
    };
    onChange(e);
  };

  const addTag = (key, val) => {
    if (val && jobBasicData[key].length < 10) {
      jobBasicData[key].push(val);
      const e = {
        target: {
          name: key,
          value: jobBasicData[key],
        },
      };
      onChange(e);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="text-text_2 font-semibold text-lg mb-5">
          Basic Details
        </div>
      </div>
      {/* <div className='font-semibold capitalize text-[20px] flex justify-center'>Basic Information</div> */}
      <div className=" md:flex justify-between w-full gap-5 ">
        <div className="w-full md:w-[50%] flex flex-col gap-5">
          <div>
            <div className="font-semibold text-text_1 text-md mb-1">
              Offical Mail
            </div>
            <input
              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
              maxlength={30}
              value={jobBasicData && jobBasicData.mail ? jobBasicData.mail : ""}
              type="mail"
              name="mail"
              onChange={onChange}
            />
          </div>
          <div className="">
            <div className="font-semibold text-color_7 text-md">Skills:</div>
            <div className="w-full rounded mt-1 bg-color_6 text-color_7 flex flex-wrap ">
              <div className="w-full flex justify-between align-center">
                <div className="m-2">
                  {jobBasicData &&
                    jobBasicData.skills &&
                    jobBasicData.skills.length}
                  /10
                </div>
                {jobBasicData &&
                  jobBasicData.skills &&
                  jobBasicData.skills.length >= 10 && (
                    <div className="flex justify-between align-center m-2 font-semibold text-sm text-text_1 ">
                      <div>maximum limit reached</div>
                    </div>
                  )}
              </div>
              {jobBasicData && jobBasicData.skills ? (
                <>
                  {jobBasicData.skills.map((skill, index) => {
                    return (
                      <div
                        key={index}
                        className=" bg-color_2 px-5 h-min py-2  drop-shadow-sm rounded-3xl m-2"
                      >
                        <div className="flex justify-center align-center">
                          {skill}
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              handleCloseTag(skill, "skills");
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 15, marginLeft: 1 }} />{" "}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              {jobBasicData &&
                jobBasicData.skills &&
                jobBasicData.skills.length < 10 && (
                  <div
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTag("skills", skill);
                        setSkill("");
                      }
                    }}
                    className="w-full drop-shadow m-3 rounded-3xl bg-white border flex"
                  >
                    <input
                      type="text"
                      value={skill}
                      onChange={(val) => {
                        setSkill(val.target.value);
                      }}
                      placeholder="add a skill..."
                      className="w-full p-2 outline-none focus:outline-bg_color_5 pl-6 rounded-l-3xl "
                    />
                    <div
                      onClick={() => {
                        addTag("skills", skill);
                        setSkill("");
                      }}
                      className="px-5 bg-color_5 font-bold text-lg cursor-pointer rounded-3xl m-1 flex justify-center align-center text-white"
                    >
                      +
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="">
            <div className="font-semibold text-color_7 text-md ">Hobbies:</div>
            <div className="w-full rounded bg-color_6 text-color_7 flex flex-wrap mt-1">
              <div className="w-full flex justify-between">
                <div className="m-2">
                  {jobBasicData &&
                    jobBasicData.hobbies &&
                    jobBasicData.hobbies.length}
                  /10
                </div>
                {jobBasicData &&
                  jobBasicData.hobbies &&
                  jobBasicData.hobbies.length >= 10 && (
                    <div className="flex justify-between align-center font-semibold text-sm m-2 text-text_1 ">
                      <div>maximum limit reached</div>
                    </div>
                  )}
              </div>
              {jobBasicData && jobBasicData.hobbies ? (
                <>
                  {jobBasicData.hobbies.map((hobby, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className=" bg-color_2 px-5 h-min py-2  drop-shadow-sm rounded-3xl m-2"
                        >
                          <div className="flex justify-center align-center">
                            {hobby}
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                handleCloseTag(hobby, "hobbies");
                              }}
                            >
                              <CloseIcon sx={{ fontSize: 15, marginLeft: 1 }} />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              {jobBasicData &&
                jobBasicData.hobbies &&
                jobBasicData.hobbies.length < 10 && (
                  <div
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTag("hobbies", hobby);
                        setHobby("");
                      }
                    }}
                    className="w-full m-3 drop-shadow rounded-3xl bg-white border flex"
                  >
                    <input
                      type="text"
                      placeholder="add a hobby..."
                      value={hobby}
                      onChange={(val) => {
                        setHobby(val.target.value);
                      }}
                      className="w-full p-2 outline-none focus:outline-bg_color_5 pl-6 rounded-l-3xl "
                    />
                    <div
                      onClick={() => {
                        addTag("hobbies", hobby);
                        setHobby("");
                      }}
                      className="px-5 bg-color_5 font-bold cursor-pointer text-lg rounded-3xl m-1 flex justify-center align-center text-white"
                    >
                      +
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] mt-5 md:mt-0">
          <div className="font-semibold text-text_1 text-md mb-1">
            Message to Hiring Manager
          </div>
          <InputField
            length={600}
            className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
            value={jobBasicData && jobBasicData.about ? jobBasicData.about : ""}
            type="text"
            multiline={true}
            placeholder="Hello Hiring Manager....."
            name="about"
            onChange={onChange}
            //   onChange={onChange}
          />
          {/* <div className="mb-5 md:mt-0 mt-5">
            <div className="font-semibold text-color_7 text-md">
              Achievements:
            </div>
            <div className="w-full mt-3 rounded  bg-color_3 text-color_7 p-2">
              {jobBasicData && jobBasicData.achievements ? (
                <>
                  {jobBasicData.achievements.map((el, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-white rounded my-2 p-2 w-full"
                      >
                        <div className="text-text_2 ">{el.title}</div>
                      </div>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              <div className=" bg-color_2 px-3 py-2 font-semibold drop-shadow-sm rounded-3xl m-3 hover:drop-shadow-lg duration-1000 cursor-pointer">
                Add <AddIcon sx={{ fontSize: 15, marginLeft: 1 }} />{" "}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="bg-color_6 px-3">
        <div className="w-full border-b  text-color_5  text-[22px] font-semibold mt-10 ">
          Tips
        </div>
        <div className="w-full text-color_4 text-[15px] my-2 pb-2">
          <div>1) usefull tips for user will be provided here</div>
          <div>2) usefull tips for user will be provided here</div>
          <div>3) usefull tips for user will be provided here</div>
          <div>4) usefull tips for user will be provided here</div>
        </div>
      </div>
    </>
  );
}

export default BasicInfo;
