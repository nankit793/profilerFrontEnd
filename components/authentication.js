import { ifLogged } from "./ifLogged";
import { logout } from "./logout";
// import * as loginActions from "../redux-next/login/action";
// import { useSelector } from "react-redux";

import Router, { useRouter } from "next/router";
// import { useDispatch } from "react-redux";

export async function authenticate(loginData, registerData) {
  //   try {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("idToken");
  const userid = localStorage.getItem("userid");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accessToken,
      refreshToken,
      userid,
    },
  };
  const result = await fetch(`${process.env.BACKEND_URL}/auth`, requestOptions);
  const final = await result.json();
  if (!final.giveAccess) {
    logout();
    loginData.isLoggedIn = false;
    loginData.loggedInUser = {};
    registerData.user = {};
    registerData.isPosted = false;
    Router.push("/login");
  } else {
    const { newAccessToken } = final;
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
  }
  //   } catch (error) {
  //     return error;
  //   }
}
