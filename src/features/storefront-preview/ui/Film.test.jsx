import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Film from "./Film";
import { films, productFilms } from "./films";
import { products } from "../products";

const film = films["over-ear"];

function mockObserver() {
  const instance = { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() };
  let callback;
  window.IntersectionObserver = vi.fn(function (handler) {
    callback = handler;
    return instance;
  });
  return (isIntersecting) => callback([{ isIntersecting }]);
}

let play;
let pause;
beforeEach(() => {
  play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
  delete window.IntersectionObserver;
  delete window.matchMedia;
});

test("a film downloads nothing until needed and plays only while on screen", () => {
  const setInView = mockObserver();
  render(<Film film={film} />);
  const video = screen.getByLabelText(film.description);
  expect(video).toHaveAttribute("preload", "none");
  expect(video.muted).toBe(true);
  expect(play).not.toHaveBeenCalled();
  setInView(true);
  expect(play).toHaveBeenCalledTimes(1);
  setInView(false);
  expect(pause).toHaveBeenCalledTimes(1);
});

test("pausing a film holds it when it scrolls back into view", () => {
  const setInView = mockObserver();
  render(<Film film={film} />);
  const video = screen.getByLabelText(film.description);
  vi.spyOn(video, "paused", "get").mockReturnValue(false);
  fireEvent.play(video);
  fireEvent.click(screen.getByRole("button", { name: "Pause film" }));
  expect(pause).toHaveBeenCalledTimes(1);
  fireEvent.pause(video);
  expect(screen.getByRole("button", { name: "Play film" })).toBeInTheDocument();
  setInView(true);
  expect(play).not.toHaveBeenCalled();
});

test("reduced motion keeps the poster until the visitor presses play", () => {
  const setInView = mockObserver();
  window.matchMedia = vi.fn(() => ({ matches: true }));
  render(<Film film={film} />);
  setInView(true);
  expect(play).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Play film" }));
  expect(play).toHaveBeenCalledTimes(1);
});

test("a film that cannot load removes its whole section", () => {
  render(<Film film={film} />);
  fireEvent.error(screen.getByLabelText(film.description));
  expect(screen.queryByRole("heading", { name: film.title })).toBeNull();
});

test("every product film belongs to a model in the catalogue", () => {
  Object.keys(productFilms).forEach((id) => {
    expect(products.some((product) => product.id === id)).toBe(true);
  });
});
