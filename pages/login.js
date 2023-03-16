import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import Link from "next/link";
import LoginForm from "../components/molecules/forms/LoginForm";
import { useRouter } from "next/router";
import { ifLogged } from "../components/ifLogged";
import Image from "next/image";
function Login() {
  const router = useRouter();
  useEffect(() => {
    if (ifLogged()) {
      if (localStorage.getItem("pathName")) {
        router.push(`${localStorage.getItem("pathName")}`);
      }
      router.push("/home");
    }
    // document.body.style.background = "aliceblue";
  });
  return (
    <>
      <Head>
        <title>Profiler - Login to world of Blogs and Portfolios</title>
        <meta
          name="description"
          content="Profiler is an application in which you would create your profiles regarding different fields without having to worry about saving documents"
        ></meta>
        <link rel="canonical" href="/" />
      </Head>
      <div className="pt-12">
        <div className="h-[50vh] w-full bg-color_9 text-center ">
          <div className="text-color_7  pt-10 text-[30px]">Login</div>
        </div>
        <div className="mx-2 md:mx-0">
          <div className="  drop-shadow md:w-max max-w-[500px] md:max-w-full mx-auto p-4 relative  top-[-200px] rounded-lg  bg-color_2">
            {/* <div className="text-center"> */}
            {/* <Link href="/">
            <a className="cursor-pointer text-4xl font-semibold text-[black]">
            PROFILER
            </a>
          </Link> */}
            {/* </div> */}
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
