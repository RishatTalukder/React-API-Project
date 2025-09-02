import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootswatch/dist/minty/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GlobalContext from "./context/GlobalContext.jsx";
// main.jsx
import { FaBug, FaCocktail } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

const svgIcon = ReactDOMServer.renderToStaticMarkup(
  <FaCocktail style={{ color: "#21792aff", width: "24px", height: "24px" }} />
);
const blob = new Blob([svgIcon], { type: "image/svg+xml" });
const url = URL.createObjectURL(blob);

const link =
  document.querySelector("link[rel~='icon']") || document.createElement("link");
link.rel = "icon";
link.href = url;
document.head.appendChild(link);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </StrictMode>
);
