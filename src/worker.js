import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

const handler = new WebWorkerMLCEngineHandler();
// eslint-disable-next-line no-restricted-globals
self.onmessage = (msg) => {
  handler.onmessage(msg);
};
