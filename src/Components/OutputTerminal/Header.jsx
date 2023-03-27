const OutputTerminalHeader = ({ status, clearOutput }) => {
  return (
    <div className="flex justify-between">
      <label className="mb-2">Output ({status})</label>
      <input value="Clear Ouput" type="button" onClick={clearOutput} />
    </div>
  );
};

export default OutputTerminalHeader;
