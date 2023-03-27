const CustomInputHeader = ({ clearInput }) => {
  return (
    <div className="flex justify-between items-center">
      <label className="mb-2">Custom Input</label>
      <input type="button" value="Clear Input" onClick={clearInput} />
    </div>
  );
};

export default CustomInputHeader;
