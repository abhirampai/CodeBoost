const Card = ({ modelName, modelDescription, handleModelSelect }) => {
  return (
    <div className="mt-2 w-full container space-y-12">
      <div className="relative p-2 md:p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-semibold ">{modelName}</h3>
          <p className="mt-6 ">More about the models</p>
          <p className="mt-3 font-semibold">{modelDescription}</p>
        </div>
        <button
          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
          onClick={handleModelSelect}
        >
          Select Model
        </button>
      </div>
    </div>
  );
};

export default Card;
