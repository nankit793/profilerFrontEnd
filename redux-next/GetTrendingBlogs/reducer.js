import { actionTypes } from "./action";
const initialState = {
  isFetched: false,
  trendings: {},
};

export default function trendinBlogsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TRENDING_BLOGS_DATA:
      return { ...state, isFetched: false };
    case actionTypes.GET_TRENDING_BLOGS_SUCCESS:
      return { ...state, isFetched: true, trendings: action.payload };
    case actionTypes.GET_TRENDING_BLOGS_ERROR:
      return { ...state, isFetched: false, trendings: action.payload };
    default:
      return state;
  }
}
