import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import StorefrontPreview from "./features/storefront-preview/StorefrontPreview";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(window.location.pathname.replace(/\/$/, "") === "/preview" ? (
  <React.StrictMode><StorefrontPreview /></React.StrictMode>
) : (
  <BrowserRouter>
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartProvider>
  </BrowserRouter>
));
