const CustomInputHeader = ({ clearInput }) => {
  return (
    <div className="flex justify-between items-center border-grey-700 border-b-2">
      <h1 className="uppercase p-0">Custom Input</h1>
      <button
        className="border border-gray-200 bg-red-200 text-red-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-300 focus:outline-none focus:shadow-outline"
        onClick={clearInput}
      >
        Clear Input
        </button>
    </div>
  );
};

export default CustomInputHeader;
