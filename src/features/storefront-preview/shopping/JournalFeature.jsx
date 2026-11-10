import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Photo from '../ui/Photo';
import { lifestyle } from '../lifestyleImages';

export default function JournalFeature() {
  return <aside className="shop-journal" aria-label="Listening journal">
    <div><small><GraphicEqRounded /> Listening journal</small><h2>The everyday edit.</h2>
      <p>Slow mornings, the evening train and a moment to yourself. Explore three listening stories.</p>
      <a href="#preview-stories">Read the journal <ArrowForwardRounded /></a>
    </div>
    <div className="shop-journal-art"><Photo photo={lifestyle.pocket04Wood} decorative /></div>
  </aside>;
}
