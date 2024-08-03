import { useContext } from "react";

import { Modal, Spin } from "antd";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useSignals } from "@preact/signals-react/runtime";

import { AppState } from "../../Hooks/utils";
import UserPrompt from "../UserPrompt";

const RefactorModal = ({
  setValue,
  getSelectedValue,
  isLoading,
  regenerateResponse,
}) => {
  useSignals();
  const { showWebLlmModal, engineOutput } = useContext(AppState);

  const extractCodeFromBlock = (blockString) =>
    [...blockString.matchAll(/```(?:[a-z]+)?\n([\s\S]+?)\n```/g)].map(
      (match) => match[1],
    );

  const pasteCode = () => {
    const selectedValue = getSelectedValue();
    const code = extractCodeFromBlock(engineOutput.value);

    setValue((prevValue) => prevValue.replace(selectedValue, code));
    engineOutput.value = "";
    showWebLlmModal.value = false;
  };

  const handleCancel = () => {
    engineOutput.value = "";
    showWebLlmModal.value = false;
  };

  const Footer = [
    <UserPrompt
      key="userprompt"
      pasteCode={pasteCode}
      regenerateResponse={regenerateResponse}
    />,
  ];

  return (
    <Modal
      title="WebLLM Phi-3 refactored code"
      open={showWebLlmModal.value}
      footer={!isLoading ? Footer : null}
      width={1000}
      styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 350px)" } }}
      onCancel={handleCancel}
    >
      {isLoading ? (
        <div className="flex w-full h-full justify-center">
          <Spin />
        </div>
      ) : (
        <MDEditor.Markdown
          source={engineOutput.value}
          style={{ padding: 10 }}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      )}
    </Modal>
  );
};
export default RefactorModal;
