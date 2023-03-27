import { useEffect, useState } from "react";

import { assoc } from "ramda";

import {
  useCreateSubmissionsApi,
  useGetSubmissionsApi
} from "../Hooks/useSubmissionsApi";
import CodeEditor from "./CodeEditor";
import CustomInput from "./CustomInput";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "./LanguageSelector/constants";
import OutputTerminal from "./OutputTerminal";
import { decodeString, encodeString } from "./utils";
import { OUTPUT_STATUES, DEFAULT_OUTPUT_VALUE } from "./contants";
import CustomInputHeader from "./CustomInput/Header";
import OutputTerminalHeader from "./OutputTerminal/Header";
import { useCreateCompletionApi } from "../Hooks/useRefactorApi";

const Main = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);
  const [value, setValue] = useState(selectedLanguage?.stub);
  const [input, setInput] = useState();
  const [output, setOutput] = useState(DEFAULT_OUTPUT_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: runCode } = useCreateSubmissionsApi();
  const { mutateAsync: getOutput } = useGetSubmissionsApi();
  const { mutateAsync: getRefactoredCode } = useCreateCompletionApi();

  useEffect(() => {
    setValue(selectedLanguage?.stub);
  }, [selectedLanguage]);

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
        stdin: encodeString(input || "")
      });

      const { data: outputData } = await getOutput(submissionData?.token);

      if (outputData.status_id === 3) {
        setOutput(
          assoc("data", decodeString(outputData.stdout) || "Empty Ouput")
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

  const refactorCode = async () => {
    try {
      setIsLoading(true);

      const { data: chatGptOutput } = await getRefactoredCode({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Refactor code ${value}` }]
      });

      const refactoredCode = chatGptOutput.choices[0].message.content;
      setValue(refactoredCode);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearOutput = () => {
    setOutput(DEFAULT_OUTPUT_VALUE);
  };

  return (
    <div className="flex flex-col w-full">
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <div className="editor-height mt-5">
        <CodeEditor
          selectedLanguage={selectedLanguage?.title.toLowerCase()}
          value={value}
          onChange={setValue}
          editable={!isLoading}
          runCode={runEditorCode}
        />
      </div>
      <div className="flex mt-5 justify-end">
        <input
          value="Run Code"
          type="button"
          onClick={runEditorCode}
          disabled={isLoading}
        />
        <input
          value="Refactor Code"
          type="button"
          className="ml-2"
          onClick={refactorCode}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col mt-5">
        <CustomInputHeader clearInput={clearInput} />
        <CustomInput input={input} setInput={handleCustomInputChange} />
      </div>
      {output.data && (
        <>
          <div className="flex flex-col mt-5">
            <OutputTerminalHeader
              status={output?.status}
              clearOutput={clearOutput}
            />
            <OutputTerminal output={output?.data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
