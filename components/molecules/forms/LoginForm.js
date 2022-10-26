import React, { useState, useEffect } from "react";
import ButtonPrimary from "../../atoms/input/ButtonPrimary";
import InputField from "../../atoms/input/InputField";
import ThirdPartyAuthentication from "./thirdPartyAuthentication/ThirdPartyAuthentication";
import * as loginActions from "../../../redux-next/login/action";
// dependencies

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

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
    console.log("effected");
  }, []);

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitt");
    dispatch(loginActions.loginUser({ userid, password }));
  };
  return (
    <>
      <div className="mt-10 md:min-w-[500px] md:w-[40%] w-[90%]">
        <ThirdPartyAuthentication />
        <form onSubmit={onSubmit} method="POST">
          <div className="pt-2">
            <InputField
              label="Email"
              type="email"
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
          <div className="pt-2">
            <ButtonPrimary
              type="submit"
              className="text-black bg-[#03254c] text-[white] hover:text-[black] hover:bg-[#e9f7ec] p-3 font-semibold text-[16px]"
              color="primary"
              disableFocusRipple={false}
              text="Login"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
