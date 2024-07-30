import { Flex, Progress, Spin } from "antd";
import { useContext } from "react";
import { AppState } from "../../Hooks/utils";

const CodeActions = ({ runEditorCode, refactorCode, isLoading }) => {
  const { modelLoading, percent } = useContext(AppState);

  return (
    <div className="flex md:space-x-2 w-full md:w-1/2 justify-between md:justify-end">
      <button
        className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        onClick={runEditorCode}
        disabled={isLoading}
      >
        Run Code
      </button>
      <button
        className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        onClick={refactorCode}
        disabled={isLoading || modelLoading.value}
      >
        <div className="flex gap-x-2 items-center">
          Refactor Code
          {modelLoading.value && (
            <Progress
              showInfo
              percent={percent.value}
              type="circle"
              size={14}
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default CodeActions;
