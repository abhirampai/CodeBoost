import { QueryClient, QueryClientProvider } from "react-query";

import { Analytics } from "@vercel/analytics/react";
import { AppState } from "./Hooks/utils";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { useContext } from "react";
import { useSignals } from "@preact/signals-react/runtime";

import Main from "./Components/Main";

import "./styles.css";

const queryClient = new QueryClient();

export default function App() {
  useSignals();
  const { aiEngine } = useContext(AppState);

  return (
    <QueryClientProvider client={queryClient}>
      <Main aiEngine={aiEngine} />
      <Analytics mode="production" />
      <SpeedInsights />
    </QueryClientProvider>
  );
}
