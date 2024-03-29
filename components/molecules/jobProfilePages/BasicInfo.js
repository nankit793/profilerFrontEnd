import React, { useState, useEffect } from "react";
import UserInputFields from "../UserInputFields";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "../../atoms/input/InputField";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { FormControl, MenuItem, Select } from "@mui/material";

function BasicInfo(props) {
  const [jobBasicData, setJobBasicData] = useState();
  const [skill, setSkill] = useState({
    skill: "",
    level: "beginner",
    month: "1",
    year: "0",
  });
  const [hobby, setHobby] = useState("");
  const [showAddField, setShowAddField] = useState(false);
  const [showSkeletonSkills, setShowSkeletonSkills] = useState(true);
  const [showSkeletonHobbies, setShowSkeletonHobbies] = useState(true);

  const [addField, setAddField] = useState({
    name: "",
    value: "",
  });
  useEffect(() => {
    setJobBasicData(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (jobBasicData && jobBasicData["skills"]) {
      setShowSkeletonSkills(false);
    }
    if (jobBasicData && jobBasicData["hobbies"]) {
      setShowSkeletonHobbies(false);
    }
  }, [jobBasicData]);

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
  const skillChange = (el) => {
    setSkill((prev) => ({
      ...prev,
      [el.target.name]: el.target.value,
    }));
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
            <div className="font-semibold text-text_1 text-md">Skills</div>

            <div className="w-full rounded-t-md mt-1 bg-color_8  flex flex-wrap">
              <div className="w-full pt-2 flex justify-between align-center">
                <div className="mx-4 font-semibold text-text_2">
                  {jobBasicData &&
                    jobBasicData.skills &&
                    `${jobBasicData.skills.length}/10`}
                </div>
                {jobBasicData &&
                  jobBasicData.skills &&
                  jobBasicData.skills.length >= 10 && (
                    <div className="flex justify-between align-center m-2 font-semibold text-sm text-text_1 ">
                      <div>maximum limit reached</div>
                    </div>
                  )}
              </div>
              {showSkeletonSkills && (
                <Box sx={{ width: "100%" }} className="p-2">
                  <Skeleton animation="wave" />
                </Box>
              )}
              {jobBasicData && jobBasicData.skills ? (
                <>
                  {jobBasicData.skills.map((skill, index) => {
                    return (
                      <div
                        key={index}
                        className=" bg-color_2 px-3 h-min py-2  drop-shadow rounded m-2"
                      >
                        <div className=" flex justify-center text-text_1 items-center">
                          <div>
                            <div className=" text-[20px] text-text_1">
                              {skill.skill}
                            </div>
                            <div className="text-text_2">{skill.level}</div>
                            <div>
                              {skill.year} years, {skill.month} months
                            </div>
                          </div>
                          <div
                            className="cursor-pointer absolute top-0 right-2"
                            onClick={() => {
                              handleCloseTag(skill, "skills");
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 15, marginLeft: 1 }} />
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
                  <>
                    <div
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && skill.skill) {
                          addTag("skills", skill);
                          setSkill({
                            skill: "",
                            level: "beginner",
                            month: 1,
                            year: 0,
                          });
                        }
                      }}
                      className="w-full drop-shadow-sm p-2 bg-white border "
                    >
                      <div className="whitespace-nowrap pt-2 min-w-[50%] flex justify-start mx-2 gap-3 items-center">
                        <div>Skill:</div>
                        <input
                          type="text"
                          maxLength={30}
                          value={skill.skill}
                          name="skill"
                          onChange={skillChange}
                          placeholder="add a skill..."
                          className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
                        />
                      </div>
                      <div className="grow flex justify-start  my-2 items-center gap-3 mx-2">
                        <div>Level:</div>
                        <div>
                          <FormControl className="min-w-[150px]  bg-color_2 flex w-full justify-end w-full   text-left">
                            <Select
                              labelId="demo-simple-select-label"
                              // label="Sort by"
                              id="demo-simple-select"
                              name="level"
                              className="h-[45px] pr-[20px] "
                              onChange={skillChange}
                              value={skill.level}
                            >
                              <MenuItem value="beginner"> beginner </MenuItem>
                              <MenuItem value="intermediate">
                                intermediate
                              </MenuItem>
                              <MenuItem value="expert">expert</MenuItem>
                              {/* <MenuItem value="">prefer not to say</MenuItem> */}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className="mx-2">
                        <div>experience in</div>
                        <div className="flex flex-wrap whitespace-nowrap gap-3 ">
                          <div className=" flex min-w-[20%] grow justify-start mx-2 gap-3 items-center">
                            <div>Years:</div>
                            <input
                              type="Number"
                              value={skill.year}
                              name="year"
                              max={2}
                              onChange={skillChange}
                              placeholder="0"
                              className="border w-full rounded p-3 focus:outline-color_1 focus:outline"
                            />
                          </div>
                          <div className="grow  flex justify-start mx-2 gap-3 items-center">
                            <div>Months:</div>
                            <FormControl className=" bg-color_2 flex w-full justify-end   text-left">
                              <Select
                                labelId="demo-simple-select-label"
                                // label="Sort by"
                                id="demo-simple-select"
                                name="month"
                                className="h-[45px] pr-[20px] "
                                onChange={skillChange}
                                value={skill.month}
                              >
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="6">6</MenuItem>
                                <MenuItem value="7">7</MenuItem>
                                <MenuItem value="8">8</MenuItem>
                                <MenuItem value="9">9</MenuItem>
                                <MenuItem value="10">10</MenuItem>
                                <MenuItem value="11">11</MenuItem>
                                <MenuItem value="12">12</MenuItem>
                                {/* <MenuItem value="">prefer not to say</MenuItem> */}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          if (skill.skill) {
                            addTag("skills", skill);
                            setSkill({
                              skill: "",
                              level: "beginner",
                              month: 1,
                              year: 0,
                            });
                          }
                        }}
                        className="py-2 bg-color_5 text-lg cursor-pointer rounded-3xl my-2 flex justify-center align-center text-white"
                      >
                        Add
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
          {/* <div className="">
            <div className="font-semibold text-color_7 text-md ">Hobbies:</div>
            <div className="w-full rounded-xl bg-color_8 flex flex-wrap mt-1 drop-shadow p-2">
              <div className="w-full flex justify-between">
                <div className="mx-4 font-semibold text-text_1">
                  {jobBasicData &&
                    jobBasicData.hobbies &&
                    `${jobBasicData.hobbies.length}/10`}
                </div>
                {jobBasicData &&
                  jobBasicData.hobbies &&
                  jobBasicData.hobbies.length >= 10 && (
                    <div className="flex justify-between align-center font-semibold text-sm m-2 text-text_1 ">
                      <div>maximum limit reached</div>
                    </div>
                  )}
              </div>
              {showSkeletonHobbies && (
                <Box sx={{ width: "100%" }} className="p-2">
                  <Skeleton animation="wave" />
                </Box>
              )}
              {jobBasicData && jobBasicData.hobbies ? (
                <>
                  {jobBasicData.hobbies.map((hobby, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className=" bg-color_2 px-5 h-min py-2  drop-shadow rounded-3xl m-2"
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
                    className="w-full m-3 drop-shadow-sm rounded-3xl bg-white border flex"
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
          </div> */}
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
