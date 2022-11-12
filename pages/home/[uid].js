import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import NavbarLogged from "../../components/navbar/NavbarLogged";
function uid(props) {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let token, mail;
    token = localStorage.getItem("idToken");
    mail = localStorage.getItem("mail");
    if (!token && !mail) {
      setIsLoggedInUser(false);
    } else {
      setIsLoggedInUser(true);
    }
    const uid = router.query.uid;
    //fetch operation
    // if (uid.status === 200) {
    // } else {
    //   router.push("/login");
    // }
  }, []);
  return (
    <>
      {!isLoggedInUser && <Navbar />}
      {isLoggedInUser && <NavbarLogged />}
      {/* User do not exist */}
    </>
  );
}

export default uid;
