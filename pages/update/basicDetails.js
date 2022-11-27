import React, { useEffect, useState } from "react";
import NavbarLogged from "../../components/navbar/NavbarLogged";
import * as getBasicDataActions from "../../redux-next/getUserBasic/actions";
import ButtonPrimary from "../../components/atoms/input/ButtonPrimary";
// import UserInputFields onChange={onChange} from "../../components/molecules/UserInputFields onChange={onChange}";
// dependencies
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { authenticate } from "../../components/authentication";
import Footer from "../../components/footer/Footer";
import UserInputFields from "../../components/molecules/UserInputFields";
import * as basicUploadAction from "../../redux-next/uploadDataBasic/action";
// dependencies
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { NotificationContainer } from "react-notifications";
import CircularProgresser from "../../components/atoms/CircularProgresser";

import {
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-datepicker/dist/react-datepicker.css";
import {
  errorNotification,
  successNotification,
} from "../../components/atoms/AlertMessage";

function BasicDetails() {
  const [userBasicData, setUserBasicData] = useState({});
  const [loading, setLoading] = useState(false);
  // const [value, setValue] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginUserReducers);
  const registerData = useSelector((state) => state.registerReducer);
  const userData = useSelector((state) => state.basicDataReducer);
  const userBasicUpload = useSelector((state) => state.basicDataUploadReducer);

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
      <div className="w-full">
        <NavbarLogged />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white md:px-10 px-3 pt-3 mt-10 rounded-xl m-4 md:mx-20 pb-3">
          <div className="flex w-full justify-between items-center">
            <div className="text-text_1 font-bold my-5 text-[23px] whitespace-nowrap">
              Edit Details
            </div>
            <div className="">
              <ButtonPrimary
                type="submit"
                // onClick={handleSubmit}
                text={loading ? <CircularProgresser /> : "Save Changes"}
                // icon={<ModeEditOutlineIcon />}
                className=" bg-color_2 text-[white] hover:text-[black] h-[40px] w-[140px]  hover:bg-color_1 p-3 font-semibold text-[16px]"
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
                name="name"
                length={30}
                keyName="Name"
                value={userBasicData.name}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Phone"
                name="phone"
                length={10}
                value={userBasicData.phone}
              />
              <div className="flex justify-between my-3">
                <UserInputFields
                  onChange={onChange}
                  keyName="Date Of Birth"
                  name="dob"
                  type="date"
                  value={
                    userBasicData.dob
                      ? userBasicData.dob.slice(
                          0,
                          userBasicData.dob.indexOf("T")
                        )
                      : ""
                  }
                />
                {/* <div className="flex items-center justify-between w-[60%]"> */}
                {/* <DatePicker
                    className="border p-3 rounded bg-[#FBFCFC]"
                    selected={
                      new Date(userBasicData.dob ? userBasicData.dob : null)
                    }
                    dateFormat="yyyy-MM-dd"
                    calendarIcon="Calendar"
                    onChange={(date) => {
                      setStartDate(date);
                      userBasicData.dob = startDate;
                      console.log(userBasicData.dob, "startdates", startDate);
                    }}
                  /> */}
                {/* <input  type='date'  /> */}
                {/* <div className="flex justify-center w-full">
                    <CalendarMonthIcon />
                  </div> */}
              </div>
              {/* </div> */}
              <UserInputFields
                onChange={onChange}
                keyName="About"
                name="bio"
                multiline={true}
                length={600}
                value={userBasicData.bio}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Slogan"
                length={150}
                multiline={true}
                name="slogan"
                value={userBasicData.slogan}
              />
              {/* <UserInputFields
                onChange={onChange}
                keyName="Zodiac"
                name="zodiac"
                value={userBasicData.zodiac}
              /> */}
              <div className="flex justify-between">
                <div className="text-[16px] font-semibold text-text_1 ">
                  Zodiac
                </div>

                <FormControl className="flex w-full justify-end w-[70%]  text-left">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userBasicData.zodiac ? userBasicData.zodiac : ""}
                    onChange={onChange}
                    name="zodiac"
                  >
                    <MenuItem value="aries"> Aries </MenuItem>
                    <MenuItem value="taurus">Taurus</MenuItem>
                    <MenuItem value="gemini">Gemini</MenuItem>
                    <MenuItem value="cancer">Cancer </MenuItem>
                    <MenuItem value="leo">Leo</MenuItem>
                    <MenuItem value="virgo">Virgo</MenuItem>
                    <MenuItem value="libra"> Libra</MenuItem>
                    <MenuItem value="scorpius">Scorpius</MenuItem>
                    <MenuItem value="sagittarius">Sagittarius</MenuItem>
                    <MenuItem value="capricornus">Capricornus</MenuItem>
                    <MenuItem value="aquarius ">Aquarius</MenuItem>
                    <MenuItem value="pisces ">Pisces </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <UserInputFields
                onChange={onChange}
                keyName="Height"
                name="height"
                type="number"
                unit="cm"
                value={userBasicData.height}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Weight"
                unit="kg"
                name="weight"
                type="number"
                value={userBasicData.weight}
              />
              {/* <UserInputFields
                onChange={onChange}
                keyName="Gender"
                name="gender"
                value={userBasicData.gender}
              /> */}
              <div className="flex justify-between">
                <div className="text-[16px] font-semibold text-text_1 ">
                  Gender
                </div>

                <FormControl className="flex w-full justify-end w-[70%]  text-left">
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

              <UserInputFields
                onChange={onChange}
                name="jobTitle"
                keyName="Job Role"
                length={30}
                value={userBasicData.jobTitle}
                lenght={25}
              />
              <UserInputFields
                onChange={onChange}
                keyName="Live In"
                name="currentLocation"
                value={userBasicData.currentLocation}
                lenght={25}
              />
              <div className="flex justify-between my-3">
                <div className="text-[16px] font-semibold text-text_1 whitespace-nowrap">
                  Nationality:
                </div>

                <FormControl className="flex w-full justify-end w-[70%]  text-left">
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
                    <MenuItem value="FK">Falkland Islands (Malvinas)</MenuItem>
                    <MenuItem value="FO">Faroe Islands</MenuItem>
                    <MenuItem value="FJ">Fiji</MenuItem>
                    <MenuItem value="FI">Finland</MenuItem>
                    <MenuItem value="FR">France</MenuItem>
                    <MenuItem value="GF">French Guiana</MenuItem>
                    <MenuItem value="PF">French Polynesia</MenuItem>
                    <MenuItem value="TF">French Southern Territories</MenuItem>
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
                    <MenuItem value="TZ">Tanzania, United Republic of</MenuItem>
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
            </div>
            <div className="w-full">
              <div className="text-text_1 font-semibold text-[20px] border-b md:ml-4 py-2">
                Social Links
              </div>
              <div className="text-[12px] text-text_2 md:ml-4">
                (Note: Put the links to your social media is the fields)
              </div>
              <div className="md:border-l md:pl-4 ">
                <UserInputFields
                  name="facebook"
                  onChange={onChange}
                  keyName="Facebook"
                  value={userBasicData.facebook}
                />
                <UserInputFields
                  name="instagram"
                  onChange={onChange}
                  keyName="Instagram"
                  value={userBasicData.instagram}
                />
                <UserInputFields
                  onChange={onChange}
                  name="youtube"
                  keyName="YouTube"
                  value={userBasicData.youtube}
                />
                <UserInputFields
                  name="linkdn"
                  onChange={onChange}
                  keyName="Linkedin"
                  value={userBasicData.linkdn}
                />
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
      <Footer />
      <NotificationContainer />
    </>
  );
}

export default BasicDetails;
