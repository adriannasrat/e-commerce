import { ApiError } from "./api";
import { createQueryClient } from "./queryClient";

const retry = createQueryClient().getDefaultOptions().queries?.retry as (
  failures: number,
  error: unknown,
) => boolean;

test("a lost connection is retried twice", () => {
  const offline = new ApiError(0, "We could not reach the store.");
  expect(retry(0, offline)).toBe(true);
  expect(retry(1, offline)).toBe(true);
  expect(retry(2, offline)).toBe(false);
});

test("error responses from the API are not retried", () => {
  expect(retry(0, new ApiError(500, "Something went wrong"))).toBe(false);
  expect(retry(0, new ApiError(401, "Sign in required"))).toBe(false);
  expect(retry(0, new Error("Unexpected"))).toBe(false);
});
