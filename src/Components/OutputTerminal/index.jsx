const OutputTerminal = ({ output, outputRef }) => {
  return (
    <div
      ref={outputRef}
      className="block px-1 w-full h-36 text-sm bg-gray-800 text-white border focus:ring-0 border-gray-400 mt-2"
    >
      {output}
    </div>
  );
};

export default OutputTerminal;
