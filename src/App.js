import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./Components/Main";
import "./styles.css";
import { useContext } from "react";
import { AppState } from "./Hooks/utils";
import { useSignals } from "@preact/signals-react/runtime";

const queryClient = new QueryClient();

export default function App() {
  useSignals();
  const { webLlmEngine } = useContext(AppState);

  return (
    <QueryClientProvider client={queryClient}>
      <Main webLlmEngine={webLlmEngine} />
    </QueryClientProvider>
  );
}
