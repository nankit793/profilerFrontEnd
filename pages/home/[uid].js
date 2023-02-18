import { useRouter } from "next/router";
import Head from "next/head";
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
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import BottomNav from "../../components/molecules/homePage/BottomNav";

import { Scrollbars } from "react-custom-scrollbars";
// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as getProfilePhoto from "../../redux-next/profilePhoto/action";

function Uid(props) {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [isUserFound, setIsUserFound] = useState(false);
  const [userid, setUserid] = useState("");
  const [userBasicData, setUserBasicData] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);
  const [image, setImage] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.basicDataReducer);
  const profilePic = useSelector((state) => state.profilePictureReducer);

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
  }, [router, router.query]);

  useEffect(() => {
    const effectHandler = async () => {
      if (userid) {
        dispatch(getBasicDataActions.getBasicData({ userid: userid }));
      }
      if (!profilePic.isFetched) {
        dispatch(getProfilePhoto.getProfilePicture(""));
      }
    };
    effectHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

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

  useEffect(() => {
    if (profilePic.isFetched && profilePic.profilePhoto) {
      setImage(profilePic.profilePhoto.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePic && profilePic.profilePhoto && profilePic.isFetched]);

  return (
    <>
      <Head>
        <title>
          {userBasicData.userid ? userBasicData.userid + " | " : ""}
          {userBasicData.name ? userBasicData.name + " - " : ""} imProfile
        </title>
        <meta
          name="description"
          content="With imProfile, you can easily create a professional portfolio and express your thoughts, ideas, and insights through its built-in blogging feature"
        ></meta>
        <link rel="canonical" href="/" />

        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        /> */}
      </Head>
      <div className="max-w-[1500px] h-[100%]">
        {profileLoading && (
          <div className="w-full h-screen flex justify-center items-center">
            <CircularProgresser />
          </div>
        )}
        {!profileLoading && isUserFound && (
          <div className="md:px-5 px-2  md:flex min-h-[80vh] justify-between gap-5 my-3">
            <div className="h-min md:w-[35%] w-[100%] scrollbar-hide overflow-y-auto bg-color_2 rounded-t-xl  flex flex-col justify-start items-center">
              <div className="my-3 rounded-full drop-shadow h-[150px] w-[150px] overflow-hidden flex justify-center items-center bg-color_8 text-color_2">
                {image ? (
                  <Image
                    unoptimized
                    // fill
                    src={`data:image/jpeg;base64,` + image}
                    alt="Picture of the author"
                    // objectFit="revert"
                    width={150}
                    className="rounded-full"
                    height={150}
                  />
                ) : (
                  <PersonIcon fontSize="large" sx={{ fontSize: "40px" }} />
                )}
              </div>
              <div className=" w-full text-center px-4 ">
                <div className="text-text_1 capitalize text-xl font-semibold">
                  {userBasicData.name ? userBasicData.name : ""}
                </div>
                <div className="text-text_2 text-md text-[16px] ">
                  <EmailIcon
                    // size="small"
                    sx={{ fontSize: 17, marginRight: "5px" }}
                  />
                  {userBasicData.userid ? userBasicData.userid : ""}
                </div>

                {userBasicData.userid === localStorage.getItem("userid") ? (
                  <>
                    <div className="flex gap-2 items-center mt-2">
                      <div
                        className="w-full duration-200 text-text_1 text-[16px] font-semibold rounded-3xl flex items-center justify-center text-text_1 cursor-pointer p-2 bg-color_2 border border-color_9"
                        onClick={() => {
                          router.push("/update/basicDetails");
                        }}
                      >
                        {/* <EditIcon sx={{ fontSize: 18, marginRight: "5px" }} /> */}
                        edit profile
                      </div>
                      <div className="cursor-pointer text-text_1">
                        <ShareIcon />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className=" text-text_2 py-2 w-min text-[16px]  whitespace-nowrap w-full ">
                flag, country, gender, age
              </div>
              <div className="w-full px-3">
                <div className="w-full my-2  py-1 px-4 rounded ">
                  {!userBasicData.facebook &&
                    !userBasicData.instagram &&
                    !userBasicData.youtube &&
                    !userBasicData.github &&
                    !userBasicData.linkdn && (
                      <div className="text-text_2  font-semibold text-center text-sm mt-2">
                        no social media links
                      </div>
                    )}
                  <div className=" flex-wrap flex gap-4">
                    {userBasicData.facebook ? (
                      <div
                        className="mx-auto p-1 hover:bg-color_1 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_1 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_1 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_1 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_1 flex justify-center items-center rounded-full duration-300 cursor-pointer"
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
              </div>
            </div>
            {/* side panel end  */}
            <div className="h-auto md:mt-0 mt-5 w-full flex rounded-t-xl border border-color_9 flex-col py-3 px-2 justify-start gap-5 h-full ">
              <div className="p-3  rounded  text-text_2 text-md">
                {userBasicData && userBasicData.slogan && userBasicData.slogan}
                {userBasicData && userBasicData.slogan && userBasicData.slogan}
                {userBasicData && userBasicData.slogan && userBasicData.slogan}
              </div>
              <BottomNav
                buttons={[
                  { name: "Portfolio", id: 0 },
                  { name: "Blogs", id: 1 },
                ]}
              />
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
