import { useContext } from "react";

import { Tooltip, message } from "antd";
import { AppState } from "../../Hooks/utils";

const UserPrompt = ({ pasteCode, regenerateResponse }) => {
  const {
    userPrompt,
    isEngineStreamLoading,
    engineStreamLoading,
    webLlmEngine,
    responseGenerationInterrupted,
  } = useContext(AppState);

  const [messageApi, contextHolder] = message.useMessage();

  const stopEngineResponseGeneration = async () => {
    messageApi.info("Stopping response generation");
    const engine = await webLlmEngine;
    engine.interruptGenerate();
    engineStreamLoading.value = false;
    responseGenerationInterrupted.value = true;
  };

  return (
    <>
      {contextHolder}
      <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
        <textarea
          rows="1"
          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
          value={userPrompt.value}
          onChange={(e) => (userPrompt.value = e.target.value)}
        ></textarea>
        <button className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
          {isEngineStreamLoading.value ? (
            <Tooltip title="Stop generation">
              <div class="w-6 h-6 flex flex-row items-center gap-2 justify-center bg-red-500 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:scale-105">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="text-slate-200 hover:scale-125"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={stopEngineResponseGeneration}
                >
                  <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                </svg>
              </div>
            </Tooltip>
          ) : (
            <Tooltip title="Regenerate response">
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={regenerateResponse}
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </Tooltip>
          )}
        </button>
        {!isEngineStreamLoading.value &&
          !responseGenerationInterrupted.value && (
            <Tooltip title="Paste code">
              <button
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                onClick={pasteCode}
              >
                <svg
                  className="shrink-0 h-6 w-6 transition text-gray-500 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
                </svg>
              </button>
            </Tooltip>
          )}
      </div>
    </>
  );
};

export default UserPrompt;
