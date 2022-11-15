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
      if (data.isPosted) {
        setPassword("");
        setConfirmPassword("");
        setUserid("");
        router.push("/login");
      } else if (data.user.status === 409) {
        setLoading(false);
        warningNotification(data.user.data.message, "Enter valid details");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data.user]);

  return (
    <>
      <div className=" md:min-w-[500px] md:w-[40%] w-[90%]">
        <ThirdPartyAuthentication />
        <form onSubmit={onSubmit} method="POST">
          <div
            className="w-full text-right text-[blue] underline  cursor-pointer pr-2"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </div>
          <div className="pt-2">
            <InputField
              label="Email"
              onChange={onInputChangeHandler}
              type="email"
              name="userid"
              required={true}
            />
          </div>
          <div className="pt-2">
            <InputField
              label="Password"
              onChange={onInputChangeHandler}
              type="password"
              name="password"
              required={true}
            />
          </div>
          <div className="pt-2">
            <InputField
              label="Confirm Password"
              onChange={onInputChangeHandler}
              type="password"
              name="confirmpass"
              required={true}
            />
          </div>
          <div className="pt-2">
            <ButtomPrimary
              type="submit"
              className=" bg-color_2 text-[white] hover:text-[black] h-[50px]  hover:bg-color_1 p-3 font-semibold text-[16px]"
              color="primary"
              text={loading ? [<CircularProgresser key="key" />] : "Register"}
              disableFocusRipple={false}
            />
          </div>
        </form>

        <NotificationContainer />
      </div>
    </>
  );
}
