import { computed, signal } from "@preact/signals-react";
import { createContext } from "react";
import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

const selectedModel = "Phi-3-mini-4k-instruct-q4f16_1-MLC";

const updateLabel = (className, text) => {
  const loadingLabel = document.querySelector(`.${className}`);
  if (loadingLabel) {
    loadingLabel.innerText = text;
  }
};

const initProgressCallback = (initProgress, isLoading) => {
  const progress = initProgress.text.match(/(\d+\/\d+)/g);
  if (progress) {
    const [start, end] = progress[0]?.split("/");
    updateLabel(
      "ant-spin-text",
      `Model loaded: ${Math.floor((start / end) * 100)}%`,
    );
  } else if (initProgress.progress) {
    isLoading.value = false;
  }
};

export const createAppState = () => {
  const isLoading = signal(true);
  const modelLoading = computed(() => isLoading.value);
  const webLlmEngine = CreateWebWorkerMLCEngine(
    new Worker(new URL("../worker.js", import.meta.url), {
      type: "module",
    }),
    selectedModel,
    {
      initProgressCallback: (progress) =>
        initProgressCallback(progress, isLoading),
    },
  );

  return { modelLoading, webLlmEngine };
};

export const AppState = createContext();
