import { actionTypes } from "./action";
const initialState = {
  isFetched: false,
  bookmarks: {},
};

export default function portfolioBookmarksReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case actionTypes.GET_USER_PORTFOLIO_BOOKMARKS:
      return { ...state, isFetched: false };
    case actionTypes.GET_USER_PORTFOLIO_BOOKMARKS_SUCCESS:
      return { ...state, isFetched: true, bookmarks: action.payload };
    case actionTypes.GET_USER_PORTFOLIO_BOOKMARKS_UPDATE:
      return {
        ...state,
        isFetched: true,
        bookmarks: action.payload,
      };
    case actionTypes.GET_USER_PORTFOLIO_BOOKMARKS_ERROR:
      return { ...state, isFetched: false, bookmarks: action.payload };
    default:
      return state;
  }
}
