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
    const response = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers, // Merge with default headers
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return (await response.json()) as T; // Ensure the response is typed
  } catch (error) {
    console.error("API Request Error:", error);
    throw error; // Propagate the error
  }
}
