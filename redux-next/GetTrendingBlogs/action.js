export const actionTypes = {
  // get user job profile data
  GET_TRENDING_BLOGS: "GET_TRENDING_BLOGS",
  GET_TRENDING_BLOGS_SUCCESS: "GET_TRENDING_BLOGS_SUCCESS",
  GET_TRENDING_BLOGS_ERROR: "GET_TRENDING_BLOGS_ERROR",
};

export function getTrendingBlogs(data) {
  return {
    type: actionTypes.GET_TRENDING_BLOGS,
    payload: data,
  };
}

export function getTrendingBlogs_success(data) {
  return {
    type: actionTypes.GET_TRENDING_BLOGS_SUCCESS,
    payload: data,
  };
}

export function getTrendingBlogs_error(data) {
  return {
    type: actionTypes.GET_TRENDING_BLOGS_ERROR,
    payload: data,
  };
}
