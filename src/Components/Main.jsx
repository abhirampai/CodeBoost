import { useContext, useEffect, useRef, useState } from "react";

import { assoc } from "ramda";

import { DEFAULT_OUTPUT_VALUE, OUTPUT_STATUES } from "./contants";
import { decodeString, encodeString, webLlmEngineInput } from "./utils";
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

const Main = ({ webLlmEngine }) => {
  const outputRef = useRef(null);
  const editorRef = useRef(null);

  const { showWebLlmModal, engineOutput, engineStreamLoading } =
    useContext(AppState);

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

  const refactorCode = async () => {
    try {
      const selectedValue = getSelectedRangeOfValue();
      if (!selectedValue && selectedValue === "") return;

      showWebLlmModal.value = true;
      engineStreamLoading.value = true;
      setIsLoading(true);

      const engine = await webLlmEngine;

      engine.interruptGenerate();
      const webLlmOutput = await engine.chat.completions.create(
        webLlmEngineInput(selectedValue),
      );

      engineOutput.value = "";
      for await (const chunk of webLlmOutput) {
        const reply = chunk.choices[0]?.delta.content || "";
        engineOutput.value += reply;
        setIsLoading(false);
      }
      engineStreamLoading.value = false;
    } catch (err) {
      console.log(err);
    }
  };

  const clearOutput = () => {
    setOutput(DEFAULT_OUTPUT_VALUE);
  };

  return (
    <>
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
