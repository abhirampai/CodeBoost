export const encodeString = (str) =>
  window.btoa(unescape(encodeURIComponent(str)));

export const decodeString = (str) =>
  decodeURIComponent(escape(window.atob(str)));

export const webLlmEngineInput = (code) => ({
  messages: [
    {
      role: "system",
      content: `You are a chatbot that can refactor any code.
        Always return the code block in markdown style with comments about the refactored code.
        Always suggest the output in the requested language itself with a single code block.`,
    },
    { role: "user", content: `Refactor code snippet ${code}` },
  ],
  temperature: 0.5,
  stream: true, // <-- Enable streaming
});
