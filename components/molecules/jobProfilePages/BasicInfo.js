import React, { useState, useEffect } from "react";
import UserInputFields from "../UserInputFields";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "../../atoms/input/InputField";
function BasicInfo(props) {
  const [jobBasicData, setJobBasicData] = useState();
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
    jobBasicData[el].forEach((element) => {
      if (element._id !== tag._id) {
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
  return (
    <>
      {/* <div className='font-semibold capitalize text-[20px] flex justify-center'>Basic Information</div> */}
      <div className=" md:flex justify-between w-full gap-5 ">
        <div className="w-full md:w-[50%] flex flex-col gap-5">
          <div>
            <div className="font-semibold text-md mb-2">Offical Mail:</div>
            <InputField
              length={30}
              value={jobBasicData && jobBasicData.mail ? jobBasicData.mail : ""}
              type="mail"
              name="mail"
              onChange={onChange}
            />
          </div>
          <div className="">
            <div className="font-semibold text-color_7 text-md">Skills:</div>
            <div className="w-full rounded mt-3 bg-color_3 text-color_7 flex flex-wrap duration-200">
              {jobBasicData && jobBasicData.skills ? (
                <>
                  {jobBasicData.skills.map((skill, index) => {
                    return (
                      <div
                        key={index}
                        className=" bg-color_2 px-5 h-min py-2  drop-shadow-sm rounded-3xl m-2"
                      >
                        <div className="flex justify-center align-center">
                          {skill.title}
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
              <div className=" bg-color_2 px-3 hover:px-5 py-2 font-semibold drop-shadow-sm rounded-3xl m-3 hover:drop-shadow-md duration-100 cursor-pointer">
                Add <AddIcon sx={{ fontSize: 15, marginLeft: 1 }} />
              </div>
            </div>
          </div>
          <div className="">
            <div className="font-semibold text-color_7 text-md ">Hobbies:</div>
            <div className="w-full rounded bg-color_3 text-color_7 flex flex-wrap mt-3">
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
                            {hobby.title}
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
              <div className=" bg-color_2 px-3 hover:px-5 py-2 font-semibold drop-shadow-sm rounded-3xl m-3 hover:drop-shadow-md duration-100 cursor-pointer">
                Add <AddIcon sx={{ fontSize: 15, marginLeft: 1 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] mt-5 md:mt-0">
          <div className="font-semibold text-md mb-2">About:</div>
          <InputField
            length={600}
            value={jobBasicData && jobBasicData.about ? jobBasicData.about : ""}
            type="text"
            multiline={true}
            name="about"
            onChange={onChange}
          />
          <div></div>
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
      <div className="w-full border-b text-color_4 text-[20px] mt-10">Tips</div>
      <div className="w-full text-color_4 text-[15px] my-5 ">
        <div>1) usefull tips for user will be provided here</div>
        <div>2) usefull tips for user will be provided here</div>
        <div>3) usefull tips for user will be provided here</div>
        <div>4) usefull tips for user will be provided here</div>
      </div>
    </>
  );
}

export default BasicInfo;
