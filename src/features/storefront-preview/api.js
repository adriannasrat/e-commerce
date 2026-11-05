// Same-origin JSON calls: the session lives in an httpOnly cookie.
export async function api(method, path, body) {
  let response;
  try {
    response = await fetch(path, {
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
  return data;
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
