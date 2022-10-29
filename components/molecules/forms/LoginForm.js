import React, { useState, useEffect } from "react";
import ButtonPrimary from "../../atoms/input/ButtonPrimary";
import InputField from "../../atoms/input/InputField";
import { validator } from "./validateFields";
import ThirdPartyAuthentication from "./thirdPartyAuthentication/ThirdPartyAuthentication";
import * as loginActions from "../../../redux-next/login/action";
import { AlertMessage } from "../../atoms/AlertMessage";
import CircularProgresser from "../../atoms/CircularProgresser";
// dependencies

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);

  useEffect(() => {
    if (
      loginData &&
      loginData.loggedInUser &&
      loginData.loggedInUser.data &&
      loginData.loggedInUser.status === 200
    ) {
      router.push("/dashboard");
    } else {
      setShowError(true);
      setLoading(false);
      setErrorMessage("Invalid Username or Password");
    }
  }, [loginData && loginData.loggedInUser]);

  const onInputChangeHandler = (e) => {
    setShowError(false);
    if (e.target.name === "userid") {
      setUserid(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validate = validator(userid, password);
    if (validate) {
      setLoading(true);
      dispatch(loginActions.loginUser({ userid, password }));
    } else {
      setShowError(true);
      setErrorMessage("Invalid Username or   Password");
    }
  };

  return (
    <>
      <div className="md:min-w-[500px] md:w-[40%] w-[90%]">
        <ThirdPartyAuthentication />
        <div>
          {showError && (
            <div className="text-[red] font-inter absolute">{errorMessage}</div>
          )}
        </div>
        <form onSubmit={onSubmit} className="mt-9" method="POST">
          <div className="">
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
              className=" bg-[#03254c] text-[white] hover:text-[black] h-[50px]  hover:bg-[#9cf1df] p-3 font-semibold text-[16px]"
              color="primary"
              disableFocusRipple={false}
              text={loading ? [<CircularProgresser key="key" />] : "Login"}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
