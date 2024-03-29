import React from "react";
import axios from "./axios";
class apiCalling {
  async makePostRequests(params) {
    if (params.method === "post") {
      return axios.post(params.url, params.body);
    }
    if (params.method === "patch") {
      return axios.patch(params.url, {
        headers: {
          refreshtoken: localStorage.getItem("idToken"),
          userid: localStorage.getItem("userid"),
          data: params.body,
          accesstoken: localStorage.getItem("accessToken"),
        },
      });
    }
  }
  async makePatchRequest(params) {
    if (params.method === "patch") {
      // console.log(params.data);
      return axios.patch(params.url, {
        headers: {
          refreshtoken: localStorage.getItem("idToken"),
          userid: localStorage.getItem("userid"),
          data: params.data,
          accesstoken: localStorage.getItem("accessToken"),
        },
        mode: "cors",
      });
    }
  }
  async makeGetRequest(params) {
    if (params.method === "get") {
      return axios.get(params.url, {
        headers: {
          userid: params.body && params.body.userid ? params.body.userid : "",
          requirement:
            params.body && params.body.requirement
              ? params.body.requirement
              : null,
          responseType: params.responseType,
        },
      });
    }
  }

  async makeLoggedGetRequest(params) {
    if (params.method === "get") {
      return axios.get(params.url, {
        headers: {
          userid: localStorage.getItem("userid"),
          accesstoken: localStorage.getItem("accessToken"),
          refreshtoken: localStorage.getItem("idToken"),
        },
      });
    }
  }
}

export default new apiCalling();
