import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("idToken");
  localStorage.removeItem("userid");
}
