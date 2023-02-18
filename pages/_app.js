/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import React, { useEffect, useState } from "react";
// import App, { Container } from "next/app";
// import store from "../redux-next/store";
// import { wrapper } from "../redux-next/store";
import withRedux from "next-redux-wrapper";
import store from "../redux-next/store";
import NavbarLogged from "../components/navbar/NavbarLogged";
import Navbar from "../components/navbar/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const router = useRouter();

  // const store = createStore(reducer);
  // const token = localStorage.getItem("idToken")
  useEffect(() => {
    const token = localStorage && localStorage.getItem("idToken");
    const accesstoken = localStorage && localStorage.getItem("accessToken");
    const userid = localStorage.getItem("userid");
    if (token && accesstoken && userid) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
  }, [router]);

  return (
    <>
      <div className="">
        <div className="w-full z-10">
          {!isLoggedInUser && <Navbar />}
          {isLoggedInUser && <NavbarLogged />}
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default withRedux(store)(MyApp);
