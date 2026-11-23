import { act, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { LoadingBar } from "./Loading";

function Waiting({ until }: { until: Promise<string> }) {
  useQuery({ queryKey: ["slow"], queryFn: () => until });
  return null;
}

test("the bar shows only once a load lasts, and leaves when it is done", async () => {
  vi.useFakeTimers();
  let finish: (value: string) => void = () => {};
  const until = new Promise<string>((resolve) => (finish = resolve));
  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <LoadingBar />
      <Waiting until={until} />
    </QueryClientProvider>,
  );
  const bar = container.querySelector(".rx-loading-bar");
  expect(bar).toHaveAttribute("data-shown", "false");
  await act(() => vi.advanceTimersByTimeAsync(100));
  expect(bar).toHaveAttribute("data-shown", "false");
  await act(() => vi.advanceTimersByTimeAsync(100));
  expect(bar).toHaveAttribute("data-shown", "true");
  finish("done");
  await act(() => vi.advanceTimersByTimeAsync(10));
  expect(bar).toHaveAttribute("data-shown", "false");
  vi.useRealTimers();
});
