import { setCookie, getCookie } from "cookies-next";

export const setAuthToken = (token: string) => {
  setCookie("accessToken", token);
  return;
};

export const getAuthToken = () => {
  return getCookie("accessToken");
};
