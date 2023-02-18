import React from "react";

function ThirdPartyAuthentication() {
  return (
    <div className=" md:flex-row flex-col flex w-full justify-end mb-2 gap-4 ">
      <div className="px-4 text-center p-2 font-semibold cursor-pointer text-text_1 border rounded-3xl border-maroon">
        login with Google
      </div>
      <div className="px-4 text-center p-2 font-semibold cursor-pointer text-text_1 border rounded-3xl border-color_9">
        login with Linkdin
      </div>
    </div>
  );
}

export default ThirdPartyAuthentication;
