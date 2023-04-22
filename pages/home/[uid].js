/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import { logout } from "../../components/logout";
import Footer from "../../components/footer/Footer";
import {
  errorNotification,
  successNotification,
} from "../../components/atoms/AlertMessage";
import ProfileListDesktop from "../../components/molecules/ProfileListDesktop";
// dependencies
import { Avatar } from "@mui/material";
import CircularProgresser from "../../components/atoms/CircularProgresser";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import BottomNav from "../../components/molecules/homePage/BottomNav";
import { Scrollbars } from "react-custom-scrollbars";
// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import * as getProfilePhoto from "../../redux-next/profilePhoto/action";
import * as getFollowingList from "../../redux-next/followerList/actions";
import axios from "axios";
import FollowersDetails from "../../components/molecules/subMolecules/FollowersDetails";
import SelfAccountFollow from "../../components/molecules/subMolecules/SelfAccountFollow";
import { initialState } from "../../redux-next/followerList/reducer";
function Uid(props) {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [isUserFound, setIsUserFound] = useState(false);
  const [userid, setUserid] = useState("");
  const [userBasicData, setUserBasicData] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [image, setImage] = useState(null);
  const [followingListState, setFollowingListState] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.basicDataReducer);
  const profilePic = useSelector((state) => state.profilePictureReducer);
  const followingList = useSelector((state) => state.followingListReducer);

  useEffect(() => {
    const uid = router.query.uid;
    setUserid(uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.uid]);

  useEffect(() => {
    if (
      followingList &&
      followingList.isFecthed &&
      followingList.userFollowingList
    ) {
      setFollowingListState(followingList.userFollowingList);
    }
  }, [
    followingList && followingList.isFecthed && followingList.userFollowingList,
  ]);

  useEffect(() => {
    const effectHandler = async () => {
      if (userid) {
        dispatch(getBasicDataActions.getBasicData({ userid: userid }));
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
        setFollowersCount(userData.userData.data.followersCount);
        setFollowingCount(userData.userData.data.followingCount);
        setIsUserFound(true);
        setBlogsCount(userData.userData.data.blogsCount);
      } else if (!userData.userData.data.registered) {
        setIsUserFound(false);
      }
      setProfileLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  const follow = () => {
    if (
      userBasicData._id &&
      localStorage.getItem("accessToken") &&
      localStorage.getItem("idToken") &&
      localStorage.getItem("userid")
    ) {
      const headers = {
        accesstoken: localStorage.getItem("accessToken"),
        refreshtoken: localStorage.getItem("idToken"),
        userid: localStorage.getItem("userid"),
      };
      let id = userBasicData._id;
      axios
        .post(`http://localhost:5000/follow?id=${id}`, headers, {
          headers: {
            accesstoken: localStorage.getItem("accessToken"),
            refreshtoken: localStorage.getItem("idToken"),
            userid: localStorage.getItem("userid"),
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            const newArr = followingListState.concat(id);
            dispatch(getFollowingList.updateFollowingList(newArr));
            setFollowingListState(newArr);
            setFollowersCount(followersCount + 1);
          }
        })
        .catch(function (error) {
          console.log(error.message);
          // setImage(null);
        });
    } else {
      errorNotification("can't follow now", "try again later");
    }
  };
  const unfollow = () => {
    if (
      userBasicData._id &&
      localStorage.getItem("accessToken") &&
      localStorage.getItem("idToken") &&
      localStorage.getItem("userid")
    ) {
      const headers = {
        accesstoken: localStorage.getItem("accessToken"),
        refreshtoken: localStorage.getItem("idToken"),
        userid: localStorage.getItem("userid"),
      };
      let id = userBasicData._id;
      axios
        .post(`http://localhost:5000/unfollow?id=${id}`, headers, {
          headers: {
            accesstoken: localStorage.getItem("accessToken"),
            refreshtoken: localStorage.getItem("idToken"),
            userid: localStorage.getItem("userid"),
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            let a = [];
            for (let index = 0; index < followingListState.length; index++) {
              const element = followingListState[index];
              if (element !== id) {
                a.push(element);
              }
            }
            setFollowersCount(followersCount - 1);
            setFollowingListState(a);
            dispatch(getFollowingList.updateFollowingList(a));
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else {
      errorNotification("can't follow now", "try again later");
    }
  };

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
      </Head>
      <div className="max-w-[1500px] h-[100%] ">
        {profileLoading && (
          <div className="w-full h-screen flex justify-center items-center">
            <CircularProgresser />
          </div>
        )}
        {!profileLoading && isUserFound && (
          <div className="md:px-5 px-2  md:flex min-h-[80vh] justify-between gap-5 my-3 pt-14">
            <div className="h-min md:min-w-[300px] md:w-[30%] w-[100%]  overflow-y-auto bg-color_2 rounded-t-xl  flex flex-col justify-start items-center">
              <div className=" bg-color_3 h-[160px] w-[160px] overflow-hidden rounded-full">
                <Image
                  unoptimized
                  // fill
                  src={`http://localhost:5000/profilePhoto/direct?userid=${userid}`}
                  fill={true}
                  // fill
                  alt="pic"
                  // objectFit="revert"
                  width="100%"
                  height="100%"
                  className="rounded-full"
                  layout="responsive"
                  objectFit="cover"
                  object-position="center"
                />
              </div>

              <div className=" w-full text-center ">
                <div className="text-text_1 capitalize text-xl gap-2 mt-1 flex justify-center items-end">
                  {userBasicData.name ? userBasicData.name : ""}
                  {/* <div className="w-min text-[13px] text-text_2  whitespace-nowrap w-full ">
                    flag, country, gender, age
                  </div> */}
                </div>

                {userBasicData.userid === localStorage.getItem("userid") ? (
                  <>
                    <div className="">
                      <SelfAccountFollow
                        followersCount={followersCount}
                        blogsCount={blogsCount}
                        // followingCount={ }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 items-center mt-2 justify-center">
                      <FollowersDetails
                        followersCount={followersCount}
                        followingCount={followingCount}
                        blogsCount={blogsCount}
                        id={userBasicData._id}
                        currentUserFollowingList={followingListState}
                        follow={follow}
                        unfollow={unfollow}
                      />
                    </div>
                  </>
                )}
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
                        className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-200 cursor-pointer"
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
                        className="mx-auto p-1 hover:bg-color_9 flex justify-center items-center rounded-full duration-300 cursor-pointer"
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
              <div className="pt-1  rounded  text-text_2 text-left text-md">
                {userBasicData && userBasicData.bio ? userBasicData.bio : ""}
              </div>
            </div>
            {/* side panel end  */}
            <div className=" md:mt-0 mt-4 pb-2 w-full flex rounded-md  bg-color_8 flex-col  justify-start gap-1 md:w-[80%] w-full">
              <BottomNav
                data={userBasicData}
                id={userBasicData._id}
                setBlogsCount={setBlogsCount}
                buttons={[
                  { name: "Blogs", id: 1 },
                  { name: "Portfolio", id: 0 },
                  { name: "Bookmarks", id: 2, loginRequired: true },
                  { name: "Stats", id: 3 },
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
