export const actionTypes = {
  // get user job profile data
  GET_USER_PORTFOLIO_BOOKMARKS: "GET_USER_PORTFOLIO_BOOKMARKS",
  GET_USER_PORTFOLIO_BOOKMARKS_SUCCESS: "GET_USER_PORTFOLIO_BOOKMARKS_SUCCESS",
  GET_USER_PORTFOLIO_BOOKMARKS_UPDATE: "GET_USER_PORTFOLIO_BOOKMARKS_UPDATE",
  GET_USER_PORTFOLIO_BOOKMARKS_ERROR: "GET_USER_PORTFOLIO_BOOKMARKS_ERROR",
};

export function getUserPortfolioBookmarks(data) {
  return {
    type: actionTypes.GET_USER_PORTFOLIO_BOOKMARKS,
    payload: data,
  };
}

export function getUserPortfolioBookmarks_success(data) {
  return {
    type: actionTypes.GET_USER_PORTFOLIO_BOOKMARKS_SUCCESS,
    payload: data,
  };
}

export function getUserPortfolioBookmarks_update(data) {
  return {
    type: actionTypes.GET_USER_PORTFOLIO_BOOKMARKS_UPDATE,
    payload: data,
  };
}

export function getUserPortfolioBookmarks_error(data) {
  return {
    type: actionTypes.GET_USER_PORTFOLIO_BOOKMARKS_ERROR,
    payload: data,
  };
}
