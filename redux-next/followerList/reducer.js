import { actionTypes } from "./actions";
const initialState = {
  isFecthed: false,
  userFollowingList: [],
};

export default function followingListReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_FOLLOWING_LIST:
      return { ...state, isFecthed: false };
    case actionTypes.GET_USER_FOLLOWING_LIST_SUCCESS:
      return { ...state, isFecthed: true, userFollowingList: action.payload };
    case actionTypes.GET_USER_FOLLOWING_LIST_UPDATE:
      return { ...state, isFecthed: true, userFollowingList: action.payload };
    case actionTypes.GET_USER_FOLLOWING_LIST_ERROR:
      return { ...state, isFecthed: false, userFollowingList: action.payload };
    default:
      return state;
  }
}
