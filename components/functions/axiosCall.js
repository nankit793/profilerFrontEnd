import axios from "axios";
import { errorNotification } from "../atoms/AlertMessage";

function axiosGet(setData, URL) {
  axios
    .get(URL)
    .then(function (response) {
      if (response.status === 200 && response.data) {
        setData({ ...response.data, state: true });
        updateAccessToken(response.data);
      }
    })
    .catch(function (error) {
      setData({ message: error.message, state: false });
    });
}

async function axiosDelete(URL) {
  const accesstoken = localStorage.getItem("accessToken");
  const refreshtoken = localStorage.getItem("idToken");
  const userid = localStorage.getItem("userid");
  const result = await fetch(URL, {
    method: "DELETE",
    headers: {
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
      userid: userid,
    },
  });
  const res = await result.json();
  return res;
  // axios
  //   .delete(URL, {
  //     headers: {
  //       // accesstoken: accesstoken,
  //       refreshtoken: refreshtoken,
  //       userid: userid,
  //     },
  //   })
  //   .then(function (response) {
  //     if (response.data) {
  //       updateAccessToken(response.data);
  //     }
  //     return response;
  //   })
  //   .catch(function (error) {
  //     return error;
  //     // setImage(null);
  //   });
}

async function axiosPost(URL, headers, body) {
  try {
    const accesstoken = localStorage.getItem("accessToken");
    const refreshtoken = localStorage.getItem("idToken");
    const userid = localStorage.getItem("userid");
    const result = await fetch(URL, {
      method: "POST",
      headers: {
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
        userid: userid,
        headers,
      },
      body,
    });
    const res = await result.json();
    updateAccessToken(res);
    return res;
  } catch (error) {
    return { message: "Server Error" };
  }
}

const updateAccessToken = (data) => {
  if (data && data.newAccessToken && data.newAccessToken) {
    localStorage.setItem("accessToken", data.newAccessToken);
  }
};

export { axiosGet, axiosDelete, axiosPost };
