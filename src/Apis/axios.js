import axios from "axios";

const axiosOptions = {
  baseURL: "https://judge0-ce.p.rapidapi.com/",
  params: { base64_encoded: "true", fields: "*" },
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_ACCESS_TOKEN}`,
    "X-RapidAPI-Key": process.env.REACT_APP_JUDGE0_KEY,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  },
};

export default axios.create(axiosOptions);
