const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex space-x-3">
        <span className="w-4 h-4 bg-[#00B207] rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-[#00B207] rounded-full animate-bounce [animation-delay:-0.2s]"></span>
        <span className="w-4 h-4 bg-[#00B207] rounded-full animate-bounce [animation-delay:-0.4s]"></span>
      </div>
    </div>
  );
};

export default Spinner;
