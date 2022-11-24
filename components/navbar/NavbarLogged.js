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
      <div className=" py-4 bg-color_2 w-full ">
        <div className="flex justify-between items-center">
          <div
            className=" ml-2  w-min text-white font-semibold cursor-pointer"
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
                  className={`cursor-pointer font-semibold mx-2 text-[white]  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-[white]"
                  } `}
                >
                  About
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer font-semibold mx-2 text-[white]  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-[white]"
                  } `}
                >
                  Contact
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`cursor-pointer font-semibold mx-2 text-[white]  ${
                    router.pathname === "/aboutUs"
                      ? "text-color_1"
                      : "text-[white]"
                  } `}
                >
                  FAQs
                </a>
              </Link>
            </div>
            <SwipeableTemporaryDrawer
              anchor="right"
              click={<SearchIcon />}
              classNameDrawer="normal-case  cursor-pointer font-semibold text-[white] p-0  text-[15px]"
              data={<SearchBarBody />}
            />
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
