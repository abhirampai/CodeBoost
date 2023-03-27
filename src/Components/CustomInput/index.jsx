const CustomInput = ({ input, setInput }) => {
  return <textarea value={input} onChange={setInput} className="mt-2" />;
};

export default CustomInput;
