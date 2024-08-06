import {
  CreateWebWorkerMLCEngine,
  deleteModelAllInfoInCache,
} from "@mlc-ai/web-llm";
import {
  SELECTED_GEMINI_MODEL,
  SELECTED_MODEL,
  WEBLLM_CONFIG,
} from "./constants";
import { computed, signal } from "@preact/signals-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
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

const getEngineFromLocalStorage = (
  selectedModelInLocalStorage,
  startProgress,
  endProgress,
  isLoading,
) => {
  if (selectedModelInLocalStorage) {
    return selectedModelInLocalStorage === "googleGemini"
      ? initializeGoogleGeminiEngine()
      : initializeWebLlmEngine(startProgress, endProgress, isLoading);
  }
};

export const initializeWebLlmEngine = (
  startProgress,
  endProgress,
  isLoading,
) => {
  isLoading.value = true;
  return createWebWorker(startProgress, endProgress, isLoading);
};

export const initializeGoogleGeminiEngine = () =>
  new GoogleGenerativeAI(
    process.env.REACT_APP_GOOGLE_GEMINI_API_KEY,
  ).getGenerativeModel({ model: SELECTED_GEMINI_MODEL });

export const createAppState = () => {
  const startProgress = signal(0);
  const endProgress = signal(100);
  const showWebLlmModal = signal(false);
  const engineOutput = observable([]);
  const engineStreamLoading = signal(false);
  const isUnsupportedBrowser = signal(!navigator.gpu);
  const isLoading = signal(false);
  const userPrompt = signal("Refactor code snippet {source_code}");
  const responseGenerationInterrupted = signal(false);
  const userPromptInterval = signal(null); // handle interruption for google gemini
  const selectedModelInLocalStorage = signal(
    localStorage.getItem("selectedModel"),
  );
  const showModalSelection = signal(
    !selectedModelInLocalStorage.value && navigator.gpu ? true : false,
  );
  const aiEngine = signal(
    isUnsupportedBrowser.value
      ? new GoogleGenerativeAI(
          process.env.REACT_APP_GOOGLE_GEMINI_API_KEY,
        ).getGenerativeModel({ model: SELECTED_GEMINI_MODEL })
      : getEngineFromLocalStorage(
          selectedModelInLocalStorage.value,
          startProgress,
          endProgress,
          isLoading,
        ),
  );

  const isModelLoading = computed(() => isLoading.value);
  const percent = computed(() =>
    Math.floor((startProgress?.value / endProgress?.value) * 100),
  );
  const isEngineStreamLoading = computed(() => engineStreamLoading.value);

  const isGeminiEngine = computed(
    () =>
      isUnsupportedBrowser.value ||
      selectedModelInLocalStorage.value === "googleGemini",
  );

  return {
    startProgress,
    endProgress,
    isLoading,
    engineOutput,
    engineStreamLoading,
    isModelLoading,
    isEngineStreamLoading,
    isUnsupportedBrowser,
    percent,
    responseGenerationInterrupted,
    showWebLlmModal,
    userPrompt,
    aiEngine,
    isGeminiEngine,
    userPromptInterval,
    showModalSelection,
    selectedModelInLocalStorage,
  };
};

export const AppState = createContext();
