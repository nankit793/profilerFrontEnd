import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import { useDispatch } from "react-redux";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import * as userJobProfile from "../../redux-next/getJobProfile/actions";
import { logout } from "../../components/logout";
import Footer from "../../components/footer/Footer";
import verifyId from "../../redux-next/otp";
import { errorNotification } from "../../components/atoms/AlertMessage";

// mui
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import CircularProgresser from "../../components/atoms/CircularProgresser";

function Index() {
  const [isUserFound, setIsUserFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userid, setUserid] = useState("");
  const [userBasicData, setUserBasicData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.basicDataReducer);

  useEffect(() => {
    if (userid) {
      dispatch(getBasicDataActions.getBasicData({ userid: userid }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

  useEffect(() => {
    if (userData && userData.userData && userData.userData.data) {
      if (
        userData.userData.status === 200 &&
        userData.userData.data.registered
      ) {
        setUserBasicData(userData.userData.data.newData);
        setIsUserFound(true);
      } else if (!userData.userData.data.registered) {
        setIsUserFound(false);
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <>
      <div className="md:h-screen flex flex-col justify-between">
        {loading && (
          <div className="w-full h-screen flex justify-center items-center">
            <CircularProgresser />
          </div>
        )}
        <div className="flex justify-start w-full h-full">
          <div className="md:block hidden w-[30%] h-full bg-color_6 ">
            <div className="h-[150px] w-[150px] border rounded-full bg-color_2 mx-auto my-5"></div>
          </div>
          <div className="overflow-y-scroll w-full"></div>
        </div>
      </div>
      {!isUserFound && !loading && (
        <>
          <div className="h-screen w-full flex items-center justify-center flex-col">
            <div className="">
              <NoAccountsIcon />
            </div>
            <div className="font-bold text-[20px] text-color_2 ">
              user has no job profile
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Index;
