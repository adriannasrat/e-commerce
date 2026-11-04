import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#151515" },
    secondary: { main: "#ff6b00", contrastText: "#151515" },
    background: { default: "#eeedeb", paper: "#f7f7f5" },
    text: { primary: "#151515", secondary: "#5b5b57" },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 24 },
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
  },
});

export default theme;
