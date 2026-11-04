const footerStyles = {
  '.res-footer': { background: '#eeefec', borderTop: '1px solid #d8d9d4', color: '#41433e' },
  '.res-footer-inner': { width: 'min(1080px, 90%)', marginInline: 'auto', paddingBlock: '28px 18px' },
  '.res-footer-location, .res-footer-location a, .res-footer-credit': { display: 'flex', alignItems: 'center', gap: 10 },
  '.res-footer-location': { borderBottom: '1px solid #cfd1ca', paddingBottom: 16, fontSize: 13 },
  '.res-footer-location > svg': { width: 15, color: '#72756e' },
  '.res-footer-location a': { minHeight: 44, fontSize: 16, fontWeight: 750, letterSpacing: '-.06em' },
  '.res-footer a': { textDecoration: 'none' },
  '.res-footer a:hover': { textDecoration: 'underline', textUnderlineOffset: 4 },
  '.res-footer-directory': { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, paddingBlock: '28px 34px' },
  '.res-footer-directory h2': { fontSize: 13, margin: '0 0 8px', fontWeight: 650 },
  '.res-footer-directory ul': { listStyle: 'none', margin: 0, padding: 0 },
  '.res-footer-directory li a': { display: 'inline-flex', alignItems: 'center', minHeight: 32, fontSize: 13 },
  '.res-footer-credit': { justifyContent: 'space-between', borderTop: '1px solid #cfd1ca', fontSize: 12, paddingTop: 18 },
  '@media (max-width: 600px)': {
    '.res-footer-directory': { gridTemplateColumns: '1fr', gap: 0, paddingBlock: '8px 16px' },
    '.res-footer-directory .disclosure': { borderBottom: '1px solid #d8d9d4' },
    '.res-footer-directory .disclosure-heading': { margin: 0 },
    '.res-footer-directory button': { justifyContent: 'space-between', width: '100%', minHeight: 48, padding: 0 },
    '.res-footer-directory li a': { minHeight: 44 },
    '.res-footer-credit': { alignItems: 'flex-start', flexDirection: 'column' },
  },
};
export default footerStyles;
