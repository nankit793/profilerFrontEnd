import { combineReducers } from "redux";
import registerReducer from "./register/reducer";
import loginUserReducers from "./login/reducers";
import basicDataReducer from "./getUserBasic/reducer";
import basicDataUploadReducer from "./uploadDataBasic/reducer";
import profileListReducer from "./profileList/reducer";
import jobProfileReducer from "./getJobProfile/reducer";
import profilePictureReducer from "./profilePhoto/reducer";
import followingListReducer from "./followerList/reducer";
import bookmarksReducer from "./getBookmarks/reducer";
import authorBlogsReducer from "./getAuthorBlogs/reducer";
const appReducer = combineReducers({
  registerReducer,
  loginUserReducers,
  basicDataReducer,
  basicDataUploadReducer,
  profileListReducer,
  jobProfileReducer,
  profilePictureReducer,
  followingListReducer,
  bookmarksReducer,
  authorBlogsReducer,
});

const rootReducer = (state, action) => {
  //   if (action.type === "LOGOUT") {
  //     return appReducer(undefined, action);
  //   }
  return appReducer(state, action);
};

export default rootReducer;
