import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./Components/Main";
import "./styles.css";
import { useContext } from "react";
import { AppState } from "./Hooks/utils";
import { Spin } from "antd";
import { useSignals } from "@preact/signals-react/runtime";

const queryClient = new QueryClient();

export default function App() {
  useSignals();
  const { modelLoading, webLlmEngine } = useContext(AppState);

  if (modelLoading.value) {
    return (
      <Spin
        fullscreen
        tip="Please wait while the model is being loaded..."
        size="large"
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Main webLlmEngine={webLlmEngine} />
    </QueryClientProvider>
  );
}
