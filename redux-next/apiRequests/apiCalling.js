import React from "react";
import axios from "./axios";
class apiCalling {
  async makePostRequests(params) {
    if (params.method === "post") {
      return axios.post(params.url, params.body);
    }
  }
}

export default new apiCalling();
