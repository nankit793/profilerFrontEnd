import { actionTypes } from "./actions";
const initialState = {
  isFetched: false,
  blogs: {},
};

export default function authorBlogsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_AUTHOR_BLOGS:
      return { ...state, isFetched: false };
    case actionTypes.GET_AUTHOR_BLOGS_SUCCESS:
      return { ...state, isFetched: true, blogs: action.payload };
    case actionTypes.GET_AUTHOR_BLOGS_UPDATE:
      return {
        ...state,
        isFetched: true,
      };
    case actionTypes.GET_AUTHOR_BLOGS_ERROR:
      return { ...state, isFetched: false, blogs: action.payload };
    default:
      return state;
  }
}
