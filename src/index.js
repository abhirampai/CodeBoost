import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppState, createAppState } from "./Components/utils";

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
