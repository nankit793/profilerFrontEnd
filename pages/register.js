import React from "react";
import Navbar from "../components/navbar/Navbar";
import Head from "next/head";
import Link from "next/link";
import RegisterForm from "../components/molecules/forms/RegisterForm";
function register() {
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
  return (
    <>
      <Head>
        <title>Profiler - Get yourself registered for Free</title>
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
      <div className="imageBackground h-screen flex flex-col items-center ">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full flex items-center flex-col h-full justify-center">
          <Link href="/">
            <a className="cursor-pointer  mb-10 text-4xl font-semibold text-[black]">
              PROFILER
            </a>
          </Link>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
export default register;
