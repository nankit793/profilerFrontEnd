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
      <div className="h-[50%] gradientColor min-h-[300px] flex flex-col items-start px-3 max-h-[700px] justify-center pt-14">
        <div className="flex gap-5 flex-col ">
          <div className="">
            <span className="whitespace-nowrap text-[25px] text-color_2">
              Create Blogs and Portfolio <br />
            </span>
            <strong className="text-color_2 text-[25px] font-bold">
              FOR FREE!!!
            </strong>
          </div>
          <div className="px-6 py-2 bg-color_2 text-color_7 font-semibold cursor-pointer w-fit rounded-full duration-200">
            Start Exploring
          </div>
        </div>
      </div>
      <div className=" justify-center bg-color_8 flex items-center h-[40vh]">
        <div className="text-text_1 font-bold text-[40px] text-center px-5">
          Everything you need to manage your
          <div>Blogs and Portfolios</div>
        </div>
      </div>
      <div className="flex p-2 gap-10 bg-color_8 flex-wrap justify-center  pb-20">
        <div className="max-w-[300px] md:w-[25%] bg-color_2 border drop-shadow rounded-xl ">
          <div className="text-center text-text_1 text-[30px] font-bold">
            Blogs
          </div>
          <div className="text-text_2 p-3">
            A blog, short for weblog, is a frequently updated web page used for
            personal commentary or business content. Blogs are often interactive
            and include sections at the bottom of individual blog posts where
            readers can leave comments.
          </div>
        </div>
        <div className="md:w-[25%] max-w-[300px]  bg-color_2 border drop-shadow rounded-xl ">
          <div className="text-center text-text_1 text-[30px] font-bold">
            Portfolio
          </div>
          <div className="text-text_2 p-3">
            A portfolio is a compilation of academic and professional materials
            that exemplifies your beliefs, skills, qualifications, education,
            training, and experiences.
          </div>
        </div>
      </div>
      <div className="h-[40vh] mt-20">
        <div className="text-text_1 font-bold text-[40px] text-center px-5">
          More than 2 Million people
          <div>have already chosen us!</div>
        </div>
        <div className="flex gap-5 justify-center mt-5">
          <div className="bg-color_2 border-color_7 border  px-7 py-1 text-color_7 text-[25px] rounded-full">
            Login
          </div>
          <div className="bg-color_7   px-5 py-1 text-color_2 text-[25px] rounded-full">
            Sign Up
          </div>
        </div>
      </div>
    </>
  );
}
