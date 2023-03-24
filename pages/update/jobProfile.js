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
import Resume from "../../components/molecules/jobProfilePages/Resume";
import { NotificationContainer } from "react-notifications";
import Overview from "../../components/molecules/jobProfilePages/Overview";
import {
  errorNotification,
  successNotification,
} from "../../components/atoms/AlertMessage";

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
import { useRouter } from "next/router";
import { axiosGet } from "../../components/functions/axiosCall";
function JobProfile() {
  const [portfolioData, setPortfolioData] = useState({});
  const [userid, setUserid] = useState("");
  const [nameUser, setUserName] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.basicDataReducer);
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.pid);
    if (router.query.pid) {
      const caller = async () => {
        await axiosGet(
          setPortfolioData,
          `http://localhost:5000/portfolio/get?pid=${router.query.pid}`
        );
      };
      caller();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.query.pid]);

  useEffect(() => {
    if (router.query.pid) {
      const auth = async () => {
        await authenticate(loginData, registerData);
        const caller = async () => {
          await axiosGet(
            setPortfolioData,
            `http://localhost:5000/portfolio/get?pid=${router.query.pid}`
          );
        };
        caller();
      };
      auth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.query.pid]);

  useEffect(() => {
    if (
      (portfolioData &&
        portfolioData.portfolio &&
        portfolioData.portfolio.user &&
        portfolioData.portfolio.user.userid !==
          localStorage.getItem("userid")) ||
      !portfolioData.state
    ) {
      // router.push(`/home/${localStorage.getItem("userid")}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioData]);

  const onChange = (e) => {
    const { name, value } = e;
    setPortfolioData((prevState) => ({
      portfolio: {
        ...portfolioData.portfolio,
        [name]: value,
      },
    }));
  };

  const pages = [
    { pageData: <Overview />, id: 0 },
    {
      pageData: (
        <BasicInfo
          onChange={onChange}
          userid={userid}
          data={portfolioData.portfolio ? portfolioData.portfolio : {}}
        />
      ),
      id: 1,
    },
    {
      pageData: (
        <Experience
          onChange={onChange}
          data={portfolioData.portfolio ? portfolioData.portfolio : {}}
        />
      ),
      id: 2,
    },
    {
      pageData: (
        <Education
          onChange={onChange}
          data={portfolioData.portfolio ? portfolioData.portfolio : {}}
        />
      ),
      id: 3,
    },
    {
      pageData: (
        <Projects
          onChange={onChange}
          data={portfolioData.portfolio ? portfolioData.portfolio : {}}
        />
      ),
      id: 4,
    },
    {
      pageData: (
        <Resume
          onChange={onChange}
          pid={router.query.pid}
          data={portfolioData ? portfolioData : ""}
        />
      ),
      id: 5,
    },
  ];
  return (
    <>
      <div className="pt-14 md:h-screen  flex flex-col justify-start md:overflow-y-hidden">
        {portfolioData && (
          <div className="h-[100%] ">
            <UpdatePage
              bodyData={true}
              data={portfolioData.portfolio}
              request="PATCH"
              headers={{
                pid: router.query.pid,
              }}
              onSave="http://localhost:5000/portfolio/update"
              buttons={[
                { name: "Overview", id: 0 },
                { name: "Details", id: 1 },
                { name: "Experience", id: 2 },
                { name: "Education", id: 3 },
                { name: "Projects & Certificates", id: 4 },
                // { name: "Certificates", id: 5 },
                { name: "Resume", id: 5 },
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
