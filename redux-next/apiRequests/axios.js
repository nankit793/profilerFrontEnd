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

export { instance as default };
