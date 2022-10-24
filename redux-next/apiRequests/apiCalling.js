import React from "react";

class apiCalling {
  async makePostRequests(params) {
    try {
      console.log(params.body);
      return await fetch(params.url, {
        method: params.method,
        body: JSON.stringify(params.body),
      });
    } catch (error) {
      return error;
    }
  }
}

export default new apiCalling();
