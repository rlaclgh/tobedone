import { getAuthToken } from "../_utils/cookie";

const BASE_URL = "http://localhost:5000";

interface ApiOptions {
  method: "GET" | "POST" | "DELETE" | "PUT" | "FETCH";
  data?: unknown;
  headers?: Record<string, string>;
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
}

const api = async <R, D>(
  url: string,
  options?: ApiOptions & { data?: D }
): Promise<R> => {
  const { method, data, headers, cache, next } = options || {};
  const accessToken = await getAuthToken();

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
      ...headers, // 사용자 정의 헤더 병합
    },
  };

  if (data) {
    fetchOptions.body = JSON.stringify(data); // Serialize data if present
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...fetchOptions,
    cache: cache || "no-store", // Default cache option
    next: next || {}, // Handle revalidation and caching
  });

  // Check for errors
  if (!response.ok) {
    return response.json() as Promise<R>;
  }

  return response.json() as Promise<R>;
};

export default api;
