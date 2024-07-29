import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./Components/Main";
import "./styles.css";
import { useContext } from "react";
import { AppState } from "./Hooks/utils";
import { Progress } from "antd";
import { useSignals } from "@preact/signals-react/runtime";

const queryClient = new QueryClient();

export default function App() {
  useSignals();
  const { modelLoading, percent, webLlmEngine } = useContext(AppState);

  if (modelLoading.value) {
    return (
      <div className="flex flex-col w-full h-screen justify-center p-20">
        Please Wait while the model is being loaded...
        <Progress showInfo percent={percent.value} />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Main webLlmEngine={webLlmEngine} />
    </QueryClientProvider>
  );
}
