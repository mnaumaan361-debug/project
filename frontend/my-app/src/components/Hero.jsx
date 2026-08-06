import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="absolute left-[10%] top-[65%] w-[80%] md:w-[50%] ">
      
      {/* Text */}

      {/* Circles */}
      <div className="flex gap-3 mt-6">
        <FaCircle
          onClick={() => setHeroCount(0)}
          className={`${heroCount === 0 ? "fill-orange-400" : "fill-white"} cursor-pointer`}
        />
        <FaCircle
          onClick={() => setHeroCount(1)}
          className={`${heroCount === 1 ? "fill-orange-400" : "fill-white"} cursor-pointer`}
        />
        <FaCircle
          onClick={() => setHeroCount(2)}
          className={`${heroCount === 2 ? "fill-orange-400" : "fill-white"} cursor-pointer`}
        />
        <FaCircle
          onClick={() => setHeroCount(3)}
          className={`${heroCount === 3 ? "fill-orange-400" : "fill-white"} cursor-pointer`}
        />
      </div>

    </div>
  );
}

export default Hero;