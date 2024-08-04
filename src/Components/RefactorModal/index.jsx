import { useContext } from "react";

import { Modal, Spin } from "antd";
import { useSignals } from "@preact/signals-react/runtime";

import { AppState } from "../../Hooks/utils";
import ChatNode from "../ChatNode";
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
    const code = extractCodeFromBlock(
      engineOutput[engineOutput.length - 1].message,
    );

    setValue((prevValue) => prevValue.replace(selectedValue, code));
    showWebLlmModal.value = false;
  };

  const handleCancel = () => {
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
      title="WebLLM Chat"
      open={showWebLlmModal.value}
      footer={!isLoading ? Footer : null}
      width={1000}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 350px)",
          backgroundColor: "rgb(229 231 235)",
          borderRadius: "0.75rem",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      }}
      onCancel={handleCancel}
    >
      {isLoading ? (
        <div className="flex w-full h-full justify-center">
          <Spin />
        </div>
      ) : (
        engineOutput.map((message) => <ChatNode message={message} />)
      )}
    </Modal>
  );
};
export default RefactorModal;
