import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import Theme from "./Theme.tsx";
import './i18n.ts'; // Import the i18n.ts file

import { registerSW } from 'virtual:pwa-register'
registerSW()

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <HashRouter>
      <Theme>
        <App />
      </Theme>
    </HashRouter>
  // </StrictMode>
);
