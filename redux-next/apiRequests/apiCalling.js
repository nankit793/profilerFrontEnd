import React from "react";
import axios from "./axios";
class apiCalling {
  async makePostRequests(params) {
    if (params.method === "post") {
      return axios.post(params.url, params.body);
    }
  }
  async makeGetRequest(params) {
    console.log(params.body);
    if (params.method === "get") {
      return axios.get(params.url, {
        headers: {
          "Authorization": "ndlksndlsds",
          "userid": params.body.userid,
        },
      });
    }
  }
}

export default new apiCalling();
