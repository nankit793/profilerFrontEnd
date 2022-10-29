import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Close } from "@mui/icons-material";

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
      <div className="rounded-xl md:block hidden py-2 bg-[#03254c] w-full ">
        <div className="flex justify-between items-center">
          <div className=" ml-2  w-min text-white font-semibold">PROFILER</div>
          <div className="flex">
            <Link href="/">
              <a
                className={`cursor-pointer font-semibold mx-2 text-[white] p-2 ${
                  router.pathname === "/aboutUs"
                    ? "text-[#9cf1df]"
                    : "text-[white]"
                } `}
              >
                About Us
              </a>
            </Link>
            <Link href="/login">
              <a
                className={`cursor-pointer font-semibold mx-2 text-[white] p-2 ${
                  router.pathname === "/login"
                    ? "text-[#9cf1df]"
                    : "text-[white]"
                } `}
              >
                Login
              </a>
            </Link>
            <Link href="register">
              <a
                className={`cursor-pointer font-semibold mx-2 text-[white] p-2 ${
                  router.pathname === "/register"
                    ? "text-[#9cf1df]"
                    : "text-[white]"
                } `}
              >
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-3xl w-full flex justify-between items-center md:hidden block py-5  bg-[#03254c] w-full">
        <div className="ml-2  w-min text-white font-semibold">PROFILER</div>
        <div
          className={`mr-4 z-10 w-min  ${
            showTheMenuBar ? "text-black" : "text-white"
          } text-white font-semibold`}
          onClick={showButtonToggle}
        >
          {showTheMenuBar ? <Close /> : <Menu />}
        </div>
        <div
          className={`absolute rounded-xl drop-shadow-xl  right-2 top-2  bg-[white] ${
            showTheMenuBar ? "block" : "hidden"
          } `}
        >
          <div className="flex flex-col mt-[40px] text-right text-[14px]">
            <Link href="/">
              <a
                className={`cursor-pointer font-semibold mx-2  p-2 ${
                  router.pathname === "/aboutUs"
                    ? "text-[#9cf1df]"
                    : "text-[black]"
                } `}
              >
                About Us
              </a>
            </Link>
            <Link href="/login">
              <a
                className={`cursor-pointer font-semibold mx-2 p-2 ${
                  router.pathname === "/login"
                    ? "text-[#9cf1df]"
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
                    ? "text-[#9cf1df]"
                    : "text-[black]"
                } `}
              >
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
