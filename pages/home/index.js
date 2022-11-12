import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { logout } from "../../components/logout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function home() {
  const registerData = useSelector((state) => state.registerReducer);
  const loginData = useSelector((state) => state.loginUserReducers);

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("mail")) {
      router.push(`home/${localStorage.getItem("mail")}`);
    } else {
      (loginData.isLoggedIn = false),
        (loginData.loggedInUser = {}),
        (registerData.user = {}),
        (registerData.isPostedc = false),
        logout();
      router.push(`/login`);
    }
  });
  return <></>;
}

export default home;
