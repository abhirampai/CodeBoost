import { QueryClient, QueryClientProvider } from "react-query";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useSignals } from "@preact/signals-react/runtime";

import Main from "./Components/Main";

import "./styles.css";
import ModelSelector from "./Components/ModelSelector";

const queryClient = new QueryClient();

export default function App() {
  useSignals();

  return (
    <QueryClientProvider client={queryClient}>
      <ModelSelector />
      <Main />
      <Analytics mode="production" />
      <SpeedInsights />
    </QueryClientProvider>
  );
}
