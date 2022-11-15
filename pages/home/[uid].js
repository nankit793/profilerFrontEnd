import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import { useDispatch } from "react-redux";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import { logout } from "../../components/logout";
function Uid(props) {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [userid, setUserid] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.basicDataReducer);
  useEffect(() => {
    let token, userid;
    token = localStorage.getItem("idToken");
    userid = localStorage.getItem("userid");
    if (!token || !userid) {
      setIsLoggedInUser(false);
    } else {
      setIsLoggedInUser(true);
    }
    const uid = router.query.uid;
    if (!uid && !userid) {
      logout();
    }
    setUserid(uid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoggedInUser, router, router.query]);

  useEffect(() => {
    if (userid) {
      dispatch(getBasicDataActions.getBasicData({ userid: userid }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch && userid]);

  return (
    <>
      {!isLoggedInUser && <Navbar />}
      {isLoggedInUser && <NavbarLogged />}
      {/* User do not exist */}
    </>
  );
}

export default Uid;
