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
// dependencies

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { NotificationContainer } from "react-notifications";

function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const isRegistered = useSelector((state) => state.registerReducer);
  useEffect(() => {
    if (isRegistered && isRegistered.user) {
      if (isRegistered.isPosted && isRegistered.user.status === 200) {
        successNotification(
          "You have registered",
          "Login with same credentials"
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered && isRegistered.user && isRegistered.isPosted]);

  useEffect(() => {
    if (
      loginData &&
      loginData.loggedInUser &&
      loginData.loggedInUser.status === 200
    ) {
      successNotification("Successfully Logged In", "redirecting");
      router.push("/home");
    } else if (
      loginData &&
      loginData.loggedInUser &&
      loginData.loggedInUser.status === 400
    ) {
      warningNotification(
        loginData.loggedInUser.data.message
          ? loginData.loggedInUser.data.message
          : "Enter Valid Username/Password",
        "Try again"
      );
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
      <div className="md:min-w-[500px] md:w-[40%] w-[90%]">
        <ThirdPartyAuthentication />

        <form onSubmit={onSubmit} method="POST">
          <div
            className="w-full text-right text-[blue] underline cursor-pointer pr-2"
            onClick={() => {
              router.push("/register");
            }}
          >
            Create Account
          </div>
          <div className="pt-2">
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
            className="w-full text-right text-[blue] underline  cursor-pointer pr-2"
            onClick={() => {
              router.push("/forgotPassword");
            }}
          >
            Forgot Password?
          </div>
          <div className="pt-2">
            <ButtonPrimary
              type="submit"
              className=" bg-color_2 text-[white] hover:text-[black] h-[50px]  hover:bg-color_1 p-3 font-semibold text-[16px]"
              color="primary"
              disabled={loading ? true : false}
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
