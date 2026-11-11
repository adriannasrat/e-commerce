import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./api";

// Server state lives in one query cache. Only lost connections are retried:
// an error response from our own API would most likely fail again.
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failures, error) =>
          error instanceof ApiError && error.status === 0 && failures < 2,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: false },
    },
  });
}
