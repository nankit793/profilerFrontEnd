import React, { useState, useEffect } from "react";
import ButtomPrimary from "../../atoms/input/ButtomPrimary";
import InputField from "../../atoms/input/InputField";
import * as registerActions from "../../../redux-next/register/action";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function RegisterForm() {
  const [user, setUser] = useState({
    userid: "",
    password: "",
  });
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("userid", user.userid);
    // formData.append("password", user.password);
    // console.log("first");
    function getUserData() {
      const userid = user.userid;
      const password = user.password;
      const data = {
        userid: userid,
        password: password,
      };
      return data;
    }
    const data = getUserData();
    dispatch(registerActions.postUserRegistration(data));
  };
  const onChangeHandler = (e) => {
    setUser({ [e.target.name]: e.target.value });
  };
  // useEffect(() => {
  //   console.log("use effect");
  // }, []);

  return (
    <>
      <div className="p-10 rounded-xl drop-shadow-xl bg-white max-w-[720px] md:w-[40%] w-[90%]">
        <form onSubmit={onSubmit} method="POST">
          <div className="pt-2">
            <InputField
              label="Email"
              onChange={onChangeHandler}
              type="email"
              name="userid"
              required={true}
            />
          </div>
          <div className="pt-2">
            <InputField
              label="Password"
              onChange={onChangeHandler}
              type="password"
              name="password"
              required={true}
            />
          </div>
          <div className="pt-2">
            <InputField
              label="Confirm Password"
              onChange={onChangeHandler}
              type="password"
              name="confirmpass"
              required={true}
            />
          </div>
          <div className="pt-2">
            <ButtomPrimary
              type="submit"
              className="text-black bg-[aliceblue] text-[black] p-3 font-semibold text-[16px]"
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
