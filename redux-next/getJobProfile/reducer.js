import { actionTypes } from "./actions";
const initialState = {
  isJobProfile: false,
  jobProfile: {},
};

export default function jobProfileReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_JOB_PROFILE_DATA:
      return { ...state, isJobProfile: false };
    case actionTypes.GET_USER_JOB_PROFILE_SUCCESS:
      return { ...state, isJobProfile: true, jobProfile: action.payload };
    case actionTypes.GET_USER_JOB_PROFILE_ERROR:
      return { ...state, isJobProfile: false, jobProfile: action.payload };
    default:
      return state;
  }
}
