import React, { useEffect, useState } from "react";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import ButtonPrimary from "../../components/atoms/input/ButtonPrimary";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { authenticate } from "../../components/authentication";
import Footer from "../../components/footer/Footer";
import UserInputFields from "../../components/molecules/UserInputFields";
import * as basicUploadAction from "../../redux-next/uploadDataBasic/action";
import BasicUpdateInfo from "../../components/molecules/jobProfilePages/BasicUpdateInfo";
import Image from "next/image";
// dependencies
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NotificationContainer } from "react-notifications";
import CircularProgresser from "../../components/atoms/CircularProgresser";

import { FormControl, MenuItem, Select } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import {
  errorNotification,
  successNotification,
} from "../../components/atoms/AlertMessage";
import * as getProfileLIst from "../../redux-next/profileList/action";
import * as getProfilePhoto from "../../redux-next/profilePhoto/action";
import EditIcon from "@mui/icons-material/Edit";
import Croppered from "../../components/molecules/subMolecules/Cropper";

function BasicDetails() {
  const router = useRouter();

  const [userBasicData, setUserBasicData] = useState({});
  const [loading, setLoading] = useState(false);
  // const [value, setValue] = useState("");
  const [profilesList, setProfilesList] = useState({});
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [showUploaderMessage, setShowUploaderMessage] = useState(new Date());
  const [croppedImage, setCroppedImage] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const userData = useSelector((state) => state.basicDataReducer);
  const userBasicUpload = useSelector((state) => state.basicDataUploadReducer);
  const profileList = useSelector((state) => state.profileListReducer);
  const profilePic = useSelector((state) => state.profilePictureReducer);

  useEffect(() => {
    const auth = async () => {
      await authenticate(loginData, registerData);
      dispatch(
        getBasicDataActions.getBasicData({
          userid: localStorage.getItem("userid"),
        })
      );
      dispatch(
        getProfileLIst.getProfilesList({
          userid: localStorage.getItem("userid"),
        })
      );
    };
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profilePic.isFetched && profilePic.profilePhoto) {
      setImage(profilePic.profilePhoto.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePic]);

  const changeImage = async (e) => {
    const file = e.target.files[0];
    // setCroppedImage(file);
    if (file) {
      const accesstoken = localStorage.getItem("accessToken");
      const refreshtoken = localStorage.getItem("idToken");
      const userid = localStorage.getItem("userid");
      let formData = new FormData();
      formData.append("image", file);
      const save = await fetch("http://localhost:5000/profilePhoto/uploads", {
        method: "POST",
        body: formData,
        headers: {
          accesstoken: accesstoken,
          refreshtoken: refreshtoken,
          userid: userid,
        },
      });
      if (save && save.status === 200 && save.statusText === "OK") {
        // setImage(null);
        dispatch(getProfilePhoto.getProfilePicture("data"));
      } else {
        setShowUploaderMessage("error occured try again");
      }
    }
  };
  useEffect(() => {
    if (
      userData &&
      userData.userData &&
      userData.isUser == true &&
      userData.userData.status === 200
    ) {
      setUserBasicData(userData.userData.data.newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData && userData.userData]);

  useEffect(() => {
    if (
      profileList &&
      profileList.profileList &&
      profileList.isList &&
      profileList.profileList.data &&
      profileList.profileList.status === 200
    ) {
      setProfilesList(profileList.profileList.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileList]);

  useEffect(() => {
    if (userBasicData && userBasicData.dob) {
      setStartDate(userBasicData.dob ? userBasicData.dob : "");
    }
  }, [userBasicData]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserBasicData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(basicUploadAction.uploadData(userBasicData));
  };

  useEffect(() => {
    if (
      userBasicUpload &&
      userBasicUpload.uploaded &&
      userBasicUpload.uploaded.status === 200
    ) {
      successNotification(userBasicUpload.uploaded.data.message, "Success");
      userBasicUpload.isUploaded = false;
      userBasicUpload.uploaded = {};
    } else if (
      userBasicUpload &&
      userBasicUpload.uploadData &&
      !userBasicUpload.uploaded &&
      userBasicUpload.uploaded.status != 200
    ) {
      errorNotification("Error Saving the details. Try Again Later", "Error");
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBasicUpload && userBasicUpload.uploaded]);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-start mb-10 ">
        {/* <Croppered croppedImage={croppedImage} /> */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white mt-3 drop-shadow-md rounded-xl mx-2 md:mx-7 pb-3">
            <div className="px-3 py-5 md:py-10 gap-10 md:flex flex-wrap justify-center items-center">
              <div className="flex flex-col items-center ">
                {image && (
                  <div className="border border-dashed border-color_7 bg-color_3 max-h-[200px] max-w-[200px] min-h-[200px] min-w-[200px] overflow-hidden rounded-full flex justify-center items-center p-1">
                    <Image
                      unoptimized
                      // fill
                      src={`data:image/png;base64,` + image}
                      alt="Picture of the author"
                      // objectFit="none"
                      objectPosition="50% bottom"
                      width="300px"
                      className=" bg-color_8 rounded-full"
                      height="300px"
                    />
                  </div>
                )}
                {/* <div className="w-[200px] mx-auto h-[200px] bg-color_7 rounded"></div> */}
                <Button
                  variant="text"
                  disableRipple={true}
                  component="label"
                  onChange={changeImage}
                  className="text-[blue] flex justify-center my-2 text-md lowercase"
                >
                  change
                  <input hidden onChange={onChange} type="file" />
                </Button>
              </div>
              <div className="md:w-[35%] w-full ">
                {profilesList.jobProfile && (
                  <>
                    <div className="flex justify-between p-5 h-min border bg-color_2  w-full rounded-lg ">
                      <div className="text-text_1 font-semibold">
                        Job Profile
                      </div>
                      <div
                        className="text-linkBlue underline cursor-pointer"
                        onClick={() => {
                          router.push(`/update/jobProfile`);
                        }}
                      >
                        <EditIcon sx={{ fontSize: 18, marginRight: "5px" }} />
                        update
                      </div>
                    </div>
                  </>
                )}
                <div className="flex mt-2 justify-between p-5 h-min border bg-color_2  w-full rounded-lg ">
                  <div className="text-text_1 font-semibold">Username</div>
                  <div className="flex justify-end">
                    <div className="pr-2 text-text_2">@</div>
                    <input
                      type="text"
                      className="outline-none w-[50%] text-text_2"
                      placeholder="username"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className=" p-2 whitespace-nowrap cursor-pointer py-3 my-3 w-min rounded px-5 bg-color_7 hover:bg-color_5 duration-200 cursor-pointe text-[white] ">
                    save username
                  </div>
                </div>
              </div>
              <div className="">
                <BasicUpdateInfo />
              </div>
            </div>
            <div className="md:px-10 px-4 flex  rounded-t-xl w-full justify-between items-center">
              <div className="text-text_1 font-semibold my-4 text-lg whitespace-nowrap">
                Edit details
              </div>
              <div className="">
                <ButtonPrimary
                  type="submit"
                  disabled={loading ? true : false}
                  // onClick={handleSubmit}
                  text={loading ? <CircularProgresser /> : "save changes"}
                  // icon={<ModeEditOutlineIcon />}
                  className="bg-color_7 text-[white] h-[45px] w-[140px]  hover:bg-color_5  text-[15px]"
                />
              </div>
            </div>
            <div className="w-full md:flex justify-between gap-5 mt-5 px-4 md:px-10">
              <div className="w-full">
                <div className="text-text_1 font-bold text-[18px]  py-1">
                  Basic Information
                </div>
                <div className="text-[12px] text-text_2 ">
                  (Note: Put your valid details oterwise it may lead to
                  permanent ban)
                </div>
                {/* <AccordionDetails>
                    <Typography className="flex flex-col gap-3"> */}
                <div className="mt-2">
                  <UserInputFields
                    onChange={onChange}
                    name="name"
                    length={30}
                    keyName="Name"
                    value={userBasicData.name}
                  />
                </div>
                <div className="mt-2">
                  <UserInputFields
                    onChange={onChange}
                    keyName="Phone"
                    name="phone"
                    length={10}
                    value={userBasicData.phone}
                  />
                </div>
                <div className="md:flex justify-between mt-2">
                  <div className="text-[16px] font-semibold text-text_1 ">
                    Gender
                  </div>
                  <FormControl className="flex w-full justify-end w-full mt-1 md:mt-0 md:w-[70%]  text-left">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userBasicData.gender ? userBasicData.gender : ""}
                      onChange={onChange}
                      name="gender"
                    >
                      <MenuItem value="m"> Male </MenuItem>
                      <MenuItem value="f">Female</MenuItem>
                      <MenuItem value="tg">Trans Gender</MenuItem>
                      <MenuItem value="">prefer not to say</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="md:flex justify-between mt-2">
                  <div className="text-[16px] font-semibold text-text_1 whitespace-nowrap">
                    Nationality
                  </div>

                  <FormControl className="flex w-full justify-end w-full mt-2 md:mt-0 md:w-[70%] text-left">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={onChange}
                      name="nationality"
                      value={
                        userBasicData.nationality
                          ? userBasicData.nationality.toUpperCase()
                          : ""
                      }
                    >
                      <MenuItem value="AF">Afghanistan</MenuItem>
                      <MenuItem value="AX">Åland Islands</MenuItem>
                      <MenuItem value="AL">Albania</MenuItem>
                      <MenuItem value="DZ">Algeria</MenuItem>
                      <MenuItem value="AS">American Samoa</MenuItem>
                      <MenuItem value="AD">Andorra</MenuItem>
                      <MenuItem value="AO">Angola</MenuItem>
                      <MenuItem value="AI">Anguilla</MenuItem>
                      <MenuItem value="AQ">Antarctica</MenuItem>
                      <MenuItem value="AG">Antigua and Barbuda</MenuItem>
                      <MenuItem value="AR">Argentina</MenuItem>
                      <MenuItem value="AM">Armenia</MenuItem>
                      <MenuItem value="AW">Aruba</MenuItem>
                      <MenuItem value="AU">Australia</MenuItem>
                      <MenuItem value="AT">Austria</MenuItem>
                      <MenuItem value="AZ">Azerbaijan</MenuItem>
                      <MenuItem value="BS">Bahamas</MenuItem>
                      <MenuItem value="BH">Bahrain</MenuItem>
                      <MenuItem value="BD">Bangladesh</MenuItem>
                      <MenuItem value="BB">Barbados</MenuItem>
                      <MenuItem value="BY">Belarus</MenuItem>
                      <MenuItem value="BE">Belgium</MenuItem>
                      <MenuItem value="BZ">Belize</MenuItem>
                      <MenuItem value="BJ">Benin</MenuItem>
                      <MenuItem value="BM">Bermuda</MenuItem>
                      <MenuItem value="BT">Bhutan</MenuItem>
                      <MenuItem value="BO">
                        Bolivia, Plurinational State of
                      </MenuItem>
                      <MenuItem value="BQ">
                        Bonaire, Sint Eustatius and Saba
                      </MenuItem>
                      <MenuItem value="BA">Bosnia and Herzegovina</MenuItem>
                      <MenuItem value="BW">Botswana</MenuItem>
                      <MenuItem value="BV">Bouvet Island</MenuItem>
                      <MenuItem value="BR">Brazil</MenuItem>
                      <MenuItem value="IO">
                        British Indian Ocean Territory
                      </MenuItem>
                      <MenuItem value="BN">Brunei Darussalam</MenuItem>
                      <MenuItem value="BG">Bulgaria</MenuItem>
                      <MenuItem value="BF">Burkina Faso</MenuItem>
                      <MenuItem value="BI">Burundi</MenuItem>
                      <MenuItem value="KH">Cambodia</MenuItem>
                      <MenuItem value="CM">Cameroon</MenuItem>
                      <MenuItem value="CA">Canada</MenuItem>
                      <MenuItem value="CV">Cape Verde</MenuItem>
                      <MenuItem value="KY">Cayman Islands</MenuItem>
                      <MenuItem value="CF">Central African Republic</MenuItem>
                      <MenuItem value="TD">Chad</MenuItem>
                      <MenuItem value="CL">Chile</MenuItem>
                      <MenuItem value="CN">China</MenuItem>
                      <MenuItem value="CX">Christmas Island</MenuItem>
                      <MenuItem value="CC">Cocos (Keeling) Islands</MenuItem>
                      <MenuItem value="CO">Colombia</MenuItem>
                      <MenuItem value="KM">Comoros</MenuItem>
                      <MenuItem value="CG">Congo</MenuItem>
                      <MenuItem value="CD">
                        Congo, the Democratic Republic of the
                      </MenuItem>
                      <MenuItem value="CK">Cook Islands</MenuItem>
                      <MenuItem value="CR">Costa Rica</MenuItem>
                      <MenuItem value="CI">{`Côte d'Ivoire`}</MenuItem>
                      <MenuItem value="HR">Croatia</MenuItem>
                      <MenuItem value="CU">Cuba</MenuItem>
                      <MenuItem value="CW">Curaçao</MenuItem>
                      <MenuItem value="CY">Cyprus</MenuItem>
                      <MenuItem value="CZ">Czech Republic</MenuItem>
                      <MenuItem value="DK">Denmark</MenuItem>
                      <MenuItem value="DJ">Djibouti</MenuItem>
                      <MenuItem value="DM">Dominica</MenuItem>
                      <MenuItem value="DO">Dominican Republic</MenuItem>
                      <MenuItem value="EC">Ecuador</MenuItem>
                      <MenuItem value="EG">Egypt</MenuItem>
                      <MenuItem value="SV">El Salvador</MenuItem>
                      <MenuItem value="GQ">Equatorial Guinea</MenuItem>
                      <MenuItem value="ER">Eritrea</MenuItem>
                      <MenuItem value="EE">Estonia</MenuItem>
                      <MenuItem value="ET">Ethiopia</MenuItem>
                      <MenuItem value="FK">
                        Falkland Islands (Malvinas)
                      </MenuItem>
                      <MenuItem value="FO">Faroe Islands</MenuItem>
                      <MenuItem value="FJ">Fiji</MenuItem>
                      <MenuItem value="FI">Finland</MenuItem>
                      <MenuItem value="FR">France</MenuItem>
                      <MenuItem value="GF">French Guiana</MenuItem>
                      <MenuItem value="PF">French Polynesia</MenuItem>
                      <MenuItem value="TF">
                        French Southern Territories
                      </MenuItem>
                      <MenuItem value="GA">Gabon</MenuItem>
                      <MenuItem value="GM">Gambia</MenuItem>
                      <MenuItem value="GE">Georgia</MenuItem>
                      <MenuItem value="DE">Germany</MenuItem>
                      <MenuItem value="GH">Ghana</MenuItem>
                      <MenuItem value="GI">Gibraltar</MenuItem>
                      <MenuItem value="GR">Greece</MenuItem>
                      <MenuItem value="GL">Greenland</MenuItem>
                      <MenuItem value="GD">Grenada</MenuItem>
                      <MenuItem value="GP">Guadeloupe</MenuItem>
                      <MenuItem value="GU">Guam</MenuItem>
                      <MenuItem value="GT">Guatemala</MenuItem>
                      <MenuItem value="GG">Guernsey</MenuItem>
                      <MenuItem value="GN">Guinea</MenuItem>
                      <MenuItem value="GW">Guinea-Bissau</MenuItem>
                      <MenuItem value="GY">Guyana</MenuItem>
                      <MenuItem value="HT">Haiti</MenuItem>
                      <MenuItem value="HM">
                        Heard Island and McDonald Islands
                      </MenuItem>
                      <MenuItem value="VA">
                        Holy See (Vatican City State)
                      </MenuItem>
                      <MenuItem value="HN">Honduras</MenuItem>
                      <MenuItem value="HK">Hong Kong</MenuItem>
                      <MenuItem value="HU">Hungary</MenuItem>
                      <MenuItem value="IS">Iceland</MenuItem>
                      <MenuItem value="IN">India</MenuItem>
                      <MenuItem value="ID">Indonesia</MenuItem>
                      <MenuItem value="IR">Iran, Islamic Republic of</MenuItem>
                      <MenuItem value="IQ">Iraq</MenuItem>
                      <MenuItem value="IE">Ireland</MenuItem>
                      <MenuItem value="IM">Isle of Man</MenuItem>
                      <MenuItem value="IL">Israel</MenuItem>
                      <MenuItem value="IT">Italy</MenuItem>
                      <MenuItem value="JM">Jamaica</MenuItem>
                      <MenuItem value="JP">Japan</MenuItem>
                      <MenuItem value="JE">Jersey</MenuItem>
                      <MenuItem value="JO">Jordan</MenuItem>
                      <MenuItem value="KZ">Kazakhstan</MenuItem>
                      <MenuItem value="KE">Kenya</MenuItem>
                      <MenuItem value="KI">Kiribati</MenuItem>
                      <MenuItem value="KP">
                        {` Korea, Democratic People's Republic of`}
                      </MenuItem>
                      <MenuItem value="KR">Korea, Republic of</MenuItem>
                      <MenuItem value="KW">Kuwait</MenuItem>
                      <MenuItem value="KG">Kyrgyzstan</MenuItem>
                      <MenuItem value="LA">
                        {` Lao People's Democratic Republic`}
                      </MenuItem>
                      <MenuItem value="LV">Latvia</MenuItem>
                      <MenuItem value="LB">Lebanon</MenuItem>
                      <MenuItem value="LS">Lesotho</MenuItem>
                      <MenuItem value="LR">Liberia</MenuItem>
                      <MenuItem value="LY">Libya</MenuItem>
                      <MenuItem value="LI">Liechtenstein</MenuItem>
                      <MenuItem value="LT">Lithuania</MenuItem>
                      <MenuItem value="LU">Luxembourg</MenuItem>
                      <MenuItem value="MO">Macao</MenuItem>
                      <MenuItem value="MK">
                        Macedonia, the former Yugoslav Republic of
                      </MenuItem>
                      <MenuItem value="MG">Madagascar</MenuItem>
                      <MenuItem value="MW">Malawi</MenuItem>
                      <MenuItem value="MY">Malaysia</MenuItem>
                      <MenuItem value="MV">Maldives</MenuItem>
                      <MenuItem value="ML">Mali</MenuItem>
                      <MenuItem value="MT">Malta</MenuItem>
                      <MenuItem value="MH">Marshall Islands</MenuItem>
                      <MenuItem value="MQ">Martinique</MenuItem>
                      <MenuItem value="MR">Mauritania</MenuItem>
                      <MenuItem value="MU">Mauritius</MenuItem>
                      <MenuItem value="YT">Mayotte</MenuItem>
                      <MenuItem value="MX">Mexico</MenuItem>
                      <MenuItem value="FM">
                        Micronesia, Federated States of
                      </MenuItem>
                      <MenuItem value="MD">Moldova, Republic of</MenuItem>
                      <MenuItem value="MC">Monaco</MenuItem>
                      <MenuItem value="MN">Mongolia</MenuItem>
                      <MenuItem value="ME">Montenegro</MenuItem>
                      <MenuItem value="MS">Montserrat</MenuItem>
                      <MenuItem value="MA">Morocco</MenuItem>
                      <MenuItem value="MZ">Mozambique</MenuItem>
                      <MenuItem value="MM">Myanmar</MenuItem>
                      <MenuItem value="NA">Namibia</MenuItem>
                      <MenuItem value="NR">Nauru</MenuItem>
                      <MenuItem value="NP">Nepal</MenuItem>
                      <MenuItem value="NL">Netherlands</MenuItem>
                      <MenuItem value="NC">New Caledonia</MenuItem>
                      <MenuItem value="NZ">New Zealand</MenuItem>
                      <MenuItem value="NI">Nicaragua</MenuItem>
                      <MenuItem value="NE">Niger</MenuItem>
                      <MenuItem value="NG">Nigeria</MenuItem>
                      <MenuItem value="NU">Niue</MenuItem>
                      <MenuItem value="NF">Norfolk Island</MenuItem>
                      <MenuItem value="MP">Northern Mariana Islands</MenuItem>
                      <MenuItem value="NO">Norway</MenuItem>
                      <MenuItem value="OM">Oman</MenuItem>
                      <MenuItem value="PK">Pakistan</MenuItem>
                      <MenuItem value="PW">Palau</MenuItem>
                      <MenuItem value="PS">
                        Palestinian Territory, Occupied
                      </MenuItem>
                      <MenuItem value="PA">Panama</MenuItem>
                      <MenuItem value="PG">Papua New Guinea</MenuItem>
                      <MenuItem value="PY">Paraguay</MenuItem>
                      <MenuItem value="PE">Peru</MenuItem>
                      <MenuItem value="PH">Philippines</MenuItem>
                      <MenuItem value="PN">Pitcairn</MenuItem>
                      <MenuItem value="PL">Poland</MenuItem>
                      <MenuItem value="PT">Portugal</MenuItem>
                      <MenuItem value="PR">Puerto Rico</MenuItem>
                      <MenuItem value="QA">Qatar</MenuItem>
                      <MenuItem value="RE">Réunion</MenuItem>
                      <MenuItem value="RO">Romania</MenuItem>
                      <MenuItem value="RU">Russian Federation</MenuItem>
                      <MenuItem value="RW">Rwanda</MenuItem>
                      <MenuItem value="BL">Saint Barthélemy</MenuItem>
                      <MenuItem value="SH">
                        Saint Helena, Ascension and Tristan da Cunha
                      </MenuItem>
                      <MenuItem value="KN">Saint Kitts and Nevis</MenuItem>
                      <MenuItem value="LC">Saint Lucia</MenuItem>
                      <MenuItem value="MF">Saint Martin (French part)</MenuItem>
                      <MenuItem value="PM">Saint Pierre and Miquelon</MenuItem>
                      <MenuItem value="VC">
                        Saint Vincent and the Grenadines
                      </MenuItem>
                      <MenuItem value="WS">Samoa</MenuItem>
                      <MenuItem value="SM">San Marino</MenuItem>
                      <MenuItem value="ST">Sao Tome and Principe</MenuItem>
                      <MenuItem value="SA">Saudi Arabia</MenuItem>
                      <MenuItem value="SN">Senegal</MenuItem>
                      <MenuItem value="RS">Serbia</MenuItem>
                      <MenuItem value="SC">Seychelles</MenuItem>
                      <MenuItem value="SL">Sierra Leone</MenuItem>
                      <MenuItem value="SG">Singapore</MenuItem>
                      <MenuItem value="SX">Sint Maarten (Dutch part)</MenuItem>
                      <MenuItem value="SK">Slovakia</MenuItem>
                      <MenuItem value="SI">Slovenia</MenuItem>
                      <MenuItem value="SB">Solomon Islands</MenuItem>
                      <MenuItem value="SO">Somalia</MenuItem>
                      <MenuItem value="ZA">South Africa</MenuItem>
                      <MenuItem value="GS">
                        South Georgia and the South Sandwich Islands
                      </MenuItem>
                      <MenuItem value="SS">South Sudan</MenuItem>
                      <MenuItem value="ES">Spain</MenuItem>
                      <MenuItem value="LK">Sri Lanka</MenuItem>
                      <MenuItem value="SD">Sudan</MenuItem>
                      <MenuItem value="SR">Suriname</MenuItem>
                      <MenuItem value="SJ">Svalbard and Jan Mayen</MenuItem>
                      <MenuItem value="SZ">Swaziland</MenuItem>
                      <MenuItem value="SE">Sweden</MenuItem>
                      <MenuItem value="CH">Switzerland</MenuItem>
                      <MenuItem value="SY">Syrian Arab Republic</MenuItem>
                      <MenuItem value="TW">Taiwan, Province of China</MenuItem>
                      <MenuItem value="TJ">Tajikistan</MenuItem>
                      <MenuItem value="TZ">
                        Tanzania, United Republic of
                      </MenuItem>
                      <MenuItem value="TH">Thailand</MenuItem>
                      <MenuItem value="TL">Timor-Leste</MenuItem>
                      <MenuItem value="TG">Togo</MenuItem>
                      <MenuItem value="TK">Tokelau</MenuItem>
                      <MenuItem value="TO">Tonga</MenuItem>
                      <MenuItem value="TT">Trinidad and Tobago</MenuItem>
                      <MenuItem value="TN">Tunisia</MenuItem>
                      <MenuItem value="TR">Turkey</MenuItem>
                      <MenuItem value="TM">Turkmenistan</MenuItem>
                      <MenuItem value="TC">Turks and Caicos Islands</MenuItem>
                      <MenuItem value="TV">Tuvalu</MenuItem>
                      <MenuItem value="UG">Uganda</MenuItem>
                      <MenuItem value="UA">Ukraine</MenuItem>
                      <MenuItem value="AE">United Arab Emirates</MenuItem>
                      <MenuItem value="GB">United Kingdom</MenuItem>
                      <MenuItem value="US">United States</MenuItem>
                      <MenuItem value="UM">
                        United States Minor Outlying Islands
                      </MenuItem>
                      <MenuItem value="UY">Uruguay</MenuItem>
                      <MenuItem value="UZ">Uzbekistan</MenuItem>
                      <MenuItem value="VU">Vanuatu</MenuItem>
                      <MenuItem value="VE">
                        Venezuela, Bolivarian Republic of
                      </MenuItem>
                      <MenuItem value="VN">Viet Nam</MenuItem>
                      <MenuItem value="VG">Virgin Islands, British</MenuItem>
                      <MenuItem value="VI">Virgin Islands, U.S.</MenuItem>
                      <MenuItem value="WF">Wallis and Futuna</MenuItem>
                      <MenuItem value="EH">Western Sahara</MenuItem>
                      <MenuItem value="YE">Yemen</MenuItem>
                      <MenuItem value="ZM">Zambia</MenuItem>
                      <MenuItem value="ZW">Zimbabwe</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {/* </Typography>
                  </AccordionDetails> */}
                {/* </Accordion> */}
              </div>
              <div className="w-full mt-5 md:mt-0">
                <div className="text-text_1 font-bold text-[18px] py-2">
                  Social Links
                </div>
                <div className="text-[12px] text-text_2 ">
                  (Note: Put the links to your social media is the fields)
                </div>
                <div className="mt-2">
                  <UserInputFields
                    name="facebook"
                    onChange={onChange}
                    keyName="Facebook"
                    value={userBasicData.facebook}
                  />
                </div>
                <div className="mt-2">
                  <UserInputFields
                    name="instagram"
                    onChange={onChange}
                    keyName="Instagram"
                    value={userBasicData.instagram}
                  />
                </div>
                <div className="mt-2">
                  <UserInputFields
                    onChange={onChange}
                    name="youtube"
                    keyName="YouTube"
                    value={userBasicData.youtube}
                  />
                </div>{" "}
                <div className="mt-2">
                  <UserInputFields
                    name="linkdn"
                    onChange={onChange}
                    keyName="Linkedin"
                    value={userBasicData.linkdn}
                  />
                </div>
                <div className="mt-2">
                  <UserInputFields
                    name="github"
                    onChange={onChange}
                    keyName="Github"
                    value={userBasicData.github}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
      <NotificationContainer />
    </>
  );
}

export default BasicDetails;
