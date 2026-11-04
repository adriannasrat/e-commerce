import React from 'react';
import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import ScrollReveal from '../ScrollReveal';
import HeadphoneImage from '../HeadphoneImage';
import { products } from '../products';

const model = products.find(item => item.id === 'in-ear-red');

export default function JournalFeature() {
  return <ScrollReveal as="aside" className="shop-journal" aria-label="Listening journal">
    <div><small><GraphicEqRounded /> LISTENING JOURNAL</small><h2>The everyday edit.</h2>
      <p>Slow mornings, the evening train and a moment to yourself. Explore three listening stories.</p>
      <a href="#preview-stories">Read the journal <ArrowForwardRounded /></a>
    </div>
    <div className="shop-journal-art"><HeadphoneImage image={model.image} decorative /></div>
  </ScrollReveal>;
}
