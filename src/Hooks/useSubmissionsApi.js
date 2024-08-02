import runCode from "../Apis/runCode";
import { useMutation } from "react-query";

const useCreateSubmissionsApi = () => {
  return useMutation((payload) => runCode.createSubmission(payload));
};

const useGetSubmissionsApi = () => {
  return useMutation((token) => runCode.getSubmission(token));
};

export { useCreateSubmissionsApi, useGetSubmissionsApi };
