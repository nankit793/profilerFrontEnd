import React, { useEffect, useState } from "react";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import ButtonPrimary from "../../components/atoms/input/ButtonPrimary";

import { authenticate } from "../../components/authentication";
import Footer from "../../components/footer/Footer";
import UserInputFields from "../../components/molecules/UserInputFields";
import CircularProgresser from "../../components/atoms/CircularProgresser";
import UpdatePage from "../../components/molecules/UpdatePage";
// mui dependencies
// dependencies
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { Scrollbars } from "react-custom-scrollbars";
import Projects from "../../components/molecules/jobProfilePages/Projects";
import BasicInfo from "../../components/molecules/jobProfilePages/BasicInfo";
import Education from "../../components/molecules/jobProfilePages/Education";
import Experience from "../../components/molecules/jobProfilePages/Experience";
import Certificates from "../../components/molecules/jobProfilePages/Certificates";

import { NotificationContainer } from "react-notifications";

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

function JobProfile() {
  const [userBasicData, setUserBasicData] = useState({});
  const [userid, setUserid] = useState("");
  const [nameUser, setUserName] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.basicDataReducer);
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);

  useEffect(() => {
    if (
      userData &&
      userData.userData &&
      userData.isUser == true &&
      userData.userData.status === 200 &&
      userData.userData.data.newData &&
      userData.userData.data.newData.newData
    ) {
      setUserBasicData(userData.userData.data.newData.newData);
      setUserid(userData.userData.data.newData.userid);
      setUserName(userData.userData.data.newData.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  useEffect(() => {
    const auth = async () => {
      await authenticate(loginData, registerData);
      dispatch(
        getBasicDataActions.getBasicData({
          userid: localStorage.getItem("userid"),
          requirement: "jobProfile",
        })
      );
    };
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    const { name, value } = e;
    console.log(name, value);
    setUserBasicData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const pages = [
    { pageData: <div>Overview</div>, id: 0 },
    {
      pageData: (
        <BasicInfo
          onChange={onChange}
          userid={userid}
          data={userBasicData ? userBasicData : ""}
        />
      ),
      id: 1,
    },
    {
      pageData: <Experience data={userBasicData ? userBasicData : ""} />,
      id: 2,
    },
    {
      pageData: <Education data={userBasicData ? userBasicData : ""} />,
      id: 3,
    },
    { pageData: <Projects data={userBasicData ? userBasicData : ""} />, id: 4 },
    {
      pageData: <Certificates data={userBasicData ? userBasicData : ""} />,
      id: 5,
    },
  ];
  return (
    <>
      <div className="md:h-screen  flex flex-col justify-start md:overflow-y-hidden">
        <div className="">
          <div className="w-full">
            <NavbarLogged />
          </div>
        </div>
        {userBasicData && (
          <div className="h-[100%] ">
            <UpdatePage
              data={userBasicData}
              onSave="http://localhost:5000/updateJobProfile"
              buttons={[
                { name: "Basic Information", id: 1 },
                { name: "Experience", id: 2 },
                { name: "Education", id: 3 },
                { name: "Projects", id: 4 },
                { name: "Certificates", id: 5 },
              ]}
              pages={pages}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default JobProfile;
