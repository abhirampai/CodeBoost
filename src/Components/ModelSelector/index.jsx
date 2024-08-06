import { Modal } from "antd";
import { useContext } from "react";

import {
  AppState,
  initializeGoogleGeminiEngine,
  initializeWebLlmEngine,
} from "../../Hooks/utils";
import Card from "./Card";

const ModelSelector = () => {
  const {
    aiEngine,
    showModalSelection,
    startProgress,
    endProgress,
    isLoading,
    selectedModelInLocalStorage,
  } = useContext(AppState);

  const handleCancel = () => {
    selectedModelInLocalStorage.value = "phi-3";
    showModalSelection.value = false;
    aiEngine.value = initializeWebLlmEngine(
      startProgress,
      endProgress,
      isLoading,
    );
  };

  return (
    <Modal
      title="Available models"
      open={showModalSelection.value}
      width={1000}
      footer={[]}
      onCancel={handleCancel}
    >
      <div className="flex w-full justify-between gap-x-2">
        <Card
          modelName="Phi-3"
          modelDescription="Provided by webLlm, it stores the model in your browser indexDb. No data is stored or shared."
          handleModelSelect={() => {
            showModalSelection.value = false;
            selectedModelInLocalStorage.value = "phi-3";
            localStorage.setItem("selectedModel", "phi-3");
            aiEngine.value = initializeWebLlmEngine(
              startProgress,
              endProgress,
              isLoading,
            );
          }}
        />
        <Card
          modelName="Google Gemini"
          modelDescription="Provided by google, do not share sensitive info since google might use the prompts to improve the gemini model."
          handleModelSelect={() => {
            showModalSelection.value = false;
            selectedModelInLocalStorage.value = "googleGemini";
            localStorage.setItem("selectedModel", "googleGemini");
            aiEngine.value = initializeGoogleGeminiEngine();
          }}
        />
      </div>
    </Modal>
  );
};

export default ModelSelector;
