import { useContext, useEffect, useRef, useState } from "react";

import { assoc } from "ramda";

import {
  DEFAULT_OUTPUT_VALUE,
  DEFAULT_USER_PROMPT,
  OUTPUT_STATUES,
} from "./contants";
import {
  decodeString,
  encodeString,
  generateUserPrompt,
  scrollModalBody,
  webLlmEngineInput,
} from "./utils";
import {
  useCreateSubmissionsApi,
  useGetSubmissionsApi,
} from "../Hooks/useSubmissionsApi";
import { AppState } from "../Hooks/utils";
import { LANGUAGE_OPTIONS } from "./LanguageSelector/constants";

import CodeActions from "./CodeActions";
import CodeEditor from "./CodeEditor";
import CustomInput from "./CustomInput";
import CustomInputHeader from "./CustomInput/Header";
import Header from "./Header";
import LanguageSelector from "./LanguageSelector";
import OutputTerminal from "./OutputTerminal";
import OutputTerminalHeader from "./OutputTerminal/Header";
import RefactorModal from "./RefactorModal";
import UnsupportedBrowserCallout from "./UnsupportedBrowserCallout";
import { message } from "antd";

const Main = () => {
  const outputRef = useRef(null);
  const editorRef = useRef(null);

  const {
    showWebLlmModal,
    engineOutput,
    engineStreamLoading,
    userPrompt,
    responseGenerationInterrupted,
    isGeminiEngine,
    userPromptInterval,
    aiEngine,
  } = useContext(AppState);

  const [messageApi, contextHolder] = message.useMessage();

  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);
  const [value, setValue] = useState(selectedLanguage?.stub);
  const [input, setInput] = useState();
  const [output, setOutput] = useState(DEFAULT_OUTPUT_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: runCode } = useCreateSubmissionsApi();
  const { mutateAsync: getOutput } = useGetSubmissionsApi();

  useEffect(() => {
    setValue(selectedLanguage?.stub);
  }, [selectedLanguage]);

  useEffect(() => {
    if (output?.data) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  const clearInput = () => {
    setInput("");
  };

  const handleCustomInputChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const runEditorCode = async () => {
    try {
      setIsLoading(true);
      clearOutput();

      const { data: submissionData } = await runCode({
        source_code: encodeString(value),
        language_id: selectedLanguage.value,
        stdin: encodeString(input || ""),
      });

      const { data: outputData } = await getOutput(submissionData?.token);

      if (outputData.status_id === 3) {
        setOutput(
          assoc("data", decodeString(outputData.stdout) || "Empty Output"),
        );
      } else {
        setOutput(assoc("data", decodeString(outputData.stderr)));
      }
      setOutput(assoc("status", OUTPUT_STATUES[outputData.status_id]));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedRangeOfValue = () => {
    const cursorSelection = editorRef.current.view.state.selection.main;
    const startRange = cursorSelection.from;
    const endRange = cursorSelection.to;
    return startRange !== endRange
      ? value.substring(startRange, endRange)
      : value;
  };

  const validateUserPrompt = () => {
    if (!userPrompt.value.match("{source_code}")) {
      messageApi.error(
        "User prompt does not contain {source_code} string hence falling back to default user prompt",
      );
      userPrompt.value = DEFAULT_USER_PROMPT;
    }
  };

  const refactorCode = async () => {
    try {
      validateUserPrompt();

      const selectedValue = getSelectedRangeOfValue();
      if (!selectedValue && selectedValue === "") return;

      engineOutput.push({ initiator: "user", message: userPrompt.value });
      responseGenerationInterrupted.value = false;
      showWebLlmModal.value = true;
      engineStreamLoading.value = true;

      if (isGeminiEngine.value) return geminiFlow(selectedValue);
      const engine = await aiEngine.value;

      engine.interruptGenerate();
      const webLlmOutput = await engine.chat.completions.create(
        webLlmEngineInput(generateUserPrompt(userPrompt.value, selectedValue)),
      );

      engineOutput.push({ initiator: "system", message: "", modelName: "Phi-3" });
      for await (const chunk of webLlmOutput) {
        const reply = chunk.choices[0]?.delta.content || "";
        engineOutput[engineOutput.length - 1].message += reply;
        scrollModalBody();
      }
      engineStreamLoading.value = false;
    } catch (err) {
      console.log(err);
    }
  };

  const geminiFlow = async (selectedValue) => {
    const prompt = `You are a chatbot that can refactor any code.
        Always return the code block in markdown style with comments about the refactored code.
        Always suggest the output in the requested language itself with a single code block.\n ${generateUserPrompt(userPrompt.value, selectedValue)}`;
    const result = await aiEngine.value.generateContentStream(prompt);

    engineOutput.push({ initiator: "system", message: "", modelName: "Gemini" });
    userPromptInterval.val = setInterval(async () => {
      for await (const chunk of result.stream) {
        const chunkText = chunk.text() || "";
        engineOutput[engineOutput.length - 1].message += chunkText;
        scrollModalBody();
      }
    });
    engineStreamLoading.value = false;
  };

  const clearOutput = () => {
    setOutput(DEFAULT_OUTPUT_VALUE);
  };

  return (
    <>
      {contextHolder}
      <UnsupportedBrowserCallout />
      <div className="flex flex-col p-4">
        <Header />
        <div className="md:flex md:w-full mt-4 justify-between items-center">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <CodeActions
            refactorCode={refactorCode}
            runEditorCode={runEditorCode}
            isLoading={isLoading}
          />
        </div>
        <div className="editor-height mt-5">
          <CodeEditor
            editorRef={editorRef}
            selectedLanguage={selectedLanguage?.title.toLowerCase()}
            value={value}
            onChange={setValue}
            editable={!isLoading}
            runCode={runEditorCode}
          />
        </div>
        <div className="flex flex-col mt-5">
          <CustomInputHeader clearInput={clearInput} />
          <CustomInput input={input} setInput={handleCustomInputChange} />
        </div>
        {output.data && (
          <>
            <div className="flex flex-col py-4">
              <OutputTerminalHeader
                status={output?.status}
                clearOutput={clearOutput}
              />
              <OutputTerminal output={output?.data} outputRef={outputRef} />
            </div>
          </>
        )}
      </div>
      <RefactorModal
        setValue={setValue}
        getSelectedValue={getSelectedRangeOfValue}
        isLoading={isLoading}
        regenerateResponse={refactorCode}
      />
    </>
  );
};

export default Main;
