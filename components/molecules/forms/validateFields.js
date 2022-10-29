export function validator(user, password) {
  if (user && password.length >= 3) {
    return true;
  }
  return false;
}
