import React, { useEffect, useState } from "react";
import CircularProgresser from "../../atoms/CircularProgresser";
import ButtonPrimary from "../../atoms/input/ButtonPrimary";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function FollowersDetails(props) {
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const followingList = useSelector((state) => state.followingListReducer);

  const router = useRouter();
  useEffect(() => {
    if (
      (followingList &&
        followingList.userFollowingList &&
        followingList.userFollowingList != [] &&
        followingList.userFollowingList.includes(props.id)) ||
      false
    ) {
      setAlreadyFollowing(true);
    } else {
      setAlreadyFollowing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followingList, props.id]);

  return (
    <>
      <div>
        <div className="flex text-text_1 gap-8 flex-wrap">
          <div className="text-color_5 font-semibold">
            {props.followersCount}{" "}
            <div className="text-[17px] text-color_4 font-normal ">
              Followers
            </div>
          </div>
          <div className="text-color_5 font-semibold">
            {props.followingCount}{" "}
            <div className=" font-semibold text-color_4 font-normal  text-[17px] hover:underline cursor-pointer">
              Following
            </div>
          </div>
          <div className="text-color_5 font-semibold">
            {props.blogsCount}{" "}
            <div className="text-[17px] text-color_4 font-normal ">Blogs</div>
          </div>
        </div>
        <div className="border border-color_9 rounded-full mt-2">
          {!alreadyFollowing ? (
            <ButtonPrimary
              onClick={props.follow}
              type="button"
              className="text-color_5  h-[35px] rounded-full text-[16px]"
              color="primary"
              //   disabled={loading && userid && password ? true : false}
              text={false ? <CircularProgresser key="key" /> : "follow"}
            />
          ) : (
            <ButtonPrimary
              onClick={props.unfollow}
              type="button"
              className="text-color_5  hover:bg-color_9 h-[35px] bg-color_3 rounded-full text-[16px]"
              color="primary"
              //   disabled={loading && userid && password ? true : false}
              text={false ? <CircularProgresser key="key" /> : "following"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FollowersDetails;
