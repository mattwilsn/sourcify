import { getToken } from "../services/token";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  path: string;
  method: RequestMethod;
  body?: any; // Optional body for POST/PUT requests
  headers?: Record<string, string>; // Optional custom headers
}

export async function apiRequest<T>({
  path,
  method,
  body,
  headers,
}: RequestOptions): Promise<T> {
  try {
    if ((await getToken()) && headers) {
      headers["Authorization"] = "Bearer " + getToken();
    }

    const response = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers, // Merge with custom headers
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Ensure response is parsed correctly (handle empty responses)
    const responseText = await response.text();
    const jsonResponse: T = responseText ? JSON.parse(responseText) : ({} as T);

    return jsonResponse;
  } catch (error) {
    console.log("Request Path:", path);
    console.log("Method:", method);
    console.log("Request Body:", body);
    console.log("Request Headers:", headers);
    console.error("API Request Error:", error);
    throw error; // Propagate the error
  }
}
