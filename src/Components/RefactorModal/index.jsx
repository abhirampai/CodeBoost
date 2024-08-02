import { Modal, Spin } from "antd";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import { AppState } from "../../Hooks/utils";
import { useContext } from "react";
import { useSignals } from "@preact/signals-react/runtime";

const RefactorModal = ({
  setValue,
  getSelectedValue,
  isLoading,
  regenerateResponse,
}) => {
  useSignals();
  const { showWebLlmModal, engineOutput, isEngineStreamLoading } =
    useContext(AppState);

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
    <button
      key="cancel"
      className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
      onClick={handleCancel}
    >
      Cancel
    </button>,
    <button
      key="regenerateResponse"
      className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
      onClick={regenerateResponse}
      disabled={isEngineStreamLoading.value}
    >
      Regenerate Response
    </button>,
    <button
      key="pasteCode"
      className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-blue-700 text-white rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-blue-500 focus:outline-none focus:shadow-outline"
      onClick={pasteCode}
      disabled={isEngineStreamLoading.value}
    >
      Paste Code
    </button>,
  ];

  return (
    <Modal
      title="WebLLM Phi-3 refactored code"
      open={showWebLlmModal.value}
      footer={!isLoading ? Footer : null}
      width={1000}
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
