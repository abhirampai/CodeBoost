import { useMutation } from "react-query";
import refactorCode from "../Apis/refactorCode";

const useCreateCompletionApi = () => {
  return useMutation((payload) => refactorCode.createCompletion(payload));
};

export { useCreateCompletionApi };
