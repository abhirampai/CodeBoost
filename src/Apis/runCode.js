import axios from "./axios";

const createSubmission = (payload) => axios.post("submissions", payload);

const getSubmission = (token) => axios.get(`/submissions/${token}`);

const runCode = { createSubmission, getSubmission };

export default runCode;
