import { actionTypes } from "./action";
const initialState = {
  isLoggedIn: false,
  loggedInUser: {},
};

export default function loginUserReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return { ...state, isLoggedIn: false };
    case actionTypes.LOGIN_USER_SUCCESS:
      return { ...state, isLoggedIn: true, loggedInUser: action.payload };
    case actionTypes.LOGIN_USER_ERROR:
      return { ...state, isLoggedIn: false, loggedInUser: action.payload };

    default:
      return state;
  }
}
