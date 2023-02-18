import { actionTypes } from "./action";

const initialState = {
  isFetched: false,
  profilePhoto: {},
};

export default function profilePictureReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE_PICTURE:
      return { ...state, isFetched: false, profilePhoto: {} };
    case actionTypes.GET_PROFILE_PICTURE_SUCCESS:
      return { ...state, isFetched: true, profilePhoto: action.payload };
    case actionTypes.GET_PROFILE_PICTURE_ERROR:
      return { ...state, isFetched: false, profilePhoto: action.payload };
    default:
      return state;
  }
}
