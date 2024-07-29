import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./Components/Main";
import "./styles.css";
import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

const queryClient = new QueryClient();

const selectedModel = "Phi-3-mini-4k-instruct-q4f16_1-MLC";

const initProgressCallback = (initProgress) => {
  console.log(initProgress);
};

const webLlmEngine = await CreateWebWorkerMLCEngine(
  new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  }),
  selectedModel,
  { initProgressCallback },
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main webLlmEngine={webLlmEngine} />
    </QueryClientProvider>
  );
}
