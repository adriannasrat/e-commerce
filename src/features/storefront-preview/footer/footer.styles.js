// Dense, quiet footer in small type on light gray.
const line = '1px solid #d2d2d7';
const footerStyles = {
  '.res-footer': { background: 'var(--rx-gray)', color: 'rgba(0, 0, 0, 0.56)', fontSize: 12, lineHeight: 1.33, letterSpacing: '-0.01em' },
  '.res-footer .rx-wrap': { paddingBlock: '17px 21px' },
  '.res-footer-notes': { borderBottom: line, paddingBottom: 11 },
  '.res-footer-notes p': { margin: '0 0 8px' },
  '.res-footer a': { color: '#424245 !important', textDecoration: 'none' },
  '.res-footer a:hover': { color: 'var(--rx-ink) !important', textDecoration: 'underline' },
  '.res-footer-location': { display: 'flex', alignItems: 'center', gap: 6, paddingBlock: '14px 0' },
  '.res-footer-location a': { display: 'inline-flex', alignItems: 'center', minHeight: 32 },
  '.res-footer-location svg': { width: 16, height: 16 },
  '.res-footer-location > svg': { width: 14, color: '#86868b' },
  '.res-footer-location span': { color: '#424245' },
  '.res-footer-directory': { display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 24, paddingBlock: '20px 24px' },
  '.res-footer-directory h2': { margin: '0 0 9px', fontSize: 12, fontWeight: 600, color: 'var(--rx-ink)', letterSpacing: '-0.01em' },
  '.res-footer-directory ul': { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 },
  '.res-footer-more': { margin: 0, paddingBlock: '2px 10px', borderBottom: line },
  '.res-footer-more a': { color: 'var(--rx-link) !important', textDecoration: 'underline !important' },
  '.res-footer-credit': { display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 10 },
  '@media (max-width: 1023px)': {
    '.res-footer-directory': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', rowGap: 28 },
  },
  '@media (max-width: 733px)': {
    '.res-footer-directory': { gridTemplateColumns: '1fr', gap: 0, paddingBlock: '8px 16px' },
    '.res-footer-directory .disclosure': { borderBottom: line },
    '.res-footer-directory .disclosure-heading': { margin: 0, fontSize: 12 },
    '.res-footer-directory button': { justifyContent: 'space-between', width: '100%', minHeight: 44, padding: 0, color: '#424245', fontSize: 12 },
    '.res-footer-directory ul': { paddingBottom: 14, paddingLeft: 12 },
    '.res-footer-credit': { flexDirection: 'column' },
  },
};
export default footerStyles;
