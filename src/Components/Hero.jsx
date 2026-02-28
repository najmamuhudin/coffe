import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#faf7f4] dark:bg-[#1a0f0a] overflow-hidden transition-colors duration-300">
      <div className="w-[88%] mx-auto px-6 lg:px-10 pt-14 pb-0 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left content */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-7xl lg:text-8xl font-black text-[#8B5E3C] leading-none tracking-tight">
            COFFEO
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#2c1810] dark:text-[#f0e9e2] mt-3 leading-snug">
            An online coffee store
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
            Straight to your door step. We can't promise you'll we'll brew your coffee.
            Every order is made with love and devotion to support coffee lovers.
          </p>

          {/* CTA + Login */}
          <div className="mt-7 flex items-center gap-4 flex-wrap">
            <button
              onClick={() => {
                const el = document.getElementById('products');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#8B5E3C] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#7a5234] transition shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 duration-200"
            >
              Explore our products →
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-10">
            {[
              { value: "+1000", label: "Guarantee" },
              { value: "+300k", label: "Satisfaction" },
              { value: "+360k", label: "Total order" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-[#2c1810] dark:text-[#f0e9e2]">{stat.value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Coffee cup image */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="relative lg:w-100">
            <img
              src="2174329b8ef1603c1cbc68bd9ef5865a.jpg"
              alt="Premium Coffee"
              className="relative z-10 w-full h-[420px] lg:h-[480px] object-cover rounded-[2.5rem] shadow-2xl"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </div>
      </div>

      {/* Scrolling brand ticker */}
      <div className="mt-10 bg-[#8B5E3C] py-3 overflow-hidden relative">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
          {Array(3).fill(["COFFEO", "COFFEO", "COFFEO", "COFFEO", "COFFEO", "COFFEO", "COFFEO", "COFFEO"]).flat().map((brand, i) => (
            <span key={i} className="text-white/80 dark:text-[#f0e9e2]/80 text-sm font-semibold tracking-[0.2em] uppercase">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;