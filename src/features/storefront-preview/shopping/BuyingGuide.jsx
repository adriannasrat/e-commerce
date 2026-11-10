import HeadphonesOutlined from '@mui/icons-material/HeadphonesOutlined';
import EarbudsOutlined from '@mui/icons-material/EarbudsOutlined';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import Disclosure from '../Disclosure';
import { collectionHref } from '../collections/collections';

export default function BuyingGuide({ category }) {
  const over = category === 'over-ear';
  const Icon = over ? HeadphonesOutlined : EarbudsOutlined;
  return <section className="shop-guide" aria-label="Listening guide">
    <div data-reveal="up"><small>Listening guide</small><h2>Questions? Answers.</h2></div>
    <div data-reveal="up">
      <Disclosure label={<span><Icon />How does this style fit?</span>} heading="h3">
        <p>{over ? 'The Form series has a headband and ear cups that sit around your ears. Explore the Pocket series if you prefer a smaller in-ear design.' : 'Pocket models sit in your ears and travel in a compact case. Explore the Form series if you prefer a headband and full ear cups.'}</p>
        <a href={collectionHref(over ? 'in-ear' : 'over-ear')}>Explore the other fit</a>
      </Disclosure>
      <Disclosure label={<span><BookmarkBorder />Can I save a model?</span>} heading="h3">
        <p>Open a model and select Save for later. Your saved pairs are available under Your saves in the bag menu on this device.</p>
      </Disclosure>
    </div>
  </section>;
}
