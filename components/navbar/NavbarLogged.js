import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SwipeableTemporaryDrawer from "../molecules/Drawer";
import NavbarLoggedBody from "./NavbarLoggedBody";
import SearchBarBody from "./SearchBarBody";
function NavbarLogged() {
  const router = useRouter();
  return (
    <>
      <div className="py-3 bg-color_7 drop-shadow w-full ">
        <div className="flex justify-between items-center">
          <div
            className=" ml-2 text-[18px] w-min text-color_2 font-bold cursor-pointer"
            onClick={() => {
              router.push(`/home/${localStorage.getItem("userid")}`);
            }}
          >
            PROFILER
          </div>
          <div className="flex items-center mr-5">
            <div className="md:block hidden">
              <Link href="/">
                <a
                  className={`cursor-pointer text-[14px] font-bold mx-2 text-color_2  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-color_2"
                  } `}
                >
                  ABOUT
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer text-[14px] font-bold mx-2 text-color_2 ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-color_2"
                  } `}
                >
                  CONTACT
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer text-[14px] font-bold mx-2 text-color_2  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-color_2"
                  } `}
                >
                  FAQs
                </a>
              </Link>
            </div>
            <div className="">
              <SwipeableTemporaryDrawer
                anchor="right"
                click={<SearchIcon />}
                classNameDrawer="text-color_2 hover:bg-color_2"
                data={<SearchBarBody />}
              />
            </div>
            <div className="text-color_2 rounded-full w-[40px] flex justify-center border bg-white">
              <SwipeableTemporaryDrawer
                anchor="right"
                click={<PersonIcon />}
                data={<NavbarLoggedBody />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarLogged;
