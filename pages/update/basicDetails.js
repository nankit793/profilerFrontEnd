import React, { useEffect, useState } from "react";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import ButtonPrimary from "../../components/atoms/input/ButtonPrimary";
// import UserInputFields onChange={onChange} from "../../components/molecules/UserInputFields onChange={onChange}";
// dependencies
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { authenticate } from "../../components/authentication";
import Footer from "../../components/footer/Footer";
import UserInputFields from "../../components/molecules/UserInputFields";
import * as basicUploadAction from "../../redux-next/uploadDataBasic/action";
// dependencies
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { NotificationContainer } from "react-notifications";
import CircularProgresser from "../../components/atoms/CircularProgresser";

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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-datepicker/dist/react-datepicker.css";
import {
  errorNotification,
  successNotification,
} from "../../components/atoms/AlertMessage";

function BasicDetails() {
  const [userBasicData, setUserBasicData] = useState({});
  const [loading, setLoading] = useState(false);
  // const [value, setValue] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const userData = useSelector((state) => state.basicDataReducer);
  const userBasicUpload = useSelector((state) => state.basicDataUploadReducer);

  useEffect(() => {
    const auth = async () => {
      await authenticate(loginData, registerData);
      dispatch(
        getBasicDataActions.getBasicData({
          userid: localStorage.getItem("userid"),
        })
      );
    };
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(userData);
    if (
      userData &&
      userData.userData &&
      userData.isUser == true &&
      userData.userData.status === 200
    ) {
      setUserBasicData(userData.userData.data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  useEffect(() => {
    if (userBasicData && userBasicData.dob) {
      setStartDate(userBasicData.dob ? userBasicData.dob.toString() : "");
    }
  }, [userBasicData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserBasicData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(basicUploadAction.uploadData(userBasicData));
  };

  useEffect(() => {
    if (
      userBasicUpload &&
      userBasicUpload.uploaded &&
      userBasicUpload.uploaded.status === 200
    ) {
      successNotification(userBasicUpload.uploaded.data.message, "Success");
      userBasicUpload.isUploaded = false;
      userBasicUpload.uploaded = {};
    } else if (
      userBasicUpload &&
      !userBasicUpload.uploaded &&
      userBasicUpload.uploaded.status != 200
    ) {
      errorNotification("Error Saving the details. Try Again Later", "Error");
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBasicUpload && userBasicUpload.uploaded]);

  return (
    <>
      <div className="w-full">
        <NavbarLogged />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white md:px-10 px-3 pt-3 mt-10 rounded-xl m-4 md:mx-20 pb-3">
          <div className="flex w-full justify-between items-center">
            <div className="text-text_1 font-bold my-5 text-[23px] whitespace-nowrap">
              Edit Details
            </div>
            <div className="">
              <ButtonPrimary
                type="submit"
                // onClick={handleSubmit}
                text={loading ? <CircularProgresser /> : "Save Changes"}
                // icon={<ModeEditOutlineIcon />}
                className=" bg-color_2 text-[white] hover:text-[black] h-[40px] w-[140px]  hover:bg-color_1 p-3 font-semibold text-[16px]"
              />
            </div>
          </div>
          <div className="w-full md:flex justify-between gap-5 ">
            <div className="w-full">
              <div className="text-text_1 font-semibold text-[20px] border-b py-2">
                Personal Information
              </div>
              <UserInputFields
                onChange={onChange}
                name="name"
                keyName="Name"
                value={userBasicData.name}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Phone"
                name="phone"
                value={userBasicData.phone}
              />
              {/* <UserInputFields
                onChange={onChange}
                keyName="Date Of Birth"
                name="dob"
                type="date"
                value={userBasicData.dob}
              /> */}
              <div className="flex justify-between my-3">
                <div className="text-[16px] font-semibold text-text_1 whitespace-nowrap">
                  Date Of Birth
                </div>
                <div className="flex items-center justify-between w-[60%]">
                  <DatePicker
                    className="border p-3 rounded bg-[#FBFCFC]"
                    selected={new Date(startDate)}
                    onChange={(date) => {
                      userBasicData.dob = startDate;
                      setStartDate(date);
                    }}
                  />
                  {/* <div className="flex justify-center w-full">
                    <CalendarMonthIcon />
                  </div> */}
                </div>
              </div>
              <UserInputFields
                onChange={onChange}
                keyName="About"
                name="bio"
                lenght={600}
                value={userBasicData.bio}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Slogan"
                lenght={150}
                name="slogan"
                value={userBasicData.slogan}
              />
              {/* <UserInputFields
                onChange={onChange}
                keyName="Zodiac"
                name="zodiac"
                value={userBasicData.zodiac}
              /> */}
              <div className="flex justify-between">
                <div className="text-[16px] font-semibold text-text_1 ">
                  Zodiac
                </div>

                <FormControl className="flex w-full justify-end w-[60%]  text-left">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userBasicData.zodiac ? userBasicData.zodiac : ""}
                    onChange={onChange}
                    name="zodiac"
                  >
                    <MenuItem value="aries"> Aries </MenuItem>
                    <MenuItem value="taurus">Taurus</MenuItem>
                    <MenuItem value="gemini">Gemini</MenuItem>
                    <MenuItem value="cancer">Cancer </MenuItem>
                    <MenuItem value="leo">Leo</MenuItem>
                    <MenuItem value="virgo">Virgo</MenuItem>
                    <MenuItem value="libra"> Libra</MenuItem>
                    <MenuItem value="scorpius">Scorpius</MenuItem>
                    <MenuItem value="sagittarius">Sagittarius</MenuItem>
                    <MenuItem value="capricornus">Capricornus</MenuItem>
                    <MenuItem value="aquarius ">Aquarius</MenuItem>
                    <MenuItem value="pisces ">Pisces </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <UserInputFields
                onChange={onChange}
                keyName="Height"
                name="height"
                lenght={10}
                type="number"
                value={userBasicData.height}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Weight"
                lenght={500}
                name="weight"
                type="number"
                value={userBasicData.weight}
              />
              {/* <UserInputFields
                onChange={onChange}
                keyName="Gender"
                name="gender"
                value={userBasicData.gender}
              /> */}
              <div className="flex justify-between">
                <div className="text-[16px] font-semibold text-text_1 ">
                  Gender
                </div>

                <FormControl className="flex w-full justify-end w-[60%]  text-left">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userBasicData.gender ? userBasicData.gender : ""}
                    onChange={onChange}
                    name="gender"
                  >
                    <MenuItem value="m"> Male </MenuItem>
                    <MenuItem value="f">Female</MenuItem>
                    <MenuItem value="tg">Trans Gender</MenuItem>
                    <MenuItem value="">prefer not to say</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <UserInputFields
                onChange={onChange}
                name="jobTitle"
                keyName="Job Role"
                value={userBasicData.jobTitle}
                lenght={25}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Live In"
                name="currentLocation"
                value={userBasicData.currentLocation}
                lenght={25}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Nationality"
                name="nationality"
                value={userBasicData.nationality}
              />
            </div>
            <div className="w-full">
              <div className="text-text_1 font-semibold text-[20px] border-b md:ml-4 py-2">
                Social Links
              </div>
              <div className="text-[12px] text-text_2 md:ml-4">
                (Note: Put the links to your social media is the fields)
              </div>
              <div className="md:border-l md:pl-4 ">
                <UserInputFields
                  name="facebook"
                  onChange={onChange}
                  keyName="Facebook"
                  value={userBasicData.facebook}
                />
                <UserInputFields
                  name="instagram"
                  onChange={onChange}
                  keyName="Instagram"
                  value={userBasicData.instagram}
                />
                <UserInputFields
                  onChange={onChange}
                  name="youtube"
                  keyName="YouTube"
                  value={userBasicData.youtube}
                />
                <UserInputFields
                  name="linkdn"
                  onChange={onChange}
                  keyName="Linkedin"
                  value={userBasicData.linkdn}
                />
                <UserInputFields
                  name="github"
                  onChange={onChange}
                  keyName="Github"
                  value={userBasicData.github}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
      <NotificationContainer />
    </>
  );
}

export default BasicDetails;
