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
import CreateProfileModal from "../molecules/CreateProfileModal";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../atoms/AlertMessage";
import Image from "next/image";

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

  {
    /* <div className="flex flex-col justify-center items-center w-full mt-10">
    <div className="rounded-full w-[50px] h-[50px] flex justify-center items-center bg-color_1 text-color_2">
      <PersonIcon />
    </div>
    <div className="text-text_1 font-bold text-xl mt-5">
      {userBasicData.name ? userBasicData.name : ""}
    </div>
  </div> */
  }
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-between">
        <div
          className="flex flex-col justify-between items-center border rounded m-2 cursor-pointer gap-5 w-[90%] p-3  md:bg-color_2 bg-color_8 hover:bg-color_8 duration-200"
          onClick={() => {
            const user = localStorage.getItem("userid") || "";
            if (user) {
              router.push(`/home/${localStorage.getItem("userid")}`);
            } else {
              router.push("/home");
            }
          }}
        >
          <div className="rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] overflow-hidden flex justify-center items-center bg-color_1 text-color_2">
            {props.image ? (
              <Image
                unoptimized
                // fill
                src={`data:image/jpeg;base64,` + props.image}
                alt="Picture of the author"
                objectFit="revert"
                width={100}
                className="rounded-full"
                height={100}
              />
            ) : (
              <PersonIcon fontSize="large" />
            )}
          </div>
          <div className="flex flex-col justify-between text-center ">
            <div className="text-text_1 font-semibold text-[16px]  ">
              {/* {userBasicData.name ? userBasicData.name : ""} */}
              Ankit Negi
            </div>
            <div className="text-text_2 text-sm ">
              nankit793@gmai.com
              {/* {userBasicData.name && localStorage.getItem("userid")} */}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-center w-full items-center border-color_2">
            <Link href="/myAccount">
              <a
                className={`cursor-pointer py-3  hover:text-color_5 w-full text-center ${
                  router.pathname === "/myAccount"
                    ? "font-semibold text-color_5"
                    : "text-color_black "
                } `}
              >
                My Account
              </a>
            </Link>
            <a className="w-full">
              <Modal
                onClick={handleOpen}
                onClose={handleClose}
                text="Create Profile"
                open={open}
                data={<CreateProfileModal />}
                textClass="cursor-pointer capitalize py-3 text-color_black hover:text-color_5 w-full text-center"
              />
            </a>
            <Link href="/update/basicDetails">
              <a
                className={`cursor-pointer py-3 hover:text-color_5 w-full text-center  ${
                  router.pathname === "/update/basicDetails"
                    ? " font-semibold text-color_5"
                    : "text-color_black "
                } `}
              >
                Edit Profile
              </a>
            </Link>
          </div>
          <div className="md:hidden block">
            <div className="flex flex-col justify-center w-full items-center border-color_2 border border-x-0 border-b-0 border-t-1">
              <Link href="/">
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
              </Link>
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
          <div className="flex flex-col justify-center w-full items-center border-color_2 border border-x-0 border-b-0 border-t-1">
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
          </div>
          <div
            onClick={handleLogOut}
            className="p-5 font-bold cursor-pointer bg-[#880808] text-white w-full flex justify-center items-center"
          >
            <ExitToAppIcon sx={{ marginRight: 1 }} />
            Log Out
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}

export default NavbarLoggedBody;
