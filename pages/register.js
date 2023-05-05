import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Head from "next/head";
import Link from "next/link";
import RegisterForm from "../components/molecules/forms/RegisterForm";
import { useRouter } from "next/router";
import { ifLogged } from "../components/ifLogged";
function Register() {
  const router = useRouter();

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
  useEffect(() => {
    if (ifLogged()) {
      if (localStorage.getItem("pathName")) {
        router.push(`${localStorage.getItem("pathName")}`);
      }
      router.push("/home");
    }
  });

  return (
    <div>
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
      <div className="pt-12">
        <div className="h-[50vh] w-full gradientColor text-center">
          <div className="text-color_2 font-semibold pt-10 text-[30px]">
            Sign up / Register
          </div>
        </div>
        <div className="md:mx-0 mx-2">
          <div className="md:w-max max-w-[500px] md:max-w-full mx-auto p-4 relative  top-[-200px] rounded-md border-color_10 bg-color_2 drop-shadow">
            {/* <Link href="/">
            <a className="cursor-pointer  mb-10 text-4xl font-semibold text-[black]">
              PROFILER
            </a>
          </Link> */}
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
