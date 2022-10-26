import React, { useState, useEffect } from "react";

// components requirements
import ButtomPrimary from "../../atoms/input/ButtonPrimary";
import InputField from "../../atoms/input/InputField";
import * as registerActions from "../../../redux-next/register/action";
import ThirdPartyAuthentication from "./thirdPartyAuthentication/ThirdPartyAuthentication";

// dependencies

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function RegisterForm() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.registerReducer);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerActions.postUserRegistration({ userid, password }));
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

  return (
    <>
      <div className="mt-10 md:min-w-[500px] md:w-[40%] w-[90%]">
        <ThirdPartyAuthentication />
        <form onSubmit={onSubmit} method="POST">
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
              className="text-black bg-[#03254c] text-[white] hover:text-[black] hover:bg-[#e9f7ec] p-3 font-semibold text-[16px]"
              color="primary"
              text="Register"
              disableFocusRipple={false}
            />
          </div>
        </form>
      </div>
    </>
  );
}
