import React from "react";
import "./index.scss";
import { AppProvider } from "./components/context/Context";
import { ThemeProvider } from "./components/context/ThemeContext";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <ThemeProvider>
    <AppProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </AppProvider>
  </ThemeProvider>
);
