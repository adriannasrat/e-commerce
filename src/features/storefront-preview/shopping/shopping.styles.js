// Model comparison, listening guide and catalogue search.
const line = '1px solid #d2d2d7';

const shoppingStyles = {
  // Compare any two
  '.shop-compare': { width: 'min(980px, calc(100% - 44px))', marginInline: 'auto', paddingBlock: 'clamp(56px, 8vw, 100px)', textAlign: 'center', scrollMarginTop: 60 },
  '.shop-compare small': { display: 'block', fontSize: 17, fontWeight: 600, color: 'var(--rx-new)' },
  '.shop-compare h2': { margin: '6px 0 10px', fontSize: 'clamp(40px, 5.5vw, 64px)', lineHeight: 1.06, fontWeight: 600, letterSpacing: '-0.009em' },
  '.shop-compare > p': { margin: '0 auto', maxWidth: '46ch', fontSize: 21, color: 'var(--rx-muted)' },
  '.shop-compare-grid': { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(16px, 4vw, 48px)', marginTop: 48 },
  '.shop-compare-grid article': { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  '.shop-compare-grid label': { display: 'grid', gap: 6, width: '100%', maxWidth: 260, fontSize: 12, color: 'var(--rx-muted)' },
  '.shop-compare-grid select, .shop-search input': {
    width: '100%', minHeight: 44, padding: '0 36px 0 14px', border: line, borderRadius: 12, background: '#fff', color: 'var(--rx-ink)',
    font: 'inherit', fontSize: 17, appearance: 'none',
    backgroundImage: 'linear-gradient(45deg, transparent 50%, #6e6e73 50%), linear-gradient(135deg, #6e6e73 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 20px) 50%, calc(100% - 15px) 50%', backgroundSize: '5px 5px', backgroundRepeat: 'no-repeat',
  },
  '.shop-compare-grid select:focus-visible, .shop-search input:focus-visible': { outline: 'none', borderColor: 'var(--rx-accent)', boxShadow: '0 0 0 3px rgba(184, 70, 27, 0.3)' },
  '.shop-compare-grid svg': { width: '100%', height: 'clamp(150px, 22vw, 260px)', marginBlock: 28 },
  '.shop-compare-grid dl': { width: '100%', margin: 0 },
  '.shop-compare-grid dl > div': { paddingBlock: 16, borderTop: line },
  '.shop-compare-grid dt': { fontSize: 12, color: 'var(--rx-muted)' },
  '.shop-compare-grid dd': { margin: '4px 0 0', fontSize: 21, fontWeight: 600, textTransform: 'capitalize', fontVariantNumeric: 'tabular-nums' },
  '.shop-compare-grid a': {
    display: 'inline-flex', alignItems: 'center', minHeight: 36, marginTop: 8, padding: '7px 16px', borderRadius: 980, background: 'var(--rx-accent)',
    color: '#fff !important', textDecoration: 'none', fontSize: 14, transition: 'background-color 200ms ease, scale var(--press-duration) var(--ease-out)',
  },
  '.shop-compare-grid a:hover': { background: 'var(--rx-accent-hover)' },
  // Listening guide (accordion)
  '.shop-guide': { width: 'min(980px, calc(100% - 44px))', marginInline: 'auto', paddingBlock: 'clamp(56px, 8vw, 100px)' },
  '.shop-guide > div:first-of-type': { marginBottom: 28 },
  '.shop-guide small': { display: 'block', fontSize: 17, fontWeight: 600, color: 'var(--rx-muted)', marginBottom: 6 },
  '.shop-guide h2': { margin: 0, fontSize: 'clamp(32px, 4.2vw, 48px)', lineHeight: 1.08, fontWeight: 600 },
  '.shop-guide > div:last-of-type': { padding: '8px clamp(20px, 4vw, 48px)', borderRadius: 28, background: 'var(--rx-gray)' },
  '.shop-guide .disclosure + .disclosure': { borderTop: line },
  '.shop-guide h3': { margin: 0 },
  '.shop-guide button': { width: '100%', minHeight: 84, justifyContent: 'space-between', textAlign: 'left', fontSize: 21, fontWeight: 600, letterSpacing: '0.011em' },
  '.shop-guide button > span': { display: 'inline-flex', alignItems: 'center', gap: 14 },
  '.shop-guide button svg': { color: 'var(--rx-muted)' },
  '.shop-guide p': { margin: '0 0 12px', maxWidth: '60ch', fontSize: 17, lineHeight: 1.47, color: '#424245' },
  '.shop-guide a': { display: 'inline-flex', minHeight: 44, alignItems: 'center', color: 'var(--rx-link) !important', textDecoration: 'none', marginBottom: 12 },
  '.shop-guide a::after': { content: '" ›"', whiteSpace: 'pre' },
  // Search
  '.shop-search label': { display: 'grid', gap: 8, fontSize: 12, color: 'var(--rx-muted)' },
  '.shop-search input': { backgroundImage: 'none', paddingInline: 14, fontSize: 21, minHeight: 52 },
  '.shop-search p': { margin: '14px 0 8px', fontSize: 12, color: 'var(--rx-muted)' },
  '.shop-search ul': { margin: 0, padding: 0, listStyle: 'none' },
  '.shop-search a': {
    display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 14, alignItems: 'center', minHeight: 60, paddingInline: 8, borderRadius: 12,
    color: 'var(--rx-ink) !important', textDecoration: 'none', fontSize: 14, transition: 'background-color 150ms ease',
  },
  '.shop-search a:hover': { background: 'var(--rx-gray)' },
  '.shop-search strong': { fontWeight: 600 },
  '.shop-search small': { display: 'block', color: 'var(--rx-muted)', fontSize: 12, textTransform: 'capitalize' },
  '.shop-search svg': { width: 40, height: 44 },
  '.shop-search a > span:last-child': { color: 'var(--rx-muted)', fontSize: 12, fontVariantNumeric: 'tabular-nums' },
  '@media (prefers-reduced-motion: no-preference)': {
    '.shop-compare-grid svg': { animation: 'sound-study-in .36s var(--ease-out)' },
  },
  '@media (max-width: 640px)': {
    '.shop-compare-grid dd': { fontSize: 17 },
  },
};
export default shoppingStyles;
