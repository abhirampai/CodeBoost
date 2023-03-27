import axios from "./axios";

const createSubmission = (payload) => axios.post("submissions", payload);

const getSubmission = (token) => axios.get(`/submissions/${token}`);

export default { createSubmission, getSubmission };
