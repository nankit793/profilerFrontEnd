import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
// import OTPInput from "otp-input-react";
import { NotificationContainer } from "react-notifications";
import InputField from "../components/atoms/input/InputField";
import ButtonPrimary from "../components/atoms/input/ButtonPrimary";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../components/atoms/AlertMessage";
import getOTP from "../redux-next/otp";
import { ifLogged } from "../components/ifLogged";
// depencies
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// const { Auth, LoginCredentials } = require("two-step-auth");

function ForgotPassword() {
  const [userid, setUserid] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (ifLogged()) {
      if (localStorage.getItem("pathName")) {
        router.push(`${localStorage.getItem("pathName")}`);
      }
      router.push("/home");
    }
  });
  const sendOtpHandler = async () => {
    if (userid.length === 0) {
      warningNotification("email id must be provided", "error");
    } else {
      try {
        const body = {
          userid,
        };
        const result = await getOTP(body);
        const final = await result.json();
        if (result.status === 200) {
          successNotification(final.message, "OTP sent to your Mail");
          setOtpGenerated(true);
        } else {
          warningNotification("Enter valid mail", "warning");
        }
      } catch (error) {
        // errorNotification(error.message, "error");
      }
    }
  };

  const handleSubmitPassword = async (e) => {
    if (password !== confirmPassword) {
      warningNotification(
        "please enter same password on both the fields",
        "password do not match"
      );
    } else if (password.length < 5) {
      warningNotification(
        "Minimum length of password is: 5",
        "create valid password"
      );
    } else if (!otp) {
      warningNotification("otp is required", "enter otp");
    } else {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: userid,
            newPassword: password,
            confirmPassword,
            otp,
          }),
        };
        const result = await fetch(
          "http://localhost:5000/user/forgotPassword",
          requestOptions
        );
        const final = await result.json();
        if (result && result.status === 200) {
          successNotification(final.message, "Redirect to Login");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          errorNotification(final.message, "warning");
        }
      } catch (error) {
        errorNotification(error.message);
      }
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center max-h-[1000px] pt-14">
        <div className="h-[50vh] w-full bg-color_9 text-center">
          <div className="text-color_7  pt-10 text-[30px]">
            Forgot Password?
          </div>
          <div className="text-color_7 text-[20px]">
            no worries we have got you covered!
          </div>
        </div>
        <div className="drop-shadow md:w-max min-w-[90%] md:min-w-[400px] max-w-[500px] md:max-w-full mx-auto p-4 relative  top-[-100px] rounded-lg  bg-color_2">
          {otpGenerated ? (
            <>
              <div className="w-full p-3 rounded text-text_2">
                {userid ? userid : "invalid id"}
              </div>
              <div className="border my-1 rounded-md flex justify-start">
                <div className="py-3 px-5 rounded-l-md bg-color_8 text-text_1 font-semibold border-r">
                  OTP
                </div>
                <input
                  className="rounded-r-md w-full focus:outline-color_1 focus:outline px-3 text-text_1"
                  maxlength={6}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  value={otp}
                  type="text"
                />
              </div>
              <div className="my-2">
                <InputField
                  label="password"
                  type="password"
                  required={true}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <InputField
                label="confirm password"
                type="text"
                required={true}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <div
                onClick={handleSubmitPassword}
                className="bg-color_7 hover:bg-color_5 duration-200 cursor-pointer py-3 px-5 mt-1 rounded ml-auto whitespace-nowrap text-[white]  w-min"
              >
                Create new password
              </div>
            </>
          ) : (
            <>
              <InputField
                label="Email"
                type="text"
                required={true}
                onChange={(e) => {
                  setUserid(e.target.value);
                }}
              />
              <div
                onClick={sendOtpHandler}
                className="bg-color_7 hover:bg-color_5 duration-200 cursor-pointer py-3 px-5 mt-1 rounded ml-auto whitespace-nowrap text-[white]  w-min"
              >
                Send OTP
              </div>
            </>
          )}
        </div>
        <NotificationContainer />
      </div>
    </>
  );
}

export default ForgotPassword;
