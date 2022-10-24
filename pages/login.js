import React from "react";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import InputField from "../components/atoms/input/InputField";
import ButtomPrimary from "../components/atoms/input/ButtomPrimary";
import Link from "next/link";
import LoginForm from "../components/molecules/forms/LoginForm";
function login() {
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
      <Navbar />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Link href="/">
          <a className="cursor-pointer text-4xl mb-2 font-semibold text-[black]">
            PROFILER
          </a>
        </Link>
        <LoginForm />
      </div>
    </>
  );
}

export default login;
