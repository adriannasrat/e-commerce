import { alternateTones } from "./CategoryPage";

const model = (id, finish) => ({ id, image: { finish } });

test("gallery cards alternate light and dark, each model on its own tone", () => {
  const inEar = [model("pearl", "chalk"), model("pebble", "graphite"), model("prism", "graphite"), model("drift", "chalk")];
  expect(alternateTones(inEar).map(({ id }) => id)).toEqual(["pearl", "pebble", "drift", "prism"]);

  const overEar = [model("atlas", "graphite"), model("halo", "chalk"), model("tide", "graphite"), model("grove", "chalk")];
  expect(alternateTones(overEar).map(({ id }) => id)).toEqual(["atlas", "halo", "tide", "grove"]);
});
