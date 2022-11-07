import React from "react";

function ThirdPartyAuthentication() {
  return (
    <div className="flex w-full justify-between">
      <div className=" w-full  text-center p-2 py-3 md:py-4  bg-color_1  font-semibold cursor-pointer text-[black] border-black rounded-sm">
        Login with Google
      </div>
      <div className=" w-full ml-2 text-center py-3 p-2 md:py-4 bg-color_1 font-semibold cursor-pointer text-[black]  border-black rounded-sm">
        Login with GitHub
      </div>
    </div>
  );
}

export default ThirdPartyAuthentication;
