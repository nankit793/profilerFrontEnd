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
// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

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
    let token, userid;
    token = localStorage.getItem("idToken");
    userid = localStorage.getItem("userid");
    if (!token || !userid) {
      setIsLoggedInUser(false);
    } else {
      setIsLoggedInUser(true);
    }
    const uid = router.query.uid;
    setUserid(uid);
    if (!uid && !userid) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (
      userData &&
      userData.userData &&
      userData.isUser &&
      userData.userData.status === 200
    ) {
      setUserBasicData(userData.userData.data.user);
      setProfileLoading(false);
      setIsUserFound(true);
    } else if (
      userData &&
      userData.userData &&
      userData.userData.statues !== 200
    ) {
      errorNotification("User was not found", "Error");
      setProfileLoading(false);
      setIsUserFound(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  return (
    <>
      {!isLoggedInUser && <Navbar />}
      {isLoggedInUser && <NavbarLogged />}
      {profileLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <CircularProgresser />
        </div>
      ) : (
        <>
          {isUserFound && (
            <>
              <div className="w-full  colorBg">
                <div className="md:flex justify-between items-center h-full  text-center md:pl-5 py-10">
                  <div className="w-[200px] h-[200px] flex mx-auto md:mx-0  justify-center items-center overflow-hidden bg-[white] rounded-full"></div>
                  <div className="px-2 w-[100%] md:w-[30%]">
                    <div className="text-left w-full mt-3 md:mt-0 font-bold text-color_2 text-[35px]">
                      {userBasicData && userBasicData.name ? (
                        <div>Hello! I Am</div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="font-bold text-color_1  text-[30px] italic flex items-center justify-center">
                      {userBasicData.name ? `${userBasicData.name}` : ""}
                      <span className="text-color_2 text-[20px] mx-2">
                        {userBasicData.gender ? (
                          userBasicData.gender === "m" ? (
                            <MaleIcon />
                          ) : userBasicData.gender === "f" ? (
                            <FemaleIcon />
                          ) : (
                            <TransgenderIcon />
                          )
                        ) : (
                          ""
                        )}
                      </span>

                      {userBasicData.nationality ? (
                        <ReactCountryFlag
                          countryCode={userBasicData.nationality}
                          svg
                        />
                      ) : (
                        ""
                      )}
                      {userBasicData.age ? userBasicData.age : ""}
                    </div>
                  </div>
                  <div className="px-2 text-[19px] text-color_1 font-semibold md:mt-0 mt-3 md:w-[40%] w-[100%] md:text-center text-center">
                    <div>
                      {userBasicData.slogan ? `${userBasicData.slogan} ` : ""}
                    </div>
                    {/* <div className="text-text_1">
                        { userBasicData.height ?`${ userBasicData.height} cm` : "" } /
                        { userBasicData.weight ? `${userBasicData.weight } kg`: "" } 
                      </div> */}
                  </div>
                </div>
              </div>
              <div className="md:mx-10 mx-5  mt-5 md:flex justify-between drop-shadow subpixel-antialiased   ">
                <div className="bg-white md:w-[75%] rounded-xl w-full h-fit">
                  <div className="text-white text-[19px] font-semibold border-b bg-color_2 rounded-t-xl">
                    <div className="px-4 py-2">About me</div>
                  </div>
                  <div className="text-text_2  p-4 text-[15px] overflow-x-auto">
                    {userBasicData.bio}
                  </div>
                </div>
                <div className="bg-white rounded-xl md:w-[20%] max-w-[80%] md:mx-0 mx-auto md:mt-0 mt-5 h-fit">
                  <div className="text-white text-[19px] font-semibold border-b bg-color_2 rounded-t-xl">
                    <div className="px-4 py-2">Social Links</div>
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
                  <div className="my-3 grid grid-cols-3 flex gap-2 cursor-pointer">
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

                  <div className="text-text_1 text-[19px] font-semibold border-b ">
                    <div className="px-4 py-1 bg-color_2 text-white">Phone</div>
                  </div>
                  <div className="text-text_2 justify-center font-semibold my-2 flex items-center">
                    {userBasicData && userBasicData.phone[0] != "" ? (
                      <>
                        <div className="text-[green]">
                          <LocalPhoneIcon />
                        </div>
                        <span className="text-sm mr-2">
                          {userBasicData.phone}
                        </span>
                        <span className="text-[12px] text-text_2">
                          (not verified)
                        </span>
                      </>
                    ) : (
                      ""
                    )}

                    {userBasicData.phone[0] === "" && (
                      <div className="text-text_2  font-semibold text-sm text-center">
                        no contact number
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:mx-10 mx-5 md:flex justify-between gap-4 ">
                <div className="mt-5 drop-shadow subpixel-antialiased  rounded-xl bg-white w-[100%]   md:w-[50%]">
                  <div className="text-white text-[19px] font-semibold border-b bg-color_2 rounded-t-xl">
                    <div className="px-4 py-2">My Portfolios</div>
                  </div>
                  <div className="md:block hidden w-full py-2 px-4">
                    <ProfileListDesktop isDesktop={true} userid={userid} />
                  </div>
                  <div className="block md:hidden w-full pb-3">
                    <ProfileListDesktop userid={userid} />
                  </div>
                </div>
                <div className="w-[100%] md:w-[50%] mt-5 drop-shadow subpixel-antialiased  rounded-xl bg-white ">
                  <div className="text-white text-[19px] font-semibold border-b bg-color_2 rounded-t-xl">
                    <div className="px-4 py-2">More About Me</div>
                  </div>
                  <div></div>
                </div>
              </div>
            </>
          )}
          {!isUserFound && !profileLoading && (
            <>
              <div className="h-screen w-full flex items-center justify-center flex-col">
                <div className="">
                  {/* <SentimentVeryDissatisfiedIcon /> */}
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
      )}
    </>
  );
}

export default Uid;
