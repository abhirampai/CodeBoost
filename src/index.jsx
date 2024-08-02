import { AppState, createAppState } from "./Hooks/utils";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppState.Provider value={createAppState()}>
      <App />
    </AppState.Provider>
  </StrictMode>,
);
