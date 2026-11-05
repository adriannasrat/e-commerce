import gateHover, { HOVER_QUERY } from "./gateHover";

test("moves hover selectors behind a hover-capable pointer query", () => {
  const declarations = { color: "red" };
  expect(gateHover([{ ".a:hover": declarations }, { ".b": declarations }])).toEqual([
    { [HOVER_QUERY]: { ".a:hover": declarations } },
    { ".b": declarations },
  ]);
});

test("keeps non-hover parts of a selector list ungated", () => {
  const declarations = { color: "red" };
  expect(gateHover({ ".a:hover,\n.a:focus-visible": declarations })).toEqual([
    { ".a:focus-visible": declarations },
    { [HOVER_QUERY]: { ".a:hover": declarations } },
  ]);
});

test("recurses into media queries and leaves keyframes alone", () => {
  const frames = [{ from: { opacity: "0" } }];
  const result = gateHover({
    "@media (max-width: 600px)": [{ ".a:hover": { color: "red" } }],
    "@keyframes fade": frames,
  });
  expect(result).toEqual([
    {
      "@media (max-width: 600px)": [
        { [HOVER_QUERY]: { ".a:hover": { color: "red" } } },
      ],
    },
    { "@keyframes fade": frames },
  ]);
});
