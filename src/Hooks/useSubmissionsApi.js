import { useMutation } from "react-query";
import runCode from "../Apis/runCode";

const useCreateSubmissionsApi = () => {
  return useMutation((payload) => runCode.createSubmission(payload));
};

const useGetSubmissionsApi = () => {
  return useMutation((token) => runCode.getSubmission(token));
};

export { useCreateSubmissionsApi, useGetSubmissionsApi };
