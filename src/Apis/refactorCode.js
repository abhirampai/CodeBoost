import axios from "./axios";

const createCompletion = (payload) =>
  axios.post("https://api.openai.com/v1/chat/completions", payload);

export default { createCompletion };
