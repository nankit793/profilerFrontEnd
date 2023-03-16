import { actionTypes } from "./actions";
const initialState = {
  isFetched: false,
  bookmarks: {},
};

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_BOOKMARKS:
      return { ...state, isFetched: false };
    case actionTypes.GET_USER_BOOKMARKS_SUCCESS:
      return { ...state, isFetched: true, bookmarks: action.payload };
    case actionTypes.GET_USER_BOOKMARKS_UPDATE:
      return {
        ...state,
        isFetched: true,
        bookmarks: action.payload,
      };
    case actionTypes.GET_USER_BOOKMARKS_ERROR:
      return { ...state, isFetched: false, bookmarks: action.payload };
    default:
      return state;
  }
}
