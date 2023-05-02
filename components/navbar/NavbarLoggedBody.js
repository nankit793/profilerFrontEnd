import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import Close from "@mui/icons-material/Close";
// import Menu from "@mui/icons-material/Menu";
// import PersonIcon from "@mui/icons-material/Person";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import SettingsIcon from "@mui/icons-material/Settings";
import { logout } from "../logout";
// import Modal from "../../components/molecules/Modal";
import { NotificationContainer } from "react-notifications";
import { useSelector } from "react-redux";
// import CreateProfileModal from "../molecules/CreateProfileModal";
// import {
//   errorNotification,
//   successNotification,
//   warningNotification,
// } from "../atoms/AlertMessage";
// import Image from "next/image";

function NavbarLoggedBody(props) {
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
    // router.reload();
  };

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
      <div className="w-full px-5 py-3">
        <div
          className={`cursor-pointer text-md text-right whitespace-nowrap ${
            router.query.uid === localStorage.getItem("userid")
              ? "text-color_5"
              : ""
          } `}
          onClick={() => {
            const user = localStorage.getItem("userid") || "";
            if (user) {
              router.push(`/home/${localStorage.getItem("userid")}`);
            } else {
              router.push("/home");
            }
          }}
          id="operationButton"
        >
          My profile
        </div>
        <div className="w-full">
          <div className="pt-3 pb-2">
            <Link href="/update/basicDetails">
              <a
                className={`cursor-pointer py-2 whitespace-nowrap text-md hover:text-color_5 w-full text-center  ${
                  router.pathname === "/update/basicDetails"
                    ? "  text-color_5"
                    : "text-color_black "
                } `}
                id="operationButton"
              >
                Edit profile
              </a>
            </Link>
          </div>
          <div className="md:hidden block">
            <div className="flex flex-col justify-start w-full items-end border-color_2 border border-x-0 border-b-0 border-t-1">
              {/* <Link href="/">
                <a
                  className={`cursor-pointer  py-3 text-color_black  ${
                    router.pathname === "/aboutUs"
                      ? "font-bold text-color_5 "
                      : ""
                  } `}
                >
                  Hire
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer py-3 ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1 text-color_5 "
                      : "text-color_black "
                  } `}
                >
                  API
                </a>
              </Link> */}
              <Link href="/">
                <a
                  className={`cursor-pointer py-3  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1 text-color_5 "
                      : "text-color_black "
                  } `}
                >
                  About
                </a>
              </Link>
            </div>
          </div>
          {/* <div className="flex flex-col justify-center w-full items-center border-color_2 border border-x-0 border-b-0 border-t-1">
            <Link href="/setting">
              <a
                className={`cursor-pointer font-semibold py-3 w-full text-center text-color_black  ${
                  router.pathname === "/setting" ? "font-bold" : ""
                } `}
              >
                <SettingsIcon sx={{ marginRight: 1 }} />
                Setings
              </a>
            </Link>
          </div> */}
          <div
            onClick={handleLogOut}
            className="text-right text-md pt-1 cursor-pointer text-[#880808] "
          >
            {/* <ExitToAppIcon sx={{ marginRight: 1 }} /> */}
            Log out
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}

export default NavbarLoggedBody;
