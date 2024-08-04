import {
  CreateWebWorkerMLCEngine,
  deleteModelAllInfoInCache,
} from "@mlc-ai/web-llm";
import { SELECTED_MODEL, WEBLLM_CONFIG } from "./constants";
import { computed, signal } from "@preact/signals-react";
import { createContext } from "react";
import { observable } from "preact-observables";

const initProgressCallback = (initProgress, start, end, isLoading) => {
  const progress = initProgress.text.match(/(\d+)\/\d+/);
  if (progress) {
    const [startValue, endValue] = progress[0].split("/").map(Number);
    start.value = startValue;
    end.value = endValue;
  } else if (initProgress.progress) {
    isLoading.value = false;
  }
};

const createWebWorker = async (startProgress, endProgress, isLoading) => {
  try {
    deleteAllModelInfoInCache();
    return await CreateWebWorkerMLCEngine(
      new Worker(new URL("../worker.js", import.meta.url), {
        type: "module",
      }),
      SELECTED_MODEL,
      {
        initProgressCallback: (progress) =>
          initProgressCallback(progress, startProgress, endProgress, isLoading),
        appConfig: WEBLLM_CONFIG,
      },
    );
  } catch (e) {
    console.log(e);
  }
};

const deleteAllModelInfoInCache = async () => {
  await deleteModelAllInfoInCache(SELECTED_MODEL);
};

export const createAppState = () => {
  const startProgress = signal(0);
  const endProgress = signal(100);
  const isLoading = signal(true);
  const showWebLlmModal = signal(false);
  const engineOutput = observable([]);
  const engineStreamLoading = signal(false);
  const isUnsupportedBrowser = signal(!navigator.gpu);
  const userPrompt = signal("Refactor code snippet {source_code}");
  const responseGenerationInterrupted = signal(false);

  const isModelLoading = computed(() => isLoading.value);
  const percent = computed(() =>
    Math.floor((startProgress?.value / endProgress?.value) * 100),
  );
  const isEngineStreamLoading = computed(() => engineStreamLoading.value);

  const webLlmEngine = !isUnsupportedBrowser.value
    ? createWebWorker(startProgress, endProgress, isLoading)
    : null;

  return {
    engineOutput,
    engineStreamLoading,
    isModelLoading,
    isEngineStreamLoading,
    isUnsupportedBrowser,
    percent,
    responseGenerationInterrupted,
    showWebLlmModal,
    userPrompt,
    webLlmEngine,
  };
};

export const AppState = createContext();
