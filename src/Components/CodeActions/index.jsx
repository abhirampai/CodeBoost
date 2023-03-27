const CodeActions = ({ runEditorCode, refactorCode, isLoading }) => {
  return (
    <div className="flex md:space-x-2 w-full md:w-1/2 justify-between md:justify-end">
      <button
        className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        onClick={runEditorCode}
        disabled={isLoading}
      >
        Run Code
      </button>
      <button
        className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 md:m-2 mt-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
        onClick={refactorCode}
        disabled={isLoading}
      >
        Refactor Code
      </button>
    </div>
  );
};

export default CodeActions;
