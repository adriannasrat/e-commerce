import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import HeadphoneImage from '../HeadphoneImage';
import { products } from '../products';
import { paths } from "../routes";

export default function JournalFeature() {
  // Atlas as a cut-out, lit from behind so the dark model reads on the dark card.
  const atlas = products.find((product) => product.id === "black")?.image;
  return <aside className="shop-journal" aria-label="Listening journal">
    <div><small><GraphicEqRounded /> Listening journal</small><h2>The everyday edit.</h2>
      <p>Slow mornings, the evening train and a moment to yourself. Explore three listening stories.</p>
      <a href={paths.journal}>Read the journal <ArrowForwardRounded /></a>
    </div>
    <div className="shop-journal-art">{atlas && <HeadphoneImage image={atlas} decorative />}</div>
  </aside>;
}
