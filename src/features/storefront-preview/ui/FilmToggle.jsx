import React from "react";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import ReplayRounded from "@mui/icons-material/ReplayRounded";

export default function FilmToggle({ playing, ended, onClick }) {
  const [label, Icon] = playing
    ? ["Pause film", PauseRounded]
    : ended
      ? ["Replay film", ReplayRounded]
      : ["Play film", PlayArrowRounded];
  return (
    <button
      type="button"
      className="rx-film-toggle"
      onClick={onClick}
      aria-label={label}
    >
      <Icon />
    </button>
  );
}
