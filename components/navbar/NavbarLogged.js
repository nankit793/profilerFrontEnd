import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SwipeableTemporaryDrawer from "../molecules/Drawer";
import NavbarLoggedBody from "./NavbarLoggedBody";
import * as getProfilePhoto from "../../redux-next/profilePhoto/action";
import Avatar from "@mui/material/Avatar";

import SearchBarBody from "./SearchBarBody";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "../molecules/Popover";
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
            className="ml-2 cursor-pointer"
            onClick={() => {
              router.push(`/home/${localStorage.getItem("userid")}`);
            }}
          >
            <Avatar
              alt="logo"
              variant="square"
              src="/images/logo.png"
              sx={{ width: 140, height: 35 }}
            />
          </div>
          <div className="flex items-center mr-2 ">
            <div className="md:block hidden">
              <Link href="/explore">
                <a
                  className={`cursor-pointer text-[16px]  mx-2 text-color_2  ${
                    router.pathname === "/explore"
                      ? "text-color_1"
                      : "text-color_2"
                  } `}
                >
                  Explore
                </a>
              </Link>
              {/* <Link href="/">
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
              </Link> */}
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
            <div className="pl-2">
              <Popover
                data={
                  <div className="">
                    <NavbarLoggedBody image={image} />
                  </div>
                }
                text={
                  <div className="w-[45px] h-[45px] overflow-hidden bg-color_8 rounded-full ">
                    {image ? (
                      <Image
                        unoptimized
                        // fill
                        src={`data:image/png;base64,` + image}
                        fill={true}
                        // fill
                        alt="Picture of the author"
                        // objectFit="revert"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="cover"
                        object-position="center"
                      />
                    ) : (
                      <>
                        <div className="rounded-full w-[150px] h-[150px] overflow-hidden flex justify-center items-center bg-color_1 text-color_2">
                          <PersonIcon fontSize="large" />
                        </div>
                      </>
                    )}
                  </div>
                }
              />
              {/* <SwipeableTemporaryDrawer
                anchor="right"
                click={
                  <Image
                    unoptimized
                    // fill
                    src={`${process.env.BACKEND_URL}/profilePhoto?userid=${localStorage.getItem(
                      "userid"
                    )}`}
                    alt="Picture of the author"
                    objectFit="revert"
                    width={100}
                    className="rounded-full"
                    height={100}
                  />
                  image ? (
                    <Image
                      unoptimized
                      // fill
                      src={`data:image/jpeg;base64,` + image}
                      alt="Picture of the author"
                      objectFit="revert"
                      width={100}
                      className="rounded-full"
                      height={100}
                    />
                  ) : (
                    <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
                  )
                }
                data={<NavbarLoggedBody image={image} />}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarLogged;
