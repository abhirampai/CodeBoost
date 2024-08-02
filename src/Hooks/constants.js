import { prebuiltAppConfig } from "@mlc-ai/web-llm";

const SELECTED_MODEL = "Phi-3-mini-4k-instruct-q4f16_1-MLC";

const WEBLLM_CONFIG = { ...prebuiltAppConfig, useIndexedDBCache: true };

export { SELECTED_MODEL, WEBLLM_CONFIG };
