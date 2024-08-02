import { Progress, Tooltip } from "antd";
import { useContext } from "react";
import { AppState } from "../../Hooks/utils";

const CodeActions = ({ runEditorCode, refactorCode, isLoading }) => {
  const { isModelLoading, percent, isUnsupportedBrowser } =
    useContext(AppState);

  return (
    <div className="flex md:space-x-2 w-full md:w-1/2 justify-between md:justify-end">
      <button
        className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        onClick={runEditorCode}
        disabled={isLoading}
      >
        Run Code
      </button>
      {!isUnsupportedBrowser.value && (
        <Tooltip
          title={
            isModelLoading.value
              ? `Model is being loaded - ${percent.value}%`
              : ""
          }
          placement="topRight"
        >
          <button
            className="disabled:opacity-75 disabled:cursor-not-allowed border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            onClick={refactorCode}
            disabled={isLoading || isModelLoading.value}
          >
            <div className="flex gap-x-2 items-center">
              Refactor Code
              {isModelLoading.value && (
                <Progress
                  showInfo={false}
                  percent={percent.value}
                  type="circle"
                  size={14}
                />
              )}
            </div>
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default CodeActions;
