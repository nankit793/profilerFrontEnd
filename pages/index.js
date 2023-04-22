import Head from "next/head";
import React, { useEffect } from "react";

import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import ButtonPrimary from "../components/atoms/input/ButtonPrimary";
import { useRouter } from "next/router";
import { ifLogged } from "../components/ifLogged";
export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Profiler",
    url: "",
    logo: "",
    sameAs: [
      // social media links
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "8920249775",
        contactType: "customer service",
        email: "nankit793@gmail.com",
        contactOption: "TollFree",
        areaServed: ["IN"],
        availableLanguage: ["en", "hi"],
      },
    ],
  };
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
        <title>Profiler - create & and share your profiles</title>
        <meta
          name="description"
          content="Profiler is an application in which you would create your profiles regarding different fields without having to worry about saving documents"
        ></meta>
        <link rel="canonical" href="/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <div className="h-[50%] min-h-[300px] bg-color_9 flex flex-col items-start px-3 max-h-[700px] justify-center pt-14">
        <div className="flex gap-5 flex-col ">
          <div className="">
            <span className="whitespace-nowrap text-[25px]">
              Create Blogs and Portfolio <br />
            </span>
            <strong className="text-text_1 text-[25px] font-bold">
              FOR FREE!!!
            </strong>
          </div>
          <div className="px-6 py-2 bg-color_7 hover:bg-color_5 text-color_2 cursor-pointer w-fit rounded duration-200">
            start exploring
          </div>
          {/* <div className="md:flex text-center justify-center items-center p-2 w-full">
            <div>
              <ButtonPrimary
                type="button"
                text="Login"
                className="border border-color_1  py-4 px-10 text-[black] font-semibold drop-shadow-sm rounded-xl"
              />
            </div>
            <div className="md:ml-10">
              <ButtonPrimary
                type="button"
                text="Register"
                className="border-2 py-4 px-10 bg-[#a5eefa] text-[black]  font-semibold drop-shadow-sm rounded-xl"
              />
            </div>
          </div> */}
        </div>
        {/* <div className="md:text-[25px] text-[18px] mb-5 text-color_2 text-center font-bold ">
          1Million People are using Profiler as their Portfolio <br />
          <span className="italic">Join the team Now!</span>
        </div> */}
      </div>
      hyy
      {/* 
      <div className="h-full flex flex-col  md:flex-row md:justify-start justify-start items-center ">
        <div className="md:block hidden absolute top-20  h-screen overflow-hidden">
          <img
            src="https://cdn.wedevs.com/uploads/2019/04/Explore-the-easiest-WordPress-user-registration-plugin.png"
            alt=""
            width="100%"
            height="100%"
            layout="fill"
          />
        </div>
        <div className="md:hidden block ">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
            width="100%"
            height="100%"
            layout="fill"
            alt=""
          />
        </div>
        <div className="z-10 flex justify-center items-center md:mt-40 w-full flex-col">
          <div className=" text-2xl md:text-left text-center">
            Profiler helps you manage your profiles for different field. <br />{" "}
            <span className="font-semibold text-color_2">
              So stop sharing documents share your profiler!
            </span>
          </div>
          <div className="md:flex text-center justify-center items-center p-2 w-full mt-10">
            <div>
              <ButtonPrimary
                type="button"
                text="Login"
                className="border border-color_1  py-4 px-10 text-[black] font-semibold drop-shadow-sm rounded-xl"
              />
            </div>
            <div className="md:ml-10">
              <ButtonPrimary
                type="button"
                text="Register"
                className="border-2 py-4 px-10 bg-color_1 text-[black]  font-semibold drop-shadow-sm rounded-xl"
              />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
