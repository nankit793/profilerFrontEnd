import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function dashboard(props) {
  const router = useRouter();
  useEffect(() => {
    let token;
    token = localStorage.getItem("idToken");
    if (!token) {
      router.push("/");
    }
  });
  return <div>only visible to logged in users</div>;
}

export default dashboard;
