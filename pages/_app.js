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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as getFollowingList from "../redux-next/followerList/actions";
import * as getBookMarksList from "../redux-next/getBookmarks/actions";

import LinearProgress from "@mui/material/LinearProgress";
import * as getUserPortfolioBookmarks from "../redux-next/getPortfolioBookmarks/action";

function MyApp({ Component, pageProps }) {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [progress, setProgress] = useState(20);
  const router = useRouter();
  const dispatch = useDispatch();
  // const followingList = useSelector((state) => state.followingListReducer);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    const accesstoken = localStorage.getItem("accessToken");
    const userid = localStorage.getItem("userid");

    if (token && accesstoken && userid && router.query.uid === userid) {
      dispatch(getFollowingList.getFollowingList(""));
      dispatch(getBookMarksList.getUserBookmarks("data"));
      dispatch(getUserPortfolioBookmarks.getUserPortfolioBookmarks("data"));
    }
    if (token && accesstoken && userid) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    const accesstoken = localStorage.getItem("accessToken");
    const userid = localStorage.getItem("userid");
    console.log(token && accesstoken && userid);
    if (token && accesstoken && userid) {
      dispatch(getFollowingList.getFollowingList(""));
      dispatch(getBookMarksList.getUserBookmarks("data"));
      dispatch(getUserPortfolioBookmarks.getUserPortfolioBookmarks("data"));
    }
    if (token && accesstoken && userid) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
  }, []);

  return (
    <>
      <div className="">
        <div className="w-full z-20">
          {!isLoggedInUser && <Navbar />}
          {isLoggedInUser && <NavbarLogged />}
          <div className=" top-0 ">
            {/* <LinearProgress
              className="z-50"
              variant="indeterminate"
              value={progress}
            /> */}
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default withRedux(store)(MyApp);
