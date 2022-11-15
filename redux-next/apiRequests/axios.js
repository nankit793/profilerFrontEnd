import axios from "axios";
import local from "./localStorage";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import cookie from "js-cookie";
import Router from "next/router";
let refreshTokenPromise = null;

const serverAddress = process.env.NEXT_PUBLIC_BACKEND_URL;
const serverTimeout = process.env.NEXTPPUBLIC_BACKEND_TIMEOUT;

const instance = axios.create({
  baseURL: serverAddress,
  headers: {
    "Content-Type": `application/json`,
  },
  timeout: serverTimeout,
});
instance.interceptors.request.use(
  async (req) => {
    const token = local.getItem("idToken") ? local.getItem("idToken") : null;
    if (token) {
      req.headers["Authorization"] = `Bearer ${local.getItem("idToken")}`;
      const user = jwt_decode(token);
      let val = user && dayjs.unix(user.exp).subtract(2, "minute");
      const isExpired = val && val.diff(dayjs()) < 1;

      if (!isExpired) return req;

      if (local.getItem("rememberMe")) {
        let url = `${serverAddress}/user/refreshToken?sub=${user.sub}&provider=COGNITO`;
        if (
          user.identities &&
          user.identities.length > 0 &&
          user.identities[0] &&
          user.identities[0].providerName
        ) {
          url = `${serverAddress}/user/refreshToken?sub=${user.sub}&provider=${user.identities[0].providerName}`;
        }
        if (!refreshTokenPromise) {
          refreshTokenPromise = axios
            .post(url, local.getItem("refreshToken"), {
              headers: {
                "Content-Type": "text/plain",
              },
            })
            .then((response) => {
              refreshTokenPromise = null;
              const data = response && response.data;
              if (data.accessToken && data.refreshToken && data.idToken) {
                local.setItem("accessToken", data.accessToken);
                local.setItem("refreshToken", data.refreshToken);
                local.setItem("idToken", data.idToken);
                req.headers["Authorization"] = `Bearer ${data.idToken}`;
              } else {
                Router.push("/login");
                cookie.remove("token");
                local.setItem("logout", Date.now());
                local.clearStorage();
                if (!local.getItem("pathname")) {
                  local.setItem("pathname", "/dashboard");
                }
              }
            })
            .catch((err) => {
              Router.push("/login");
              cookie.remove("token");
              local.setItem("logout", Date.now());
              local.clearStorage();
              if (!local.getItem("pathname")) {
                local.setItem("pathname", "/dashboard");
              }
            });
        }
      } else {
        local.setItem("pathname", "/login");
        Router.push("/login");
        const email = local.getItem("email");
        let url = `${serverAddress}/user/refreshToken?sub=${user.sub}&provider=COGNITO`;
        if (
          user.identities &&
          user.identities.length > 0 &&
          user.identities[0] &&
          user.identities[0].providerName
        ) {
          url = `${serverAddress}/user/refreshToken?sub=${user.sub}&provider=${user.identities[0].providerName}`;
        }
        if (!refreshTokenPromise) {
          refreshTokenPromise = axios
            .post(url, local.getItem("refreshToken"), {
              headers: {
                "Content-Type": "text/plain",
              },
            })
            .then(async (response) => {
              refreshTokenPromise = null;
              const data = response && response.data;
              let isExternal = localStorage.getItem("isExternal")
                ? true
                : false;
              const response1 =
                data &&
                data.idToken &&
                (await axios.post(
                  isExternal
                    ? `${serverAddress}/user/logout?isExternal=${isExternal}`
                    : `${serverAddress}/user/logout`,
                  null,
                  {
                    headers: {
                      Authorization: `Bearer ${data.idToken}`,
                    },
                  }
                ));

              cookie.remove("token");
              local.setItem("logout", Date.now());
              local.clearStorage();
              if (!local.getItem("pathname")) {
                local.setItem("pathname", "/dashboard");
              }
              return Promise.reject(req);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
      }
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const token = local.getItem("idToken") ? local.getItem("idToken") : null;
    const user = token && jwt_decode(token);
    let val = user && dayjs.unix(user.exp).subtract(2, "minute");
    const isExpired = val && val.diff(dayjs()) < 1;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry &&
      user &&
      isExpired
    ) {
      originalRequest._retry = true;
      let url = `${serverAddress}/user/refreshToken?sub=${user.sub}&provider=COGNITO`;
      if (
        user.identities &&
        user.identities.length > 0 &&
        user.identities[0] &&
        user.identities[0].providerName
      ) {
        url = `${serverAddress}/user/refreshToken?sub=${user.sub}&provider=${user.identities[0].providerName}`;
      }
      return axios
        .post(url, local.getItem("refreshToken"), {
          headers: {
            "Content-Type": "text/plain",
          },
        })
        .then(({ data }) => {
          if (data.accessToken && data.refreshToken && data.idToken) {
            local.setItem("accessToken", data.accessToken);
            local.setItem("refreshToken", data.refreshToken);
            local.setItem("idToken", data.idToken);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + data.idToken;
            originalRequest.headers["Authorization"] = "Bearer " + data.idToken;

            return axios(originalRequest);
          } else {
            Router.push("/login");
            cookie.remove("token");
            local.setItem("logout", Date.now());
            local.removeItem("accessToken");
            local.getItem("rememberMe") && local.removeItem("rememberMe");
            local.getItem("isExternal") && local.removeItem("isExternal");
            local.removeItem("refreshToken");
            local.removeItem("idToken");
            local.removeItem("email");
            local.removeItem("userId");
            if (!local.getItem("pathname"))
              local.setItem("pathname", "/dashboard");
            // local.clearStorage();
            return Promise.reject(error);
          }
        })
        .catch((err) => {
          Router.push("/login");
          cookie.remove("token");
          local.setItem("logout", Date.now());
          local.removeItem("accessToken");
          local.getItem("rememberMe") && local.removeItem("rememberMe");
          local.getItem("isExternal") && local.removeItem("isExternal");
          local.removeItem("refreshToken");
          local.removeItem("idToken");
          local.removeItem("email");
          local.removeItem("userId");
          if (!local.getItem("pathname")) {
            local.setItem("pathname", "/dashboard");
          }

          return Promise.reject(error);
        });
    }

    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.status === "ERROR" &&
      error.response.data.message &&
      (error.response.data.message.indexOf("Refresh Token has been revoked") >=
        0 ||
        error.response.data.message.indexOf("Refresh Token has expired") >= 0)
    ) {
      Router.push("/login");
      cookie.remove("token");
      local.setItem("logout", Date.now());
      local.removeItem("accessToken");
      local.getItem("rememberMe") && local.removeItem("rememberMe");
      local.getItem("isExternal") && local.removeItem("isExternal");
      local.removeItem("refreshToken");
      local.removeItem("idToken");
      local.removeItem("email");
      local.removeItem("userId");
      if (!local.getItem("pathname")) {
        local.setItem("pathname", "/dashboard");
      }
    }

    return Promise.reject(error);
  }
);
export { instance as default };
