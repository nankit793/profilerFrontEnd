import { actionTypes } from "./action";

const initialState = {
  isUploaded: false,
  uploaded: {},
};

export default function basicDataUploadReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPLOAD_BASIC_DATA:
      return { ...state, isUploaded: false };
    case actionTypes.UPLOAD_BASIC_DATA_SUCCESS:
      return { ...state, isUploaded: true, uploaded: action.payload };
    case actionTypes.UPLOAD_BASIC_DATA_ERROR:
      return { ...state, isUploaded: false, uploaded: action.payload };
    default:
      return state;
  }
}
