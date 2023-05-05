import React, { useState, useEffect } from "react";

// components requirements
import ButtomPrimary from "../../atoms/input/ButtonPrimary";
import InputField from "../../atoms/input/InputField";
import * as registerActions from "../../../redux-next/register/action";
import ThirdPartyAuthentication from "./thirdPartyAuthentication/ThirdPartyAuthentication";
import CircularProgresser from "../../atoms/CircularProgresser";
import { validator } from "./validateFields";
import {
  successNotification,
  warningNotification,
} from "../../atoms/AlertMessage";
import { ifLogged } from "../../ifLogged";

// dependencies
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { ReactNotifications } from "react-notifications-component";
import { useRouter } from "next/router";
import { NotificationContainer } from "react-notifications";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export default function RegisterForm() {
  const [userid, setUserid] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const data = useSelector((state) => state.registerReducer);
  const loginData = useSelector((state) => state.loginUserReducers);

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    const validate = validator(userid, password);
    const passMatch = password === confirmPassword;

    setLoading(true);
    if (validate && passMatch) {
      dispatch(registerActions.postUserRegistration({ userid, password }));
    } else if (!validate) {
      warningNotification("Invalid Username/Password", "Enter valid details");
    } else {
      warningNotification(
        "Please enter same password on both the fields",
        "Password do not match"
      );
    }
    setLoading(false);
  };

  const onInputChangeHandler = (e) => {
    if (e.target.name === "userid") {
      setUserid(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (data && data.user) {
      if (data.isPosted && data.user.data && data.user.data.redirectToVerify) {
        setPassword("");
        setConfirmPassword("");
        setUserid("");
        successNotification(
          data.user.data.message,
          "Redirecting to verification"
        );
        localStorage.setItem("verifyId", userid);
        setTimeout(() => {
          router.push("/verifyUser");
        }, 2000);
      } else if (data.user.status === 409) {
        setLoading(false);
        warningNotification(data.user.data.message, "Enter valid details");
      }
      data.user = {};
      data.isPosted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data.user]);

  return (
    <>
      <div className=" md:min-w-[500px] md:w-[40%] ">
        <ThirdPartyAuthentication />
        <form onSubmit={onSubmit} method="POST">
          <div className="mt-2 text-mds text-right">
            already have account?
            <span
              className="w-full text-right text-[blue]  cursor-pointer pr-2"
              onClick={() => {
                router.push("/login");
              }}
            >
              {" "}
              Login{" "}
            </span>
          </div>
          <div className="mt-1">
            <TextField
              id=""
              className=" w-full outline-none"
              required={true}
              value={userid}
              type="email"
              size="small"
              fullWidth={true}
              onChange={onInputChangeHandler}
              sx={{ backgroundColor: "transparent" }}
              label="Email"
              name="userid"
              variant="outlined"
            />
          </div>
          <div className="pt-2">
            <TextField
              id=""
              className=" w-full outline-none"
              required={true}
              value={password}
              type="password"
              size="small"
              fullWidth={true}
              onChange={onInputChangeHandler}
              sx={{ backgroundColor: "transparent" }}
              label="password"
              name="password"
              variant="outlined"
            />
          </div>
          <div className="pt-2">
            <TextField
              id=""
              className=" w-full outline-none"
              required={true}
              value={confirmPassword}
              type="password"
              size="small"
              fullWidth={true}
              onChange={onInputChangeHandler}
              sx={{ backgroundColor: "transparent" }}
              label="confirm password"
              name="confirmpass"
              variant="outlined"
            />
          </div>
          <div className="pt-2">
            <ButtomPrimary
              type={!loading ? "submit" : "button"}
              className="capitalize gradientColor rounded cursor-pointer text-color_2 h-[50px]  hover:bg-color_5 p-3 text-[16px]"
              color="primary"
              disabledClass="capitalize hover:bg-color_7 bg-color_7 cursor-pointer text-color_2 h-[50px]  p-3 text-[16px]"
              disabled={
                !loading && !(userid && password && confirmPassword)
                  ? true
                  : false
              }
              disableFocusRipple={false}
              text={loading ? <CircularProgresser key="key" /> : "Register"}
            />
          </div>
        </form>
        <NotificationContainer />
      </div>
    </>
  );
}
