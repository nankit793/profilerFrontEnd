import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import SwipeableTemporaryDrawer from "../molecules/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarBody from "./SearchBarBody";
import Avatar from "@mui/material/Avatar";
import Popover from "../molecules/Popover";
function Navbar() {
  const [showTheMenuBar, setShowTheMenuBar] = useState(false);
  const router = useRouter();
  const showButtonToggle = () => {
    if (showTheMenuBar === true) {
      setShowTheMenuBar(false);
    } else {
      setShowTheMenuBar(true);
    }
  };
  return (
    <>
      <div className="md:block hidden py-2  bg-color_7 w-full absolute top-0 z-20">
        <div className="flex justify-between items-center">
          <div className=" ml-2  w-min text-white font-semibold">
            <Avatar
              alt="logo"
              variant="square"
              src="/images/logo.png"
              sx={{ width: 140, height: 35 }}
            />
          </div>
          <div className="flex items-center">
            <Link href="/explore">
              <a
                className={`cursor-pointer text-[16px] font-semibold  mx-2 text-[white] p-2 ${
                  router.pathname === "/explore"
                    ? "text-color_1"
                    : "text-color_black"
                } `}
              >
                Explore
              </a>
            </Link>
            <Link href="/">
              <a
                className={`cursor-pointer text-[16px] font-semibold  mx-2 text-[white] p-2 ${
                  router.pathname === "/" ? "text-color_1" : "text-[white]"
                } `}
              >
                About
              </a>
            </Link>
            <Link href="/login">
              <a
                className={`cursor-pointer text-[16px]  font-semibold  mx-2 text-[white] p-2 ${
                  router.pathname === "/login" ? "text-color_1" : "text-[white]"
                } `}
              >
                Login
              </a>
            </Link>
            <Link href="register">
              <a
                className={`cursor-pointer text-[16px] font-semibold mx-2 px-4 bg-color_2  rounded text-color_7  py-2 ${
                  router.pathname === "/register"
                    ? "text-color_7  bg-color_1"
                    : ""
                } `}
              >
                Register
              </a>
            </Link>
            <SwipeableTemporaryDrawer
              anchor="right"
              click={<SearchIcon />}
              classNameDrawer="normal-case  mr-3 ml-1 cursor-pointer font-semibold text-[white] p-0  text-[15px]"
              data={<SearchBarBody />}
            />
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-between items-center md:hidden  py-4  bg-color_7 absolute top-0 z-20 ">
        <Avatar
          alt="logo"
          variant="square"
          src="/images/logo.png"
          sx={{ width: 140, height: 35 }}
        />
        <div className="flex justify-end gap-5 items-center">
          <SwipeableTemporaryDrawer
            anchor="right"
            click={<SearchIcon />}
            classNameDrawer="normal-case mr-3 cursor-pointer font-semibold text-[white] p-0  text-[15px]"
            data={<SearchBarBody />}
          />

          <Popover
            data={
              <>
                <div className="">
                  <div className="flex  w-full flex-col  text-right text-[14px] px-5 z-100">
                    <Link href="/explore">
                      <a
                        className={`cursor-pointer font-semibold mx-2  p-2 ${
                          router.pathname === "/explore"
                            ? "text-color_5"
                            : "text-color_black"
                        } `}
                      >
                        Explore
                      </a>
                    </Link>
                    <Link href="/">
                      <a
                        className={`cursor-pointer font-semibold mx-2  p-2 ${
                          router.pathname === "/aboutUs"
                            ? "text-color_5"
                            : "text-[black]"
                        } `}
                      >
                        About
                      </a>
                    </Link>
                    <Link href="/login">
                      <a
                        className={`cursor-pointer font-semibold mx-2 p-2 ${
                          router.pathname === "/login"
                            ? "text-color_5"
                            : "text-[black]"
                        } `}
                      >
                        Login
                      </a>
                    </Link>
                    <Link href="register">
                      <a
                        className={`cursor-pointer font-semibold mx-2 p-2 ${
                          router.pathname === "/register"
                            ? "text-color_5"
                            : "text-[black]"
                        } `}
                      >
                        Register
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            }
            text={
              <div className="text-color_2 pr-5 bg-color_7 text-color_2">
                <Menu />
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
