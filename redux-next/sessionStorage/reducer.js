import { actionTypes } from "./actions";
const initialState = {
  isSession: false,
  session: {},
};

export default function sessionStorageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_REVIEW_BLOG:
      return { ...state, isSession: false };
    case actionTypes.USER_REVIEW_BLOG_SUCCESS:
      return { ...state, isSession: true, session: action.payload };

    default:
      return state;
  }
}
