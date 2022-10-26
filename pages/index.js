import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import ButtonPrimary from "../components/atoms/input/ButtonPrimary";
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
      <Navbar />
      <div className="h-full flex flex-col md:flex-row md:justify-start justify-start items-center ">
        <div className="md:block hidden absolute top-20">
          <img
            src="https://cdn.wedevs.com/uploads/2019/04/Explore-the-easiest-WordPress-user-registration-plugin.png"
            alt=""
          />
        </div>
        <div className="md:hidden block ">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
            alt=""
          />
        </div>
        <div className="z-10 flex justify-center items-center md:mt-40 w-full flex-col">
          <div className=" text-2xl md:text-left text-center">
            Profiler helps you manage your profiles for different field. <br />{" "}
            <span className="font-semibold text-[#03254c]">
              {" "}
              So stop sharing documents share your profiler!
            </span>
          </div>
          <div className="flex justify-center items-center w-full mt-10">
            <div>
              <ButtonPrimary
                type="button"
                text="Login"
                className="border  py-4 px-10 text-[black] font-semibold drop-shadow-sm rounded-xl"
              />
            </div>
            <div className="ml-10">
              <ButtonPrimary
                type="button"
                text="Register"
                className="border-2 py-4 px-10 bg-[#9cf1df] text-[black]  font-semibold drop-shadow-sm rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
