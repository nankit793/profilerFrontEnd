export const actionTypes = {
  USER_REVIEW_BLOG: "USER_REVIEW_BLOG",
  USER_REVIEW_BLOG_SUCCESS: "USER_REVIEW_BLOG_SUCCESS",
};

export function userReviewBlog(data) {
  return {
    type: actionTypes.USER_REVIEW_BLOG,
    payload: data,
  };
}

export function userReviewBlog_success(data) {
  return {
    type: actionTypes.USER_REVIEW_BLOG_SUCCESS,
    payload: data,
  };
}
