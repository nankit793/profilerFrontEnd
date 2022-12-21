import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as getProfileLIst from "../../redux-next/profileList/action";

function ProfileListDesktop(props) {
  const [profilesList, setProfilesList] = useState({});
  const [jobProfile, setJobProfile] = useState(false);

  const dispatch = useDispatch();
  const profileList = useSelector((state) => state.profileListReducer);
  useEffect(() => {
    const effectHandler = async () => {
      if (props.userid) {
        dispatch(getProfileLIst.getProfilesList({ userid: props.userid }));
      }
    };
    effectHandler();
  }, [dispatch && props.userid]);

  useEffect(() => {
    if (
      profileList &&
      profileList.profileList &&
      profileList.isList &&
      profileList.profileList.status === 200
    ) {
      setProfilesList(profileList.profileList.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileList]);
  if (props.isDesktop) {
    return (
      <>
        {profilesList && profilesList.jobProfile ? (
          <div className="w-full border rounded border hover:bg-color_3 p-3">
            <div className="font-bold text-text_1">Job Profile</div>
          </div>
        ) : (
          ""
        )}
        {profilesList && !profilesList.jobProfile ? (
          <div className="w-full flex justify-center align-center">
            User has not created any profile{" "}
          </div>
        ) : (
          ""
        )}
      </>
    );
  } else {
    {
      return <>phone</>;
    }
  }
}

export default ProfileListDesktop;
