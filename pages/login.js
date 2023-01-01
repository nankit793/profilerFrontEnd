import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import Link from "next/link";
import LoginForm from "../components/molecules/forms/LoginForm";
import { useRouter } from "next/router";
import { ifLogged } from "../components/ifLogged";
function Login() {
  const router = useRouter();

  useEffect(() => {
    if (ifLogged()) {
      if (localStorage.getItem("pathName")) {
        router.push(`${localStorage.getItem("pathName")}`);
      }
      router.push("/home");
    }
  });
  return (
    <>
      <Head>
        <title>Profiler - Login to world of profiles</title>
        <meta
          name="description"
          content="Profiler is an application in which you would create your profiles regarding different fields without having to worry about saving documents"
        ></meta>
        <link rel="canonical" href="/" />
      </Head>
      <div className=" h-screen flex flex-col items-center">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full flex items-center flex-col h-full justify-center">
          <Link href="/">
            <a className="cursor-pointer  mb-10 text-4xl font-semibold text-[black]">
              PROFILER
            </a>
          </Link>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;
