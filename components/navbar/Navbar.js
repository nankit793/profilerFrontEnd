import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const handleClickevent = (path) => {
    if (path === "login") {
      router.push("/login");
    } else if (path === "register") {
      router.push("/register");
    } else if (path === "aboutUs") {
      router.push("/aboutUs");
    }
  };
  return (
    <>
      <div className=" md:block hidden py-5 bg-[#03254c] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <div className=" ml-2  w-min text-white font-semibold">PROFILER</div>
          <div className="flex">
            <Link href="/aboutUs">
              <a
                className="cursor-pointer font-semibold mx-2 text-[aliceblue] p-2"
                // onClick={() => handleClickevent("aboutUs")}
              >
                About Us
              </a>
            </Link>
            <Link href="/login">
              <a
                className="cursor-pointer mx-2  font-semibold text-[aliceblue] p-2"
                // onClick={() => handleClickevent("login")}
              >
                Login
              </a>
            </Link>
            <Link href="register">
              <a
                className="cursor-pointer mx-2 font-semibold text-[aliceblue] p-2"
                // onClick={() => handleClickevent("register")}
              >
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center md:hidden block py-5 bg-[#03254c] fixed top-0 w-full">
        <div className="ml-2 w-max font-semibold">PROFILER</div>
        <p>hello</p>
      </div>
    </>
  );
}

export default Navbar;
