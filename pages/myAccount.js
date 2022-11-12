import React, { useEffect } from "react";
import { useRouter } from "next/router";
import NavbarLogged from "../components/navbar/NavbarLogged";
import { logout } from "../components/logout";
import { useSelector } from "react-redux";

function myAccount() {
  const router = useRouter();

  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    const mail = localStorage.getItem("mail");
    const accessToken = localStorage.getItem("accessToken");
    console.log(token, mail, accessToken);
    if (!token || !mail || !accessToken) {
      (loginData.isLoggedIn = false),
        (loginData.loggedInUser = {}),
        (registerData.user = {}),
        (registerData.isPosted = false),
        logout();
      router.push("/login");
    }
    // dispatch function to verify token and mail
    // if verified = accesss else reject
  });

  return (
    <>
      <div className=" w-full">
        <NavbarLogged />
        Account information shall appear here
      </div>
    </>
  );
}

export default myAccount;
