import React, { useEffect, useState } from "react";
import { ifLogged } from "../components/ifLogged";
import { useRouter } from "next/router";
import {
  successNotification,
  errorNotification,
} from "../components/atoms/AlertMessage";
import { NotificationContainer } from "react-notifications";

function VerifyUser() {
  const [OTP, setOTP] = useState("");
  const [userid, setUserid] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (ifLogged()) {
      if (localStorage.getItem("pathName")) {
        router.push(`${localStorage.getItem("pathName")}`);
      }
      router.push("/home");
    }
    let verifyId = localStorage.getItem("verifyId");
    localStorage.removeItem("verifyId");
    if (verifyId) {
      setUserid(verifyId);
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClick = async () => {
    if (!OTP) {
      errorNotification("OTP is required", "Try again");
      return;
    }
    try {
      const save = await fetch(
        "http://localhost:5000/user/register/verifyUser",
        {
          method: "POST",
          body: JSON.stringify({
            userid,
            otp: OTP,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const finalSave = await save.json();
      if (save && save.status === 200 && save.statusText === "OK") {
        successNotification(finalSave.message, "Redirecting to Login");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        errorNotification(finalSave.message, "Error");
      }
    } catch (error) {
      errorNotification("Internal Sever error", "try agan later");
    }
  };
  const regenateOTP = async () => {
    if (!userid) {
      errorNotification("userid is required", "Try again");
      return;
    }
    try {
      const save = await fetch(
        "http://localhost:5000/user/register/regenrateOTP",
        {
          method: "POST",
          body: JSON.stringify({
            userid,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const finalSave = await save.json();
      if (save && save.status === 200 && save.statusText === "OK") {
        successNotification(finalSave.message, "Check your mail");
      } else {
        errorNotification(finalSave.message, "Error");
      }
    } catch (error) {
      errorNotification("Internal Sever error", "try agan later");
    }
  };
  return (
    <>
      <div className="pt-12 h-[50vh] w-full bg-color_9 text-center">
        <div className="text-text_1 font-semibold pt-10 text-[30px]">
          verify yourself
        </div>
        <div className="text-color_7 pt-1 text-[18px] ">
          we have sent an OTP to your account! please check your mail
        </div>
      </div>
      <div className="mx-2 md:mx-0">
        <div className="drop-shadow md:w-max  max-w-[400px]  md:min-w-[400px] mx-auto  relative  top-[-100px] rounded-lg bg-color_2 p-3">
          <div className="rounded-r-md w-full mb-1 px-3 text-text_2 py-3 border">
            {userid ? userid : "invalid id"}
          </div>
          <div className="border rounded-md flex justify-start">
            <div className="py-3 px-5 rounded-l-md bg-color_8 text-text_1 font-semibold border-r">
              OTP
            </div>
            <input
              className="rounded-r-md w-full focus:outline-color_1 focus:outline px-3 text-text_1"
              maxlength={6}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              value={OTP}
              type="text"
              name="otp"
              //   onChange={onChange}
            />
          </div>
          <div
            onClick={regenateOTP}
            className="text-[blue] mt-2 cursor-pointer text-sm "
          >
            Resend OTP
          </div>
          <div
            onClick={() => {
              onClick();
            }}
            className="bg-color_7 py-3 px-6 rounded duration-200 w-min whitespace-nowrap mt-2 ml-auto text-color_2 hover:bg-color_5 cursor-pointer"
          >
            verify account
          </div>
          <NotificationContainer />
        </div>
      </div>
    </>
  );
}

export default VerifyUser;
