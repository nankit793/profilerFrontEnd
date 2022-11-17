import React, { useEffect, useState } from "react";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import ButtonPrimary from "../../components/atoms/input/ButtonPrimary";
// import UserInputFields onChange={onChange} from "../../components/molecules/UserInputFields onChange={onChange}";
// dependencies
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authenticate } from "../../components/authentication";
import Footer from "../../components/footer/Footer";
import UserInputFields from "../../components/molecules/UserInputFields";

function BasicDetails() {
  const [userBasicData, setUserBasicData] = useState({});

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const userData = useSelector((state) => state.basicDataReducer);

  useEffect(() => {
    const auth = async () => {
      await authenticate(loginData, registerData);
      dispatch(
        getBasicDataActions.getBasicData({
          userid: localStorage.getItem("userid"),
        })
      );
    };
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      userData &&
      userData.userData &&
      userData.isUser == true &&
      userData.userData.status === 200
    ) {
      setUserBasicData(userData.userData.data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);
  const onChange = (e) => {
    // setUserBasicData([e.target.name]: e.target.value)
  };
  return (
    <>
      <div className="w-full">
        <NavbarLogged />
      </div>
      <div className="bg-white md:px-10 px-3 pt-3 mt-10 rounded-xl m-4 md:mx-20 pb-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-text_1 font-bold my-5 text-[23px] ">
            Edit Basic Details
          </div>
          <div className="">
            <ButtonPrimary
              type="button"
              text="Save Changes"
              // icon={<ModeEditOutlineIcon />}
              className="text-white bg-color_2 font-semibold text-[14px] hover:bg-color_1 hover:text-black px-5 flex items-center justify-center rounded"
            />
          </div>
        </div>
        <div className="w-full md:flex justify-between gap-5 ">
          <div className="w-full">
            <div className="text-text_1 font-semibold text-[20px] border-b py-2">
              Personal Information
            </div>
            <UserInputFields
              onChange={onChange}
              keyName="Name"
              value={userBasicData.name}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Phone"
              value={userBasicData.phone}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Date Of Birth"
              value={userBasicData.dob}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Bio"
              value={userBasicData.bio}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Slogan"
              value={userBasicData.slogan}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Zodiac"
              value={userBasicData.zodiac}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Height"
              value={userBasicData.height}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Weight"
              value={userBasicData.weight}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Gender"
              value={userBasicData.gender}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Job Role"
              value={userBasicData.jobTitle}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Live In"
              value={userBasicData.currentLocation}
            />
            <UserInputFields
              onChange={onChange}
              keyName="Nationality"
              value={userBasicData.nationality}
            />
          </div>
          <div className="w-full">
            <div className="text-text_1 font-semibold text-[20px] border-b md:ml-4 py-2">
              Social Links
            </div>
            <div className="text-sm text-text_2 ml-4">
              (Note: Put the links to your social media is the fields)
            </div>
            <div className="md:border-l md:pl-4">
              <UserInputFields
                onChange={onChange}
                keyName="Facebook"
                value={userBasicData.facebook}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Instagram"
                value={userBasicData.instagram}
              />
              <UserInputFields
                onChange={onChange}
                keyName="YouTube"
                value={userBasicData.youtube}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Linkdn"
                value={userBasicData.linkdn}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Github"
                value={userBasicData.github}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BasicDetails;
