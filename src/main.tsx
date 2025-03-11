import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Theme from "./Theme.tsx";
import './i18n.ts'; // Import the i18n.ts file

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Wrap your App with BrowserRouter */}
      <Theme>
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
