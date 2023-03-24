import React, { useState, useEffect } from "react";
import ButtonPrimary from "../../atoms/input/ButtonPrimary";
import InputField from "../../atoms/input/InputField";
import { validator } from "./validateFields";
import ThirdPartyAuthentication from "./thirdPartyAuthentication/ThirdPartyAuthentication";
import * as loginActions from "../../../redux-next/login/action";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../../atoms/AlertMessage";
import CircularProgresser from "../../atoms/CircularProgresser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { NotificationContainer } from "react-notifications";

function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const isRegistered = useSelector((state) => state.registerReducer);

  useEffect(() => {
    if (
      loginData &&
      loginData.loggedInUser &&
      loginData.loggedInUser.status === 200
    ) {
      successNotification("Successfully Logged In", "redirecting");
      setTimeout(() => {
        router.push(`/home/${userid}`);
      }, 2000);
    } else if (
      loginData &&
      loginData.loggedInUser &&
      loginData.loggedInUser.status === 400
    ) {
      warningNotification(loginData.loggedInUser.data.message, "Try again");
      loginData.loggedInUser = {};
      loginData.isLoggedIn = false;
    } else if (
      loginData &&
      loginData.loggedInUser &&
      loginData.loggedInUser.data
    ) {
      if (!loginData.loggedInUser.data.verification) {
        warningNotification(
          loginData.loggedInUser.data.message,
          "Please verify first"
        );
        localStorage.setItem("verifyId", userid);
        setTimeout(() => {
          router.push("/verifyUser");
        }, 2000);
      } else {
        warningNotification(loginData.loggedInUser.data.message, "Try again");
      }

      loginData.loggedInUser = {};
      loginData.isLoggedIn = false;
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData && loginData.loggedInUser]);

  const onInputChangeHandler = (e) => {
    if (e.target.name === "userid") {
      setUserid(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validate = validator(userid, password);
    if (validate) {
      setLoading(true);
      dispatch(loginActions.loginUser({ userid, password }));
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="md:min-w-[500px] mx-auto md:w-[40%] w-[100%]">
        <ThirdPartyAuthentication />
        <form onSubmit={onSubmit} method="POST">
          <div className="mt-2 text-right">
            {`don't have an account? `}
            <span
              className="w-full text-right text-[blue] cursor-pointer pr-2"
              onClick={() => {
                router.push("/register");
              }}
            >
              Create Account
            </span>
          </div>
          <div className="">
            <InputField
              label="Email"
              type="text"
              required={true}
              onChange={onInputChangeHandler}
              name="userid"
            />
          </div>
          <div className="pt-2">
            <InputField
              label="Password"
              type="password"
              required={true}
              name="password"
              onChange={onInputChangeHandler}
            />
          </div>
          <div
            className="w-full text-right text-[blue]  cursor-pointer pr-2"
            onClick={() => {
              router.push("/forgotPassword");
            }}
          >
            Forgot Password?
          </div>
          <div className="pt-2">
            <ButtonPrimary
              type="submit"
              className=" bg-color_7 text-color_2 h-[50px]  hover:bg-color_5 p-3 text-[16px]"
              color="primary"
              disabled={loading && userid && password ? true : false}
              disableFocusRipple={false}
              text={loading ? <CircularProgresser key="key" /> : "Login"}
            />
          </div>
        </form>
        <NotificationContainer />
      </div>
    </>
  );
}

export default LoginForm;
