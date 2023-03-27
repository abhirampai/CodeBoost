const CustomInput = ({ input, setInput }) => {
  return (
    <textarea
      value={input}
      onChange={setInput}
      className="block px-1 w-full text-sm bg-gray-800 text-white border focus:ring-0 border-gray-400 mt-2"
      rows={5}
    />
  );
};

export default CustomInput;
