import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Close } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import { logout } from "../logout";
import { NotificationContainer } from "react-notifications";

import { useSelector } from "react-redux";

import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../atoms/AlertMessage";
function NavbarLoggedBody() {
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const router = useRouter();
  const handleLogOut = () => {
    (loginData.isLoggedIn = false),
      (loginData.loggedInUser = {}),
      (registerData.user = {}),
      (registerData.isPosted = false),
      logout();
    router.push("/login");
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-between">
        <div className="flex flex-col justify-center items-center w-full mt-10">
          <div className="rounded-full w-[50px] h-[50px] flex justify-center items-center bg-color_1 text-color_2">
            <PersonIcon />
          </div>
          <div>Name Here</div>
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-center w-full items-center border-color_2">
            <Link href="/myAccount">
              <a
                className={`cursor-pointer font-semibold py-3 text-[black] hover:bg-color_1 w-full text-center ${
                  router.pathname === "/myAccount" ? "bg-color_1" : ""
                } `}
              >
                {/* <SettingsIcon /> */}
                My Account
              </a>
            </Link>
            <Link href="/">
              <a
                className={`cursor-pointer font-semibold py-3 text-[black] hover:bg-color_1 w-full text-center ${
                  router.pathname === "/createProfile" ? "text-color_1" : ""
                } `}
              >
                {/* <SettingsIcon /> */}
                Create Profile
              </a>
            </Link>
            <Link href="/">
              <a
                className={`cursor-pointer font-semibold py-3 text-[black] hover:bg-color_1 w-full text-center  ${
                  router.pathname === "/editProfile" ? "text-color_1" : ""
                } `}
              >
                {/* <SettingsIcon /> */}
                Edit Profile
              </a>
            </Link>
          </div>
          <div className="md:hidden block">
            <div className="flex flex-col justify-center w-full items-center border-color_2 border border-x-0 border-b-0 border-t-1">
              <Link href="/">
                <a
                  className={`cursor-pointer font-semibold py-3 text-[black]  ${
                    router.pathname === "/aboutUs" ? "text-color_1" : ""
                  } `}
                >
                  About
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer font-semibold py-3 text-[black]  ${
                    router.pathname === "/aboutUs" ? "text-color_1" : ""
                  } `}
                >
                  Contact
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer font-semibold py-3 text-[black]  ${
                    router.pathname === "/aboutUs" ? "text-color_1" : ""
                  } `}
                >
                  FAQ's
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full items-center border-color_2 border border-x-0 border-b-0 border-t-1">
            <Link href="/">
              <a
                className={`cursor-pointer font-semibold py-3 text-[black]  ${
                  router.pathname === "/aboutUs" ? "text-color_1" : ""
                } `}
              >
                <SettingsIcon />
                Setings
              </a>
            </Link>
          </div>
          <div
            onClick={handleLogOut}
            className="p-5 font-bold cursor-pointer bg-[#541e1b] text-white w-full flex justify-center items-center"
          >
            <ExitToAppIcon />
            Log Out
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}

export default NavbarLoggedBody;
