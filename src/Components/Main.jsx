import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { assoc } from "ramda";

import {
  useCreateSubmissionsApi,
  useGetSubmissionsApi,
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
import Header from "./Header";
import CodeActions from "./CodeActions";
import ChatGptModal from "./ChatGptModal";

const Main = () => {
  const outputRef = useRef(null);
  const editorRef = useRef(null);

  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);
  const [value, setValue] = useState(selectedLanguage?.stub);
  const [input, setInput] = useState();
  const [output, setOutput] = useState(DEFAULT_OUTPUT_VALUE);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chatGptOutput, setChatGptOutput] = useState("");

  const { mutateAsync: runCode } = useCreateSubmissionsApi();
  const { mutateAsync: getOutput } = useGetSubmissionsApi();
  const { mutateAsync: getRefactoredCode } = useCreateCompletionApi();

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
      setShowModal(true);
      setIsLoading(true);
      const selectedValue = getSelectedRangeOfValue();

      const { data: chatGptOutput } = await getRefactoredCode({
        model: "text-davinci-002-render-sha",
        messages: [
          {
            id: uuidv4(),
            role: "user",
            content: {
              content_type: "text",
              parts: [`Refactor code snippet: ${selectedValue}`],
            },
          },
        ],
      });

      const refactoredCode = chatGptOutput.choices[0].message.content;
      setChatGptOutput(refactoredCode);
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
    <>
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
      <ChatGptModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={chatGptOutput}
        setValue={setValue}
        getSelectedValue={getSelectedRangeOfValue}
        isLoading={isLoading}
      />
    </>
  );
};

export default Main;
