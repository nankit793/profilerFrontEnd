import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Close } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import { logout } from "../logout";
import Modal from "../../components/molecules/Modal";
import { NotificationContainer } from "react-notifications";
import { useSelector } from "react-redux";

import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../atoms/AlertMessage";
function NavbarLoggedBody() {
  const [userBasicData, setUserBasicData] = useState({});
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const userData = useSelector((state) => state.basicDataReducer);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();
  const handleLogOut = () => {
    (loginData.isLoggedIn = false),
      (loginData.loggedInUser = {}),
      (registerData.user = {}),
      (registerData.isPosted = false),
      logout();
    router.push("/login");
  };

  useEffect(() => {
    if (
      userData &&
      userData.userData &&
      userData.isUser == true &&
      userData.userData.status === 200
    ) {
      setUserBasicData(userData.userData.data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-between">
        <div className="flex flex-col justify-center items-center w-full mt-10">
          <div className="rounded-full w-[50px] h-[50px] flex justify-center items-center bg-color_1 text-color_2">
            <PersonIcon />
          </div>
          <div className="text-text_1 font-bold text-xl mt-5">
            {userBasicData.name ? userBasicData.name : ""}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-center w-full items-center border-color_2">
            <Link href="/myAccount">
              <a
                className={`cursor-pointer font-semibold py-3 text-[black] hover:bg-color_3 w-full text-center ${
                  router.pathname === "/myAccount" ? "bg-color_3 font-bold" : ""
                } `}
              >
                {/* <SettingsIcon /> */}
                My Account
              </a>
            </Link>
            <a className="w-full">
              {/* <SettingsIcon /> */}
              <Modal
                onClick={handleOpen}
                onClose={handleClose}
                text="Create Profile"
                open={open}
                textClass="cursor-pointer capitalize font-semibold py-3 text-[black] hover:bg-color_3 w-full text-center"
              />
            </a>
            <Link href="/update/basicDetails">
              <a
                className={`cursor-pointer font-semibold py-3 text-[black] hover:bg-color_3 w-full text-center  ${
                  router.pathname === "/update/basicDetails"
                    ? "bg-[#EBF5FB] font-bold"
                    : ""
                } `}
                // onClick={handleOpen}
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
                  FAQs
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
