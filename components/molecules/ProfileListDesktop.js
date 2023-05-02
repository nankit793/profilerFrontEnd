// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { Scrollbars } from "react-custom-scrollbars";

// import * as getProfileLIst from "../../redux-next/profileList/action";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// function ProfileListDesktop(props) {
//   const router = useRouter();
//   const [profilesList, setProfilesList] = useState({});
//   const [jobProfile, setJobProfile] = useState(false);

//   const dispatch = useDispatch();
//   const profileList = useSelector((state) => state.profileListReducer);
//   useEffect(() => {
//     const effectHandler = async () => {
//       if (props.userid) {
//         dispatch(getProfileLIst.getProfilesList({ userid: props.userid }));
//       }
//     };
//     effectHandler();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (
//       profileList &&
//       profileList.profileList &&
//       profileList.isList &&
//       profileList.profileList.data &&
//       profileList.profileList.status === 200
//     ) {
//       setProfilesList(profileList.profileList.data);
//       setJobProfile(true);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [profileList]);
//   if (props.isDesktop) {
//     return (
//       <>
//         {profilesList && profilesList.jobProfile ? (
//           <>
//             <Scrollbars
//               autoHide
//               autoHideTimeout={200}
//               autoHideDuration={200}
//               style={{ width: "100%", height: "100%" }}
//             >
//               <div className="mx-3">
//                 <div className="w-full border mb-2 rounded  hover:border-color_5   p-3 cursor-pointer flex justify-between ">
//                   <div
//                     className="font-semibold  text-text_1"
//                     onClick={() => {
//                       router.push(`/jobProfile/${props.userid}`);
//                     }}
//                   >
//                     Job Profile
//                   </div>
//                   <div className="flex justify-between w-[40%]">
//                     <div className="text-[darkgreen]">active</div>
//                     <div className="text-text_1 flex justify-center  hover:bg-[aliceblue] duration-350 rounded-full">
//                       <MoreVertIcon />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Scrollbars>
//           </>
//         ) : (
//           ""
//         )}
//         {profilesList && !profilesList.jobProfile ? (
//           <div className="w-full flex justify-center align-center">
//             User has not created any profile
//           </div>
//         ) : (
//           ""
//         )}
//       </>
//     );
//   } else {
//     {
//       return <>phone</>;
//     }
//   }
// }

// export default ProfileListDesktop;
