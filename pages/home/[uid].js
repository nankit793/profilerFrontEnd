import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import { useDispatch } from "react-redux";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import { logout } from "../../components/logout";
import Footer from "../../components/footer/Footer";
import verifyId from "../../redux-next/otp";
import { errorNotification } from "../../components/atoms/AlertMessage";
import ProfileListDesktop from "../../components/molecules/ProfileListDesktop";
// dependencies
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Avatar } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import CircularProgresser from "../../components/atoms/CircularProgresser";
import UserField from "../../components/molecules/UserField";

import { Scrollbars } from "react-custom-scrollbars";
// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Uid(props) {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [isUserFound, setIsUserFound] = useState(false);
  const [userid, setUserid] = useState("");
  const [userBasicData, setUserBasicData] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.basicDataReducer);
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    const accesstoken = localStorage.getItem("accessToken");
    const userid = localStorage.getItem("userid");
    if (token && accesstoken && userid) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
    const uid = router.query.uid;
    setUserid(uid);
  }, [setIsLoggedInUser, router, router.query]);

  useEffect(() => {
    const effectHandler = async () => {
      if (userid) {
        dispatch(getBasicDataActions.getBasicData({ userid: userid }));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    effectHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch && userid]);
  useEffect(() => {
    if (userData && userData.userData && userData.userData.data) {
      if (
        userData.userData.status === 200 &&
        userData.userData.data.registered
      ) {
        setUserBasicData(userData.userData.data.newData);
        setIsUserFound(true);
      } else if (!userData.userData.data.registered) {
        setIsUserFound(false);
      }
      setProfileLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  return (
    <>
      <div className="flex flex-col max-w-[1500px] h-[100%] align-center justify-beween">
        <div className="fixed w-full z-10">
          {!isLoggedInUser && <Navbar />}
          {isLoggedInUser && <NavbarLogged />}
        </div>
        {profileLoading && (
          <div className="w-full h-screen flex justify-center items-center">
            <CircularProgresser />
          </div>
        )}
        {!profileLoading && isUserFound && (
          <div className="md:px-10 px-2 md:flex mt-20 justify-between gap-5 my-5">
            <div className="h-full md:w-[35%] w-[100%] drop-shadow scrollbar-hide overflow-y-auto bg-white rounded-t-xl  flex flex-col justify-start items-center">
              <div className="w-[100px] h-[100px] rounded-full border my-3 bg-color_4"></div>
              <div className=" w-full text-center px-4 ">
                <div className="text-color_5 text-xl font-semibold">
                  {userBasicData.name ? userBasicData.name.toUpperCase() : ""}
                </div>
                <div className="text-color_4 text-[18px] ">
                  <EmailIcon sx={{ fontSize: 20, marginRight: "10px" }} />
                  {userBasicData.userid ? userBasicData.userid : ""}
                </div>

                <div
                  className="text-text_2 text-lg font-semibold"
                  onClick={() => {
                    router.push("/update/basicDetails");
                  }}
                >
                  {userBasicData.userid === localStorage.getItem("userid") ? (
                    <>
                      <div className="w-full text-[16px] rounded-3xl flex items-center justify-center text-color_5 cursor-pointer border border-color_5 p-2 my-3">
                        <EditIcon sx={{ fontSize: 18, marginRight: "5px" }} />
                        Edit Profile
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="w-full ">
                <div className="w-full  px-3  ">
                  {/* <div className="w-full border my-2 rounded drop-shadow-sm">
                    <div className="text-sm pl-3  bg-color_5 font-bold text-[white] rounded-t py-3 text-left w-full">
                      INFORMATION
                    </div>
                    <div className="px-3">
                      <UserField
                        keyName="Zodiac"
                        value={userBasicData.zodiac ? userBasicData.zodiac : ""}
                      />
                      <UserField
                        keyName="Height"
                        value={userBasicData.height ? userBasicData.height : ""}
                      />
                      <UserField
                        keyName="Weight"
                        value={userBasicData.weight ? userBasicData.weight : ""}
                      />
                    </div>
                  </div> */}
                  {/* <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <div className="text-sm font-semibold mx-3 text-color_2 text-left w-full">
                        BASIC INFORMATION
                      </div>

                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <UserField keyName="Age" value="22" />
                      <UserField
                        keyName="Gender"
                        value={userBasicData.gender ? userBasicData.gender : ""}
                      />
                      <UserField
                        keyName="Nationality"
                        value={
                          userBasicData.nationality
                            ? userBasicData.nationality
                            : ""
                        }
                      />
                      <UserField
                        keyName="Zodiac"
                        value={userBasicData.zodiac ? userBasicData.zodiac : ""}
                      />
                      <UserField
                        keyName="Height"
                        value={userBasicData.height ? userBasicData.height : ""}
                      />
                      <UserField
                        keyName="Weight"
                        value={userBasicData.weight ? userBasicData.weight : ""}
                      />
                    </Typography>
                  </AccordionDetails>
                </Accordion> */}

                  <div className="w-full border my-2 rounded ">
                    <div className="text-sm pl-3 bg-color_5 font-bold text-[white] rounded-t py-3 text-left w-full">
                      SOCIAL LINKS
                    </div>
                    {!userBasicData.facebook &&
                      !userBasicData.instagram &&
                      !userBasicData.youtube &&
                      !userBasicData.github &&
                      !userBasicData.linkdn && (
                        <div className="text-text_2  font-semibold text-center text-sm mt-2">
                          no social media links
                        </div>
                      )}
                    <div className="my-3 grid grid-cols-3 flex gap-4 cursor-pointer">
                      {userBasicData.facebook ? (
                        <div
                          className="mx-auto"
                          onClick={() => {
                            window.open(userBasicData.facebook, "_blank");
                          }}
                        >
                          <Avatar
                            alt="Facebook"
                            src="/images/facebook.png"
                            sx={{ width: 25, height: 25 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {userBasicData.instagram ? (
                        <div
                          className="mx-auto"
                          onClick={() => {
                            window.open(userBasicData.instagram, "_blank");
                          }}
                        >
                          <Avatar
                            alt="Instagram"
                            src="/images/insta.png"
                            sx={{ width: 27, height: 27 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {userBasicData.youtube ? (
                        <div
                          className="mx-auto"
                          onClick={() => {
                            window.open(userBasicData.youtube, "_blank");
                          }}
                        >
                          <Avatar
                            alt="Youtube"
                            src="/images/youtube.png"
                            sx={{ width: 27, height: 27 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {userBasicData.github ? (
                        <div
                          className="mx-auto"
                          onClick={() => {
                            window.open(userBasicData.github, "_blank");
                          }}
                        >
                          <Avatar
                            alt="Github"
                            src="/images/github.png"
                            sx={{ width: 25, height: 25 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {userBasicData.linkdn ? (
                        <div
                          className="mx-auto"
                          onClick={() => {
                            window.open(userBasicData.linkdn, "_blank");
                          }}
                        >
                          <Avatar
                            alt="Linkedin"
                            src="/images/linkedin.png"
                            sx={{ width: 25, height: 25 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="w-full border my-2 rounded">
                    <div className="text-sm pl-3 bg-color_5 font-bold text-[white] rounded-t py-3 text-left w-full">
                      THOUGHTS
                    </div>
                    <div className="px-3 text-color_4 py-2">
                      {userBasicData && userBasicData.slogan
                        ? userBasicData.slogan
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* side panel end  */}
            <div className="w-full flex  flex-col justify-start gap-5 h-full">
              <div className=" md:flex justify-start gap-5 drop-shadow">
                <div className=" w-ful md:w-9/12 rounded-t-xl md:mt-0 mt-5  bg-[white]">
                  <div className="w-full bg-color_5 text-sm rounded-t-xl font-bold text-[white] p-3">
                    ABOUT ME
                  </div>
                  <div className="text-[15px] text-color_4 p-4">
                    {userBasicData.bio ? userBasicData.bio : ""}
                  </div>
                </div>
                <div className="w-full md:w-3/12 rounded-t-xl md:mt-0 mt-5  bg-[white] drop-shadow">
                  <div className="w-full bg-color_5 text-sm rounded-t-xl font-bold text-[white] p-3">
                    INFORMATION
                  </div>
                  <div className="text-[15px] items-center text-color_4  flex flex-col justify-between ">
                    <div className="">
                      <Avatar
                        alt="Facebook"
                        src="/images/birthday.png"
                        sx={{ width: 100, height: 100 }}
                      />
                    </div>
                    <div className="z-10 font-bold">Birth date</div>
                    <div className="z-10 font-bold">
                      {userBasicData.nationality
                        ? userBasicData.nationality
                        : ""}

                      {userBasicData.age ? userBasicData.age : ""}
                      {userBasicData.currentLocation
                        ? userBasicData.currentLocation
                        : ""}
                      {userBasicData.gender ? userBasicData.gender : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:flex  gap-5 ">
                <div className="w-full md:w-[50%] bg-[white] rounded-b-xl drop-shadow">
                  <div className="text-sm bg-color_5 p-3 font-bold text-[white]">
                    MY PORTFOLIOS
                  </div>
                  <div className="flex justify-between px-3 mx-3 py-2 bg-color_3 my-2 rounded">
                    <div className="text-color_5 text-sm font-semibold">
                      Type
                    </div>
                    <div className="flex justify-between w-[40%]">
                      <div className="text-color_5 text-sm font-semibold">
                        Status
                      </div>
                      <div className="text-color_5 text-sm font-semibold">
                        Options
                      </div>
                    </div>
                  </div>
                  <div className=" h-[200px] scrollbar-hide overflow-y-scroll">
                    <ProfileListDesktop isDesktop={true} userid={userid} />
                  </div>
                  {/* data here  */}
                </div>
                <div className="w-full  md:mt-0 mt-5 md:w-[50%] bg-[white] rounded-b-xl drop-shadow">
                  <div className="text-sm bg-color_5 p-3 font-bold text-[white]">
                    INSIGHTS
                  </div>
                  {/* data here  */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* user was not found error  */}
      {!profileLoading && !isUserFound && (
        <>
          <div className="h-screen w-full flex items-center justify-center flex-col">
            <div className="">
              <NoAccountsIcon />
            </div>
            <div className="font-bold text-[20px] text-color_2 ">
              User was not found
            </div>
          </div>
        </>
      )}
      <div className="mt-10 ">
        <Footer />
      </div>
    </>
  );
}

export default Uid;
