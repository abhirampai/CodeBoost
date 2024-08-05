import { useContext, useEffect } from "react";

import { FloatButton, Modal, Spin } from "antd";
import { useSignals } from "@preact/signals-react/runtime";

import { AppState } from "../../Hooks/utils";
import ChatNode from "../ChatNode";
import UserPrompt from "../UserPrompt";
import { scrollModalBody } from "../utils";

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

  useEffect(() => {
    setTimeout(() => scrollModalBody(), 100);
  }, []);

  return (
    <Modal
      title="Refactor chat"
      open={showWebLlmModal.value}
      footer={!isLoading ? Footer : null}
      width={1000}
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 350px)",
          minHeight: "50px",
          backgroundColor: "rgb(229 231 235)",
          borderRadius: "0.75rem",
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      }}
      onCancel={handleCancel}
    >
      <FloatButton.BackTop
        target={() => document.querySelector(".ant-modal-body")}
        visibilityHeight={10}
        tooltip="Scroll to top of the chat"
      />
      {isLoading ? (
        <div className="flex w-full h-12 justify-center items-center">
          <Spin />
        </div>
      ) : (
        engineOutput.map((message) => (
          <ChatNode
            key={`message-${message.initiator}-v${Math.random()}`}
            message={message}
          />
        ))
      )}
    </Modal>
  );
};
export default RefactorModal;
