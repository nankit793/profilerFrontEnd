import React from "react";
import Avatar from "@mui/material/Avatar";

function Footer() {
  return (
    <>
      <div className="w-full bg-[black] pt-5 px-3 md:px-10">
        <div className="md:flex justify-between items-center">
          <div className="md:mb-0 mb-4 flex justify-center md:text-left md:ml-5 ">
            <Avatar
              alt="logo"
              variant="square"
              src="/images/logo.png"
              sx={{ width: 140, height: 35 }}
            />
          </div>
          <div className="md:w-[50%] flex justify-between text-text_2">
            <div>
              <div>Contact Us</div>
              <div>Career</div>
            </div>
            <div>
              <div>My Profile</div>
              <div>Explore</div>
            </div>
          </div>
        </div>
        <div className="text-center text-text_2 py-5">
          Improfile - blogs and portfolio made easy
        </div>
      </div>
    </>
  );
}

export default Footer;
