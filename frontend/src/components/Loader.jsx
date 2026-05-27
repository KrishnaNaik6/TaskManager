const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500"
          style={{ animation: "spin-smooth 0.8s linear infinite" }}
        ></div>
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-400"
          style={{ animation: "spin-smooth 1.2s linear infinite reverse" }}
        ></div>
      </div>
      <p className="text-sm text-slate-500 tracking-wide">Loading tasks...</p>
    </div>
  );
};

export default Loader;
