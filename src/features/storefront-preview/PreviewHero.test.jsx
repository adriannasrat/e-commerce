import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PreviewHero from "./PreviewHero";
import { films } from "./ui/films";

let play;
let setInView;
beforeEach(() => {
  play = jest.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  window.IntersectionObserver = jest.fn((handler) => {
    setInView = (isIntersecting) => handler([{ isIntersecting }]);
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
});
afterEach(() => {
  jest.restoreAllMocks();
  delete window.IntersectionObserver;
});

test("the hero leads to the over-ear page and the store", () => {
  render(<PreviewHero />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Less noise. More feeling.");
  expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute("href", "#collection/over-ear");
  expect(screen.getByRole("link", { name: "Shop all" })).toHaveAttribute("href", "#preview-direction");
});

test("the hero film plays once, rests on its last frame and can be replayed", () => {
  render(<PreviewHero />);
  const video = screen.getByLabelText(films.home.description);
  expect(video.loop).toBe(false);
  setInView(true);
  expect(play).toHaveBeenCalledTimes(1);

  fireEvent.play(video);
  fireEvent.pause(video);
  fireEvent.ended(video);
  jest.spyOn(video, "ended", "get").mockReturnValue(true);
  setInView(false);
  setInView(true);
  expect(play).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByRole("button", { name: "Replay film" }));
  expect(play).toHaveBeenCalledTimes(2);
});

test("the hero keeps its message if the film cannot load", () => {
  render(<PreviewHero />);
  fireEvent.error(screen.getByLabelText(films.home.description));
  expect(screen.getByRole("link", { name: "Learn more" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /film/ })).toBeNull();
});
