import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import HeadphoneImage from '../HeadphoneImage';
import { headphoneImages } from '../headphoneImages';
import { paths } from "../routes";

// Form 01 as a cut-out, lit from behind so the dark model reads on the dark card.
const form01 = headphoneImages.find((image) => image.id === "black");

export default function JournalFeature() {
  return <aside className="shop-journal" aria-label="Listening journal">
    <div><small><GraphicEqRounded /> Listening journal</small><h2>The everyday edit.</h2>
      <p>Slow mornings, the evening train and a moment to yourself. Explore three listening stories.</p>
      <a href={paths.journal}>Read the journal <ArrowForwardRounded /></a>
    </div>
    <div className="shop-journal-art"><HeadphoneImage image={form01} decorative /></div>
  </aside>;
}
