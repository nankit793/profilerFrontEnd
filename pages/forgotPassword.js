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
// depencies
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// const { Auth, LoginCredentials } = require("two-step-auth");

function forgotPassword() {
  const [userid, setUserid] = useState("");
  const [otp, setOtp] = useState("");
  const [otpChecker, setOtpChecker] = useState();
  const [isMailVerified, serIsMailVerified] = useState(false);
  const [sendOrResend, setSendOrResend] = useState("Send");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("idToken")
    ) {
      if (localStorage.getItem("pathName")) {
        router.push(`${localStorage.getItem("pathName")}`);
      }
      router.push("/dashboard");
    }
  }, []);

  const onInputChangeHandler = (e) => {
    if (!isMailVerified) {
      if (e.target.name === "userid") {
        setUserid(e.target.value);
      } else if (e.target.name == "otpfield") {
        setOtp(e.target.value);
      }
    } else {
      warningNotification(
        "Cannot change this field after mail is verified",
        "Note"
      );
    }
  };

  const onInputChangeHandlerTwo = (e) => {
    if (isMailVerified) {
      if (e.target.name == "password") {
        setPassword(e.target.value);
      } else if (e.target.name == "confirmPassword") {
        setConfirmPassword(e.target.value);
      }
    } else {
      warningNotification("Mail needs to be verified first", "Note");
    }
  };

  const sendOtpHandler = async () => {
    if (!isMailVerified) {
      if (userid.length === 0) {
        warningNotification("email id must be provided", "error");
      } else {
        try {
          const body = {
            userRegistration: true,
            isOTP: true,
            userid,
          };
          const result = await getOTP(body);
          const final = await result.json();
          if (result.status === 200) {
            successNotification(final.message, "OTP sent to your Mail");
            setOtpChecker(final.otp);
            console.log(final.otp);
            setSendOrResend("Resend");
          } else {
            warningNotification(final.message, "error");
          }
        } catch (error) {
          errorNotification(error);
        }
      }
    } else {
      successNotification("mail is already verified");
    }
  };

  const verifyOtpHandler = (e) => {
    if (isMailVerified) {
      successNotification("mail is already verified");
    } else {
      if (otp.length === 0) {
        if (!otpChecker) {
          warningNotification("Generate an OTP", "error");
        } else {
          warningNotification("Enter OTP", "error");
        }
      } else if (otpChecker == otp) {
        successNotification(
          "You can change your password now",
          "Email Verified"
        );
        serIsMailVerified(true);
      } else {
        errorNotification("Enter correct OTP", "Wrong OTP");
      }
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!isMailVerified) {
      errorNotification("Email needs to be verified first", "Warning");
    } else {
      if (password !== confirmPassword) {
        warningNotification(
          "please enter same password on both the fields",
          "password do not match"
        );
      } else {
        try {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userid: userid,
              newPassword: password,
            }),
          };
          const result = await fetch(
            "http://localhost:5000/user/forgotPassword",
            requestOptions
          );
          const final = await result.json();
          if (result && result.status === 200) {
            successNotification(final.message, "Redirect to Login");
          }
        } catch (error) {
          successNotification(error);
        }
      }
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center max-h-[1000px]">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full h-full md:flex items-center h-full justify-between">
          <div className="w-full h-full flex justify-center flex-col items-center bg-[#eff4f9] align-center">
            <Link href="/">
              <a className="cursor-pointer  mb-10 text-4xl font-semibold text-[black]">
                PROFILER
              </a>
            </Link>
            <div>Forgot password?? releax we have got you covered</div>
            <div className="md:min-w-[500px] md:w-[40%] w-[90%] mt-4">
              <div className="flex justify-between ">
                <div className="w-full ">
                  <InputField
                    label="Mail"
                    type="email"
                    required={true}
                    name="userid"
                    onChange={onInputChangeHandler}
                  />
                </div>
                <div className="w-[200px]" onClick={sendOtpHandler}>
                  <ButtonPrimary
                    type="button"
                    className=" bg-color_2  mt-[2px] ml-2 text-[white] whitespace-nowrap hover:text-[black] h-[50px]  hover:bg-color_1 font-semibold text-[16px]"
                    color="primary"
                    disableFocusRipple={true}
                    // text={loading ? [<CircularProgresser key="key" />] : "Login"}
                    text={`${sendOrResend} OTP`}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="w-full">
                  <InputField
                    label="Enter OTP"
                    type="text"
                    required={true}
                    name="otpfield"
                    onChange={onInputChangeHandler}
                  />
                </div>
                <div className="w-[200px]" onClick={verifyOtpHandler}>
                  <ButtonPrimary
                    type="button"
                    className=" bg-color_2  mt-[2px] ml-2 text-[white] whitespace-nowrap hover:text-[black] h-[50px]  hover:bg-color_1 font-semibold text-[16px]"
                    color="primary"
                    disableFocusRipple={true}
                    // text={loading ? [<CircularProgresser key="key" />] : "Login"}
                    text="Verify OTP"
                  />
                </div>
              </div>
              <form onSubmit={handleSubmitPassword}>
                <div className="w-full mt-2">
                  <InputField
                    label="New Password"
                    type="password"
                    required={true}
                    name="password"
                    value={password}
                    onChange={onInputChangeHandlerTwo}
                  />
                </div>
                <div className="w-full mt-2">
                  <InputField
                    label="Confirm New Password"
                    type="password"
                    required={true}
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={onInputChangeHandlerTwo}
                  />
                </div>
                <div
                  className="w-full text-right text-[blue] underline  cursor-pointer pr-2"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Login
                </div>
                <div className="w-full">
                  <ButtonPrimary
                    type="submit"
                    className={` bg-color_2  mt-2 text-[white] whitespace-nowrap hover:text-[black] h-[50px]  hover:bg-color_1 font-semibold text-[16px]`}
                    color="primary"
                    disableFocusRipple={true}
                    // text={loading ? [<CircularProgresser key="key" />] : "Login"}
                    text="Create Password"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="w-full h-full flex justify-center flex-col items-center align-center">
            Some Content text here
          </div>
        </div>

        <NotificationContainer />
      </div>
    </>
  );
}

export default forgotPassword;
