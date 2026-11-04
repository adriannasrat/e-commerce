const rule = '1px solid #d6d6cf';
const title = { margin: '8px 0 16px', fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-.055em', fontWeight: 550, lineHeight: 1.03 };
const eyebrow = { fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase' };

const shoppingStyles = {
  '.shop-card-add': { minHeight: 44, alignSelf: 'center', border: rule, borderRadius: 24, padding: '8px 20px', background: 'transparent', color: 'inherit', fontSize: 13, cursor: 'pointer', marginTop: 8, transition: 'background .2s' },
  '.shop-card-add:hover': { background: '#eeefeb' },
  '.shop-filters, .shop-shortcuts': { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBlock: '20px 26px' },
  '.shop-filters button': { minHeight: 44, padding: '7px 20px', font: 'inherit', fontSize: 14, borderRadius: 24, border: rule, background: 'transparent', cursor: 'pointer', textTransform: 'capitalize' },
  '.shop-filters button[aria-pressed="true"]': { background: '#20211e', color: '#fff', borderColor: '#20211e' },
  '.shop-shortcuts a': { padding: '12px 18px', fontSize: 14, textUnderlineOffset: 4 },
  '.shop-guide, .shop-compare': { width: 'min(1120px, 90%)', marginInline: 'auto', paddingBlock: 'clamp(44px, 6vw, 88px)' },
  '.shop-guide': { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7%' },
  '.shop-guide h2, .shop-compare h2, .shop-journal h2': title,
  '.shop-guide small, .shop-compare small, .shop-journal small': eyebrow,
  '.shop-guide h3': { margin: 0, fontSize: 18 },
  '.shop-guide .disclosure': { borderTop: rule },
  '.shop-guide button': { width: '100%', minHeight: 70, justifyContent: 'space-between', textAlign: 'left' },
  '.shop-guide button span, .shop-journal small, .shop-journal a': { display: 'inline-flex', alignItems: 'center', gap: 12 },
  '.shop-guide p, .shop-guide a': { fontSize: 15, lineHeight: 1.6 },
  '.shop-guide a': { display: 'inline-block', paddingBlock: '0 16px' },
  '.shop-compare > p': { color: '#565751', maxWidth: '50ch' },
  '.shop-compare-grid': { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 'clamp(8px, 2vw, 24px)', marginTop: 28 },
  '.shop-compare-grid article': { background: '#fff', borderRadius: 18, padding: 'clamp(12px, 3vw, 36px)' },
  '.shop-compare-grid label, .shop-search label': { display: 'grid', gap: 6, fontSize: 12 },
  '.shop-compare-grid select, .shop-search input': { width: '100%', minHeight: 44, background: '#fafaf8', border: rule, color: '#242520', borderRadius: 10, fontSize: 16, paddingInline: 10 },
  '.shop-compare-grid svg': { width: '100%', height: 'clamp(115px, 20vw, 245px)', marginBlock: 18 },
  '.shop-compare-grid dl > div': { paddingBlock: 10, borderTop: rule },
  '.shop-compare-grid dt': { fontSize: 12, color: '#5c5d56' }, '.shop-compare-grid dd': { margin: 0, textTransform: 'capitalize' },
  '.shop-compare-grid a': { display: 'inline-flex', minHeight: 44, alignItems: 'center', fontSize: 14, textUnderlineOffset: 4 },
  '.shop-search p': { fontSize: 13, color: '#66665e' }, '.shop-search ul': { padding: 0, margin: 0, listStyle: 'none' },
  '.shop-search a': { display: 'grid', gridTemplateColumns: '42px 1fr auto', gap: 12, alignItems: 'center', minHeight: 60, borderTop: rule, color: '#242520', textDecoration: 'none', fontSize: 13 },
  '.shop-search small': { display: 'block', color: '#66665e' }, '.shop-search svg': { width: 38, height: 44 },
  '.shop-journal': { isolation: 'isolate', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4%', alignItems: 'center', padding: 'clamp(32px, 7vw, 96px)', background: '#ebe1da', overflow: 'hidden' },
  '.shop-journal p': { maxWidth: '42ch', lineHeight: 1.55 }, '.shop-journal a': { minHeight: 44, fontWeight: 600, textUnderlineOffset: 4 },
  '.shop-journal-art': { display: 'grid', placeItems: 'center', position: 'relative' },
  '.shop-journal-art::before': { content: '""', gridArea: '1 / 1', width: '82%', aspectRatio: '1', borderRadius: '50%', border: '1px solid #bda99b', boxShadow: '0 0 0 22px #cbb7aa30, 0 0 0 48px #d6c7bc44' },
  '.shop-journal-art svg': { gridArea: '1 / 1', position: 'relative', width: '90%', height: 'clamp(170px, 25vw, 340px)' },
  '@media (prefers-reduced-motion: no-preference)': {
    '.shop-journal[data-phase="entering"] .shop-journal-art::before': { animation: 'sound-ripple .68s ease-out both' },
    '@keyframes sound-ripple': { from: { opacity: 0, transform: 'scale(.85)' }, to: { opacity: 1, transform: 'scale(1)' } },
    '.shop-compare-grid svg': { animation: 'sound-study-in .3s ease-out' },
  },
  '@media (max-width: 640px)': {
    '.shop-guide, .shop-journal': { gridTemplateColumns: '1fr', gap: 22 },
    '.shop-compare': { width: '100%' }, '.shop-journal-art': { maxWidth: 260, width: '100%', marginInline: 'auto' },
  },
};
export default shoppingStyles;
