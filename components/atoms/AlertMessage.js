import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

let time = 2000;
export let errorNotification = (text, subText) => {
  return NotificationManager.error(text, subText, time);
};
export let successNotification = (text, subText) => {
  return NotificationManager.success(text, subText, time);
};
export let infoNotification = (text, subText) => {
  return NotificationManager.info(text, subText, time);
};
export let warningNotification = (text, subText) => {
  return NotificationManager.warning(text, subText, time);
};
