import { createTheme } from "@mui/material/styles";

// System UI type renders as SF Pro on Apple devices and falls back to the
// platform's own sans-serif elsewhere, so nothing extra has to load.
export const fontStack =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

const theme = createTheme({
  palette: {
    primary: { main: "#b8461b" },
    secondary: { main: "#1d1d1f" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#1d1d1f", secondary: "#6e6e73" },
  },
  typography: {
    fontFamily: fontStack,
    button: { textTransform: "none", fontWeight: 400 },
  },
  shape: { borderRadius: 18 },
  components: {
    // Material ripples clash with the storefront's press-scale feedback.
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44, padding: "10px 22px" } },
    },
    MuiIconButton: {
      styleOverrides: { root: { width: 44, height: 44 } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 18 },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(232, 232, 237, 0.6)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        },
        invisible: {
          backgroundColor: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        },
      },
    },
  },
});

export default theme;
