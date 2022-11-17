/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
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
import { authenticate } from "../components/authentication";
import Footer from "../components/footer/Footer";
function MyAccount() {
  const [userBasicData, setUserBasicData] = useState({});
  // const router = useRouter();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const userData = useSelector((state) => state.basicDataReducer);
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
      setUserBasicData(userData.userData.data.user);
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
      <div className="md:mx-20 m-8">
        <div className="text-[25px] font-bold my-4 font-inter text-text_1">
          My Account
        </div>
        <div className="md:block hidden w-full flex p-10 bg-[white] rounded-xl ">
          <div className=" w-full flex">
            <div className="">
              <div className="w-[200px] h-[200px] rounded-xl  bg-color_2"></div>
            </div>
            <div className="w-full ml-10 flex flex-col justify-between">
              <div className="flex items-center justify-between w-full ">
                <div>{userBasicData.name}</div>
                <div>
                  {userBasicData.age}
                  {userBasicData.gender}
                  {userBasicData.nationality}
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="w-full ">
                  <div className="flex justify-between border-b mr-5  border-dashed">
                    <div className="w-full font-bold text-text_1">
                      Joined At:
                    </div>
                    <div className="text-right w-full text-[16px] font-semibold">
                      {userBasicData.joiningDate
                        ? userBasicData.joiningDate
                        : ""}
                    </div>
                  </div>
                  <div className="flex text-text_1 justify-between border-b border-dashed mr-5 my-7 ">
                    <div className="w-full font-bold">Email</div>
                    <div className="text-right w-full text-[16px] font-semibold">
                      {userBasicData.userid}
                    </div>
                  </div>
                  <div className="flex justify-between border-b mr-5 border-dashed">
                    <div className="w-full text-text_1 font-bold">Username</div>
                    <div className="text-right w-full">
                      {userBasicData.username}
                    </div>
                  </div>
                </div>
                <div className="w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between my-5">
          <div className="text-[20px] text-text_1 font-bold">User Details</div>
          <div className="">
            <ButtonPrimary
              type="button"
              text="Edit Details"
              // icon={<ModeEditOutlineIcon />}
              className="text-white bg-color_2 font-semibold text-[14px] hover:bg-color_1 hover:text-black px-5 flex items-center justify-center rounded"
            />
          </div>
        </div>
        <div className="bg-[white] w-full rounded-xl md:p-8 p-3 md:flex gap-10 justify-between">
          <div className="w-full">
            {/* <div className="text-[24px] font-semibold mb-4 ">
              Personal Information
            </div> */}
            <UserField keyName="Name" value={userBasicData.name} />
            <UserField keyName="Phone" value={userBasicData.phone} />
            <UserField keyName="Date Of Birth" value={userBasicData.dob} />
            <UserField keyName="Bio" value={userBasicData.bio} />
            <UserField keyName="Slogan" value={userBasicData.slogan} />
            <UserField keyName="Zodiac" value={userBasicData.zodiac} />
            <UserField keyName="Height" value={userBasicData.height} />
            <UserField keyName="Weight" value={userBasicData.weight} />
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
            <UserField keyName="Facebook" value={userBasicData.facebook} />
            <UserField keyName="Instagram" value={userBasicData.instagram} />
            <UserField keyName="YouTube" value={userBasicData.youtube} />
            <UserField keyName="Linkdn" value={userBasicData.linkdn} />
            <UserField keyName="Github" value={userBasicData.github} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyAccount;
