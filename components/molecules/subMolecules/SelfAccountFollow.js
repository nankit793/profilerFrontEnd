/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import ButtonPrimary from "../../atoms/input/ButtonPrimary";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ifLogged } from "../../ifLogged";

function SelfAccountFollow(props) {
  const [followingCount, setFollowingCount] = useState(0);
  const followingList = useSelector((state) => state.followingListReducer);
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      followingList &&
      followingList.isFecthed &&
      followingList.userFollowingList
    ) {
      setFollowingCount(followingList.userFollowingList.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    followingList && followingList.isFecthed && followingList.userFollowingList,
  ]);

  useEffect(() => {
    if (ifLogged()) {
      setIsLoggedUser(true);
    } else {
      setIsLoggedUser(false);
    }
  }, []);

  return (
    <>
      <div className="flex text-text_1 gap-10 bg-color_2 mt-1 rounded-full w-full justify-center ">
        <div className="text-color_5 font-semibold text-[20px]">
          {props.followersCount}{" "}
          <div className="text-[15px] text-color_4 font-normal">Followers</div>
        </div>
        <div className="text-color_5 font-semibold text-[20px] ">
          {followingCount && followingCount}
          <div className=" font-normal text-color_4 text-[15px] hover:underline cursor-pointer">
            Following
          </div>
        </div>
        <div className="text-color_5 font-semibold text-[20px]">
          {props.blogsCount}
          <div className="text-[15px] text-color_4 font-normal">Blogs</div>
        </div>
      </div>
      <div className="flex gap-3 justify-center items-center mt-4">
        {isLoggedUser && (
          <div
            onClick={() => {
              router.push("/update/basicDetails");
            }}
            className="px-5 hover:border-color_9 text-sm py-2 rounded-full border text-text_1 cursor-pointer"
          >
            Edit profile
          </div>
        )}
        <div className="px-5 hover:border-color_9 py-2 text-sm rounded-full border text-text_1 cursor-pointer">
          copy profile link
        </div>
      </div>
    </>
  );
}

export default SelfAccountFollow;
