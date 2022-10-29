import localStorage from "./localStorage";
export function saveTokensOnLocal(key, value) {
  const validToken = localStorage.getItem(key);
  if (validToken) {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
}
