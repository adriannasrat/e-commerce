import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import useStoryGallery from './useStoryGallery';

function Gallery({ reducedMotion = false }) {
  const { track, edges, move, updatePosition, onKeyDown } = useStoryGallery(reducedMotion);
  return <>
    <div ref={track} data-testid="track" onScroll={updatePosition} onKeyDown={onKeyDown}>
      <div data-testid="first-card" /><div data-testid="second-card" /><div />
    </div>
    <button disabled={edges.start} onClick={() => move(-1)}>Previous</button>
    <button disabled={edges.end} onClick={() => move(1)}>Next</button>
  </>;
}

function setDimensions(element, scrollLeft) {
  Object.defineProperties(element, {
    scrollLeft: { configurable: true, value: scrollLeft },
    clientWidth: { configurable: true, value: 1000 },
    scrollWidth: { configurable: true, value: 1240 },
  });
  Object.defineProperty(screen.getByTestId('first-card'), 'offsetLeft', { value: 40 });
  Object.defineProperty(screen.getByTestId('second-card'), 'offsetLeft', { value: 440 });
  element.scrollBy = jest.fn();
  fireEvent.scroll(element);
}

test('allows going back from the end even when less than one card fits in the remaining scroll distance', () => {
  render(<Gallery />);
  const track = screen.getByTestId('track');
  setDimensions(track, 240);
  expect(screen.getByText('Next').disabled).toBe(true);
  expect(screen.getByText('Previous').disabled).toBe(false);
  fireEvent.click(screen.getByText('Previous'));
  expect(track.scrollBy).toHaveBeenCalledWith({ left: -400, behavior: 'smooth' });
  Object.defineProperty(track, 'scrollLeft', { configurable: true, value: 0 });
  fireEvent.scroll(track);
  expect(screen.getByText('Previous').disabled).toBe(true);
  expect(screen.getByText('Next').disabled).toBe(false);
});

test('keyboard navigation respects reduced motion', () => {
  render(<Gallery reducedMotion />);
  const track = screen.getByTestId('track');
  setDimensions(track, 0);
  fireEvent.keyDown(track, { key: 'ArrowRight' });
  expect(track.scrollBy).toHaveBeenCalledWith({ left: 400, behavior: 'instant' });
});
