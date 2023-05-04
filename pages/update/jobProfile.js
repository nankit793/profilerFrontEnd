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

// import InputLabel from "@mui/icons-material/InputLabel";
// import Select from "@mui/icons-material/Select";
// import MenuItem from "@mui/icons-material/MenuItem";
// import FormControlLabel from "@mui/icons-material/FormControlLabel";
// import RadioGroup from "@mui/icons-material/RadioGroup";
// import FormLabel from "@mui/icons-material/FormLabel";
// import FormControl from "@mui/icons-material/Radio";
// import Radio from "@mui/icons-material/CalendarMonth";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
    if (router.query.pid) {
      const auth = async () => {
        await authenticate(loginData, registerData);
        const caller = async () => {
          await axiosGet(
            setPortfolioData,
            `${process.env.BACKEND_URL}/portfolio/get?pid=${router.query.pid}`
          );
        };
        caller();
      };
      auth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.query.pid]);

  useEffect(() => {
    if (portfolioData && portfolioData.portfolio) {
      if (
        portfolioData &&
        portfolioData.portfolio &&
        portfolioData.portfolio.user &&
        portfolioData.portfolio.user.userid === localStorage.getItem("userid")
      ) {
        // do something
      } else {
        router.push(`/home/${localStorage.getItem("userid")}`);
      }
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
              onSave={`${process.env.BACKEND_URL}/portfolio/update`}
              buttons={[
                { name: "Overview", id: 0 },
                { name: "Details", id: 1 },
                { name: "Experience", id: 2 },
                { name: "Education", id: 3 },
                { name: "Projects & Certificates", id: 4 },
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
