import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavbarLogged from "../../components/navbar/NavbarLogged";
// import { logout } from "../components/logout";
import Head from "next/head";
// import { clearLoginStore } from "../redux-next/login/reducers";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import ButtonPrimary from "../../components/atoms/input/ButtonPrimary";
import UserField from "../../components/molecules/UserField";
// dependencies
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
2;
import { authenticate } from "../../components/authentication";
import Footer from "../../components/footer/Footer";

function Index() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  return (
    <>
      <Head>
        <title>Profiler - Settings </title>
        <meta
          name="description"
          content="Profiler is an application in which you would create your profiles regarding different fields without having to worry about saving documents"
        ></meta>
        <link rel="canonical" href="/" />
      </Head>
      <div className=" w-full">
        <NavbarLogged />
      </div>
      <div className="md:mx-20">
        <div className="text-[25px] mx-8 font-bold my-4 font-inter text-color_2">
          Settings
        </div>
        <div className="rounded-xl bg-[white] p-8">hello </div>
      </div>
    </>
  );
}

export default Index;
