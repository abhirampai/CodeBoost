import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import Authenticator from "openai-authenticator";

const authenticator = new Authenticator();

const api = new ChatGPTUnofficialProxyAPI({
  accessToken: authenticator.login(
    process.env.REACT_APP_CHATGPT_EMAIL,
    process.env.REACT_APP_CHATGPT_PASSWORD
  ),
  apiReverseProxyUrl: "https://bypass.churchless.tech/api/conversation",
});

const createCompletion = (payload) => api.send(payload);

export default { createCompletion };
