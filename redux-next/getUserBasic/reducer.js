import { actionTypes } from "./actions";
const initialState = {
  isUser: false,
  userData: {},
};

export default function basicDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_BASIC_DATA:
      return { ...state, isUser: false };
    case actionTypes.GET_USER_BASIC_DATA_SUCCESS:
      return { ...state, isUser: true, userData: action.payload };
    case actionTypes.GET_USER_BASIC_DATA_ERROR:
      return { ...state, isUser: false, userData: action.payload };
    default:
      return state;
  }
}
