type Method = "GET" | "POST" | "PUT" | "DELETE";

// The versioned API prefix. Callers pass paths such as "/products".
export const API_PREFIX = "/api/v1";

// Same-origin JSON calls: the session lives in an httpOnly cookie.
export async function api<T = unknown>(
  method: Method,
  path: string,
  body?: unknown,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(API_PREFIX + path, {
      method,
      credentials: "same-origin",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "We could not reach the store. Check your connection and try again.");
  }
  const isJson = response.headers.get("content-type")?.includes("json");
  const data = isJson ? await response.json() : null;
  if (!response.ok) {
    throw new ApiError(response.status, data?.error || "Something went wrong. Please try again.");
  }
  return data as T;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
