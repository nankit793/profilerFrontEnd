function ifLogged() {
  if (
    localStorage.getItem("accessToken") &&
    localStorage.getItem("idToken") &&
    localStorage.getItem("userid")
  ) {
    return true;
  }
  return false;
}

export { ifLogged };
