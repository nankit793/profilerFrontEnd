/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavbarLogged from "../components/navbar/NavbarLogged";
// import { logout } from "../components/logout";
import Head from "next/head";
// import { clearLoginStore } from "../redux-next/login/reducers";
import * as getBasicDataActions from "../redux-next/getUserBasic/actions";
import ButtonPrimary from "../components/atoms/input/ButtonPrimary";
import UserField from "../components/molecules/UserField";
// dependencies
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
2;
import { authenticate } from "../components/authentication";
import Footer from "../components/footer/Footer";
function MyAccount() {
  const [userBasicData, setUserBasicData] = useState({});
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const userData = useSelector((state) => state.basicDataReducer);
  const router = useRouter();
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
    if (
      userData &&
      userData.userData &&
      userData.isUser == true &&
      userData.userData.status === 200
    ) {
      setUserBasicData(userData.userData.data.newData);
    }
  }, [userData && userData.userData]);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userData && userData.userData]);

  return (
    <>
      <Head>
        <title>Profiler - My Account </title>
        <meta
          name="description"
          content="Profiler is an application in which you would create your profiles regarding different fields without having to worry about saving documents"
        ></meta>
        <link rel="canonical" href="/" />
      </Head>
      <div className=" w-full">
        <NavbarLogged />
      </div>
      <div className="md:mx-20 mx-3">
        <div className="text-[20px] font-bold my-2 font-inter text-color_2">
          MY ACCOUNT
        </div>
        <div className="w-full md:flex justify-between gap-5 ">
          <div className="rounded-xl bg-[white] w-[100%] md:w-[70%] md:flex justify-between p-5 items-center">
            <div className="w-[200px] h-[200px] rounded-xl w-full bg-color_2 flex md:mx-0 mx-auto"></div>
            <div className="w-full md:w-[60%] mt-10 md:mt-0 flex flex-col justify-between h-full ">
              <div className="flex w-full justify-between items-center">
                <div className="text-[23px] text-color_2 font-bold ">
                  {userBasicData.name}
                </div>
                <div className="mr-4">
                  {userBasicData.age}
                  {userBasicData.gender}
                  {userBasicData.nationality}
                </div>
              </div>
              <div className="flex justify-between border-b mr-5  border-dashed md:mt-0 mt-5">
                <div className="w-full text-[14px] font-bold text-text_1">
                  JOINED ON
                </div>
                <div className="text-right w-full text-[14px] font-semibold whitespace-nowrap">
                  {/* {userBasicData.joiningDate ? userBasicData.joiningDate : ""} */}
                </div>
              </div>
              <div className="flex text-text_1 justify-between border-b border-dashed mr-5 my-5 md:my-2 ">
                <div className="w-full text-[14px] font-bold">EMAIL</div>
                <div className="text-right w-full text-[16px] font-semibold">
                  {userBasicData.userid}
                </div>
              </div>
              <div className="flex justify-between border-b mr-5 border-dashed">
                <div className="w-full text-text_1 text-[14px] font-bold">
                  USERNAME
                </div>
                <div className="text-right w-full">
                  {userBasicData.username}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[white] w-[100%] md:w-[30%] mt-5 md:mt-0 ">
            <div className="text-white text-[19px] font-semibold border-b bg-color_5 rounded-t-xl">
              <div className="px-4 py-2 text-[15px] font-bold">INSIGHTS</div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between my-3">
          <div className="text-[20px] text-color_2 font-bold">DETAILS</div>
          <div
            className=""
            onClick={() => {
              router.push("/update/basicDetails");
            }}
          >
            <ButtonPrimary
              type="button"
              text="Edit Details"
              // icon={<ModeEditOutlineIcon />}
              className="text-white bg-color_2 font-semibold text-[14px] hover:bg-color_5  px-5 flex items-center justify-center rounded"
            />
          </div>
        </div>
        <div className="bg-[white] w-full rounded-xl md:p-8 p-3 md:flex gap-10 justify-between">
          <div className="w-full">
            {/* <div className="text-[24px] font-semibold mb-4 ">
              Personal Information
            </div> */}
            <UserField keyName="Name" value={userBasicData.name} />
            {/* <UserField keyName="Phone" value={userBasicData.phone} /> */}
            <UserField
              keyName="Date Of Birth"
              value={
                userBasicData && userBasicData.dob ? userBasicData.dob : ""
              }
            />
            <UserField keyName="Bio" value={userBasicData.bio} />
            <UserField keyName="Slogan" value={userBasicData.slogan} />
            <UserField keyName="Zodiac" value={userBasicData.zodiac} />
            <UserField keyName="Height" value={`${userBasicData.height} cm`} />
            <UserField keyName="Weight" value={`${userBasicData.weight} kg`} />
            <UserField keyName="Gender" value={userBasicData.gender} />
            <UserField keyName="Job Role" value={userBasicData.jobTitle} />
            <UserField
              keyName="Live In"
              value={userBasicData.currentLocation}
            />
            <UserField
              keyName="Nationality"
              value={userBasicData.nationality}
            />
          </div>
          <div className="w-full ">
            {/* <div className="text-[24px] mb-4 font-semibold md:mt-0 mt-10">
              Social Information
            </div> */}

            <UserField
              keyName="Facebook"
              link={userBasicData.facebook ? true : false}
              value={
                userBasicData.facebook ? userBasicData.facebook : "Not provided"
              }
            />
            <UserField
              keyName="Instagram"
              link={userBasicData.instagram ? true : false}
              value={
                userBasicData.instagram
                  ? userBasicData.instagram
                  : "Not provided"
              }
            />
            <UserField
              keyName="YouTube"
              link={userBasicData.youtube ? true : false}
              value={
                userBasicData.youtube ? userBasicData.youtube : "Not provided"
              }
            />
            <UserField
              keyName="Linkdn"
              link={userBasicData.linkdn ? true : false}
              value={
                userBasicData.linkdn ? userBasicData.linkdn : "Not provided"
              }
            />
            <UserField
              keyName="Github"
              link={userBasicData.github ? true : false}
              value={
                userBasicData.github ? userBasicData.github : "Not provided"
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyAccount;
