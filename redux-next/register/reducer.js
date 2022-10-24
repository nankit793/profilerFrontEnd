import { actionTypes } from "./action";

const initialState = {
  user: {},
  isPosted: false,
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.POST_USER_REGISTRATION:
      return { ...state, isPosted: false };
    case actionTypes.POST_USER_REGISTRATION_SUCCESS:
      return { ...state, isPosted: true, user: action.payload };
    case actionTypes.POST_USER_REGISTRATION_ERROR:
      return { ...state, isPosted: false, user: action.payload };
    default:
      return state;
  }
}
