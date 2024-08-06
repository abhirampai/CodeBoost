import { Flex, Radio } from "antd";
import { useContext } from "react";

import {
  AppState,
  initializeGoogleGeminiEngine,
  initializeWebLlmEngine,
} from "../../Hooks/utils";

const ModelSelector = () => {
  const {
    aiEngine,
    selectedModelInLocalStorage,
    startProgress,
    endProgress,
    isLoading,
  } = useContext(AppState);
  const handleModelChange = (e) => {
    if (e.target.value === "googleGemini") {
      selectedModelInLocalStorage.value = "googleGemini";
      localStorage.setItem("selectedModel", "googleGemini");
      aiEngine.value = initializeGoogleGeminiEngine();
    } else {
      startProgress.value = 0;
      endProgress.value = 100;
      selectedModelInLocalStorage.value = "phi-3";
      localStorage.setItem("selectedModel", "phi-3");
      aiEngine.value = initializeWebLlmEngine(
        startProgress,
        endProgress,
        isLoading,
      );
    }
  };
  return (
    <Flex vertical gap="middle">
      <Radio.Group
        onChange={handleModelChange}
        defaultValue={selectedModelInLocalStorage.value}
      >
        <Radio.Button value="googleGemini">Google Gemini</Radio.Button>
        <Radio.Button value="phi-3">Phi-3</Radio.Button>
      </Radio.Group>
    </Flex>
  );
};

export default ModelSelector;
