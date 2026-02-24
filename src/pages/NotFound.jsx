import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center animate-in">
      <div className="relative">
        <h1 className="text-[12rem] font-black text-gray-100 dark:text-[#2c1810] leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-black text-[#2c1810] dark:text-[#f0e9e2]">
            Lost in the beans?
          </p>
          <div className="mt-2 w-16 h-1 bg-[#8B5E3C] rounded-full"></div>
        </div>
      </div>

      <p className="mt-8 text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get you back to the sanctuary of fresh coffee.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-10 px-8 py-3 bg-[#8B5E3C] text-white rounded-full font-bold hover:bg-[#7a5234] transition shadow-xl hover:-translate-y-1 active:translate-y-0"
      >
        Return to Home
      </button>

      <div className="mt-12 flex gap-4 text-[#8B5E3C] opacity-50">
        <span>☕</span>
        <span>☕</span>
        <span>☕</span>
      </div>
    </div>
  );
}

export default NotFound;