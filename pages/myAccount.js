import React, { useEffect } from "react";
import { useRouter } from "next/router";
import NavbarLogged from "../components/navbar/NavbarLogged";
import { logout } from "../components/logout";
import Head from "next/head";
import { clearLoginStore } from "../redux-next/login/reducers";
import { useSelector } from "react-redux";
import * as loginActions from "../redux-next/login/action";
import { useDispatch } from "react-redux";

function MyAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    const mail = localStorage.getItem("userid");
    const accessToken = localStorage.getItem("accessToken");
    if (!token || !mail || !accessToken) {
      dispatch(loginActions.clearStore());
      loginData.isLoggedIn = false;
      loginData.loggedInUser = {};
      (registerData.user = {}),
        (registerData.isPosted = false),
        console.log(loginData, registerData);
      logout();
      router.push("/login");
    }
    // dispatch function to verify token and mail
    // if verified = accesss else reject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {" "}
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
        Account information shall appear here
      </div>
    </>
  );
}

export default MyAccount;
