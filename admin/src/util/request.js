import axios from "axios";
// import Token from "@utils/token"

import { logout } from "../Redux/Actions/AuthActions";
import store from "../Redux/store";

const request = async (
  method = "get",
  request = "/",
  payload,
  params,
  isToken = false
) => {
  let headers = {};
  const authToken = JSON.parse(localStorage.getItem("auth"))
  if (isToken) {
    headers = {
      Authorization: `Bearer ${authToken.tokenData}`,
    };
  }

  const url = process.env.REACT_APP_API_HOST_ADMIN +request;
  // const url = `http://122.169.113.151:3007/admin${request}`
  const options = {
    method,
    url,
    data: payload !== undefined && payload,
    params: params,
    headers,
  };

  return new Promise((resolve, reject) => {
    axios(options, payload)
      .then((res) => {
        let { data } = res;
        if (data?.meta?.status === 1) {
          resolve(res);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        console.log(error,"error come")
        if (
          error?.response?.statusCode === 400 ||
          error?.response?.statusCode === 401 ||
          error?.response?.statusCode === 402 ||
          error?.response?.statusCode === 404 
        ) {
          // store.dispatch(logout())
        } else {
          reject(error);
        }
      });
  });
};

export default request;
