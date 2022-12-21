import { actionTypes } from "./action";
const initialState = {
  profileList: [],
  isList: false,
};

export default function profileListReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE_LIST:
      return { ...state, isList: false };
    case actionTypes.GET_PROFILE_LIST_SUCCESS:
      return { ...state, isList: true, profileList: action.payload };
    case actionTypes.GET_PROFILE_LIST_ERROR:
      return { ...state, isList: false, profileList: action.payload };
    default:
      return state;
  }
}
