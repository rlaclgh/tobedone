"use server";

import { cookies } from "next/headers";

export const setAuthToken = async (token: string) => {
  await cookies().set("accessToken", token);
  return;
};

export const getAuthToken = () => {
  "use server";
  return cookies().get("accessToken")?.value;
};
