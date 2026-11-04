import StorefrontDialog from "./StorefrontDialog";
import ScrollReveal from "./ScrollReveal";
import React, { useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeadphoneImage from "./HeadphoneImage";
import { headphoneImages } from "./headphoneImages";
import { listeningStories } from "./listening-story-data";
import useStoryGallery from "./useStoryGallery";
import { productHref } from "./usePreviewRoute";

export default function ListeningStories() {
  const [story, setStory] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { track, edges, move, updatePosition, onKeyDown } =
    useStoryGallery(reducedMotion);

  return (
    <section
      className="listening-stories"
      id="preview-stories"
      aria-labelledby="listening-title"
    >
      <ScrollReveal className="listening-heading">
        <div>
          <p className="listening-eyebrow">02 / A MORE PERSONAL PERSPECTIVE</p>
          <h2 id="listening-title">
            Made for your
            <br />
            kind of listening.
          </h2>
        </div>
        <p>
          Different moments. Different moods.
          <br />
          Find a little of yourself in every one.
        </p>
      </ScrollReveal>
      <div
        ref={track}
        className="listening-track"
        onScroll={updatePosition}
        role="region"
        aria-label="Listening stories"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {listeningStories.map((item, index) => (
          <ScrollReveal
            as="button"
            key={item.id}
            className={`listening-card listening-${item.tone}`}
            delay={index * 80}
            onClick={() => {
              setStory(item);
              setDetailOpen(true);
            }}
            aria-label={`Discover: ${item.title.replace("\n", " ")}`}
            aria-haspopup="dialog"
          >
            <span className="listening-eyebrow">{item.label}</span>
            <span className="listening-card-title">{item.title}</span>
            <HeadphoneImage
              image={headphoneImages.find((image) => image.id === item.id)}
              decorative
            />
            <span className="listening-card-footer">
              <span>{item.detail}</span>
              <span className="listening-plus">
                <AddIcon />
              </span>
            </span>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal className="listening-controls">
        <span>EXPLORE YOUR EVERYDAY</span>
        <div>
          <IconButton
            aria-label="Previous listening story"
            disabled={edges.start}
            onClick={() => move(-1)}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Next listening story"
            disabled={edges.end}
            onClick={() => move(1)}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </ScrollReveal>
      <StorefrontDialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        maxWidth="md"
        fullWidth
        aria-labelledby="listening-detail-title"
        transitionDuration={reducedMotion ? 0 : 300}
        PaperProps={{ className: "listening-detail" }}
      >
        {story && (
          <>
            <IconButton
              className="listening-detail-close"
              aria-label="Close listening story"
              onClick={() => setDetailOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <div className={`listening-detail-image listening-${story.tone}`}>
              <HeadphoneImage
                image={headphoneImages.find((image) => image.id === story.id)}
              />
            </div>
            <div className="listening-detail-copy">
              <p className="listening-eyebrow">{story.label}</p>
              <h2 id="listening-detail-title">{story.title}</h2>
              <p>{story.description}</p>
              <a
                href={productHref(story.id)}
                onClick={() => setDetailOpen(false)}
              >
                Explore this design
              </a>
            </div>
          </>
        )}
      </StorefrontDialog>
    </section>
  );
}
