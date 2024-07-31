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

const createWebWorker = (startProgress, endProgress, isLoading) => {
  try {
    return CreateWebWorkerMLCEngine(
      new Worker(new URL("../worker.js", import.meta.url), {
        type: "module",
      }),
      selectedModel,
      {
        initProgressCallback: (progress) =>
          initProgressCallback(progress, startProgress, endProgress, isLoading),
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const createAppState = () => {
  const startProgress = signal(0);
  const endProgress = signal(100);
  const isLoading = signal(true);
  const showWebLlmModal = signal(false);
  const engineOutput = signal("");
  const engineStreamLoading = signal(false);

  const isModelLoading = computed(() => isLoading.value);
  const percent = computed(() =>
    Math.floor((startProgress?.value / endProgress?.value) * 100)
  );
  const isEngineStreamLoading = computed(() => engineStreamLoading.value);

  const webLlmEngine = createWebWorker(startProgress, endProgress, isLoading);

  return {
    percent,
    isModelLoading,
    webLlmEngine,
    showWebLlmModal,
    engineOutput,
    engineStreamLoading,
    isEngineStreamLoading,
  };
};

export const AppState = createContext();
