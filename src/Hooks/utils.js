import { computed, signal } from "@preact/signals-react";
import { createContext } from "react";
import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

const selectedModel = "Phi-3-mini-4k-instruct-q4f16_1-MLC";

const initProgressCallback = (initProgress, start, end, isLoading) => {
  const progress = initProgress.text.match(/(\d+\/\d+)/g);
  if (progress) {
    const bounds = progress[0]?.split("/");
    start.value = bounds[0];
    end.value = bounds[1];
  } else if (initProgress.progress) {
    isLoading.value = false;
  }
};

export const createAppState = () => {
  const startProgress = signal(0);
  const endProgress = signal(100);
  const isLoading = signal(true);
  const webLlmEngine = CreateWebWorkerMLCEngine(
    new Worker(new URL("../worker.js", import.meta.url), {
      type: "module",
    }),
    selectedModel,
    {
      initProgressCallback: (progress) =>
        initProgressCallback(progress, startProgress, endProgress, isLoading),
    },
  );
  const modelLoading = computed(() => isLoading.value);
  const percent = computed(() =>
    Math.floor((startProgress?.value / endProgress?.value) * 100),
  );

  return { percent, modelLoading, webLlmEngine };
};

export const AppState = createContext();
