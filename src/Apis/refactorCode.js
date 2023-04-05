import axios from "./axios";

const createCompletion = (payload) =>
  axios.post("https://bypass.churchless.tech/api/conversation", payload);

export default { createCompletion };
