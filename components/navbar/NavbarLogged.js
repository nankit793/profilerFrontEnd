import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SwipeableTemporaryDrawer from "../molecules/Drawer";
import NavbarLoggedBody from "./NavbarLoggedBody";
import * as getProfilePhoto from "../../redux-next/profilePhoto/action";

import SearchBarBody from "./SearchBarBody";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
function NavbarLogged() {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const profilePic = useSelector((state) => state.profilePictureReducer);
  useEffect(() => {
    dispatch(getProfilePhoto.getProfilePicture(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profilePic.isFetched && profilePic.profilePhoto) {
      setImage(profilePic.profilePhoto.data);
    } else if (!profilePic.isFetched) {
      setImage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePic && profilePic.profilePhoto && profilePic.isFetched]);

  return (
    <>
      <div className="py-2 bg-color_7 w-full z-20 absolute top-0 ">
        <div className="flex justify-between items-center">
          <div
            className=" ml-2 text-[18px] w-min text-color_2 font-semibold  cursor-pointer"
            onClick={() => {
              router.push(`/home/${localStorage.getItem("userid")}`);
            }}
          >
            ImPROFILE
          </div>
          <div className="flex items-center mr-2 ">
            <div className="md:block hidden">
              <Link href="/">
                <a
                  className={`cursor-pointer text-[16px]  mx-2 text-color_2  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-color_2"
                  } `}
                >
                  Explore
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer text-[16px]  mx-2 text-color_2  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-color_2"
                  } `}
                >
                  Hire
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer text-[16px] mx-2 text-color_2 ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-color_2"
                  } `}
                >
                  API
                </a>
              </Link>
            </div>
            <div className="text-color_2 mx-2 cursor-pointer">
              <NotificationsIcon />
            </div>
            <div className="ml-2">
              <SwipeableTemporaryDrawer
                anchor="right"
                click={<SearchIcon />}
                classNameDrawer="text-color_2"
                data={<SearchBarBody />}
              />
            </div>
            <div
              className={`max-w-[40px] max-h-[40px]  rounded-full overflow-hidden ml-3 
             ${image ? " " : "flex justify-center items-center"}`}
            >
              <SwipeableTemporaryDrawer
                anchor="right"
                click={
                  <Image
                    unoptimized
                    // fill
                    src={`http://localhost:5000/profilePhoto?userid=${localStorage.getItem(
                      "userid"
                    )}`}
                    alt="Picture of the author"
                    objectFit="revert"
                    width={100}
                    className="rounded-full"
                    height={100}
                  />
                  // image ? (
                  //   <Image
                  //     unoptimized
                  //     // fill
                  //     src={`data:image/jpeg;base64,` + image}
                  //     alt="Picture of the author"
                  //     objectFit="revert"
                  //     width={100}
                  //     className="rounded-full"
                  //     height={100}
                  //   />
                  // ) : (
                  //   <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
                  // )
                }
                data={<NavbarLoggedBody image={image} />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarLogged;
