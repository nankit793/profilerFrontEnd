import React from "react";

function ThirdPartyAuthentication() {
  return (
    <div className="flex w-full justify-between">
      <div className=" w-full  text-center p-2 py-4 md:p-5 bg-[#e9f7ec] bg-[#9cf1df] font-semibold cursor-pointer text-[black] border-black rounded-sm">
        Login with Google
      </div>
      <div className=" w-full ml-2 text-center py-4 p-2 md:p-5 bg-[#e9f7ec] bg-[#9cf1df] font-semibold cursor-pointer text-[black]  border-black rounded-sm">
        Login with GitHub
      </div>
    </div>
  );
}

export default ThirdPartyAuthentication;
