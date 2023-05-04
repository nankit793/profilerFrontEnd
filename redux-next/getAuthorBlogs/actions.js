export const actionTypes = {
  // get user job profile data
  GET_AUTHOR_BLOGS: "GET_AUTHOR_BLOGS",
  GET_AUTHOR_BLOGS_SUCCESS: "GET_AUTHOR_BLOGS_SUCCESS",
  GET_AUTHOR_BLOGS_UPDATE: "GET_AUTHOR_BLOGS_UPDATE",
  GET_AUTHOR_BLOGS_ERROR: "GET_AUTHOR_BLOGS_ERROR",
};

export function getAuthorBlogs(data) {
  return {
    type: actionTypes.GET_AUTHOR_BLOGS,
    payload: data,
  };
}

export function getAuthorBlogs_success(data) {
  return {
    type: actionTypes.GET_AUTHOR_BLOGS_SUCCESS,
    payload: data,
  };
}

export function getAuthorBlogs_update(data) {
  return {
    type: actionTypes.GET_AUTHOR_BLOGS_UPDATE,
    payload: data,
  };
}

export function getAuthorBlogs_error(data) {
  return {
    type: actionTypes.GET_AUTHOR_BLOGS_ERROR,
    payload: data,
  };
}
