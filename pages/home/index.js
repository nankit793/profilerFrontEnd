import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { logout } from "../../components/logout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Home() {
  const registerData = useSelector((state) => state.registerReducer);
  const loginData = useSelector((state) => state.loginUserReducers);

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      router.push(`home/${localStorage.getItem("userid")}`);
    } else {
      (loginData.isLoggedIn = false),
        (loginData.loggedInUser = {}),
        (registerData.user = {}),
        (registerData.isPosted = false),
        logout();
      router.push(`/login`);
    }
  });
  return <></>;
}

export default Home;
