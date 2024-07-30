import { Modal, Spin } from "antd";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useContext } from "react";
import { AppState } from "../../Hooks/utils";

const ChatGptModal = ({
  text,
  setValue,
  getSelectedValue,
  isLoading,
  setChatGptOutput,
}) => {
  const { showWebLlmModal } = useContext(AppState);
  const extractCodeFromBlock = (blockString) =>
    [...blockString.matchAll(/```(?:[a-z]+)?\n([\s\S]+?)\n```/g)].map(
      (match) => match[1],
    );

  const pasteCode = () => {
    const selectedValue = getSelectedValue();
    const code = extractCodeFromBlock(text);

    setValue((prevValue) => prevValue.replace(selectedValue, code));
    setChatGptOutput("");
    showWebLlmModal.value = false;
  };

  const handleCancel = () => {
    setChatGptOutput("");
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
      key="pasteCode"
      className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-blue-700 text-white rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-blue-500 focus:outline-none focus:shadow-outline"
      onClick={pasteCode}
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
          source={text}
          style={{ padding: 10 }}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      )}
    </Modal>
  );
};
export default ChatGptModal;
