export const encodeString = (str) =>
  window.btoa(unescape(encodeURIComponent(str)));

export const decodeString = (str) =>
  decodeURIComponent(escape(window.atob(str)));

export const webLlmEngineInput = (userPrompt) => ({
  messages: [
    {
      role: "system",
      content: `You are a chatbot that can refactor any code.
        Always return the code block in markdown style with comments about the refactored code.
        Always suggest the output in the requested language itself with a single code block.`,
    },
    { role: "user", content: userPrompt },
  ],
  temperature: 0.5,
  stream: true, // <-- Enable streaming
});

export const generateUserPrompt = (userPrompt, code) =>
  userPrompt.replace("{source_code}", code);

export const scrollModalBody = () => {
  const modalRef = document.querySelector(".ant-modal-body");
  if (modalRef) modalRef.scrollTop = modalRef.scrollHeight;
};