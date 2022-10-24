import React from "react";
import ButtomPrimary from "../../atoms/input/ButtomPrimary";
import InputField from "../../atoms/input/InputField";

function LoginForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("on submit");
  };
  return (
    <>
      <div className="p-10 rounded-xl drop-shadow-xl bg-white md:w-[30%] w-[90%]">
        <form onSubmit={onSubmit} method="POST">
          <div className="pt-2">
            <InputField label="Email" type="email" required={true} />
          </div>
          <div className="pt-2">
            <InputField label="Password" type="password" required={true} />
          </div>
          <div className="pt-2">
            <ButtomPrimary
              type="submit"
              className="text-black bg-[aliceblue] text-[black] p-3 font-semibold text-[16px]"
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
