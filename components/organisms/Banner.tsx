"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const banners = [
  "/images/banner1.png",
  "/images/banner2.jpg",
  "/images/banner3.png",
];

const extendedBanners = [banners[banners.length - 1], ...banners, banners[0]];

export default function Banner() {
  const [current, setCurrent] = useState(1); // start at first real slide
  const [transition, setTransition] = useState(true);
  const total = banners.length;
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    setTransition(true);
    setCurrent(idx);
  };

  const next = () => {
    if (!transition) return;
    goTo(current + 1);
  };
  const prev = () => {
    if (!transition) return;
    goTo(current - 1);
  };

  // Handle infinite loop effect
  const handleTransitionEnd = () => {
    if (current === 0) {
      setTransition(false);
      setCurrent(total);
    } else if (current === total + 1) {
      setTransition(false);
      setCurrent(1);
    }
  };

  // Enable transition after jump
  React.useEffect(() => {
    if (!transition) {
      // force reflow to re-enable transition
      const track = trackRef.current;
      if (track) {
        void track.offsetHeight;
      }
      setTransition(true);
    }
  }, [transition]);

  return (
    <section className="w-full flex items-center justify-center relative group">
      {/* Left Arrow (di luar container) */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[60%] bg-white shadow-lg rounded-full w-[30px] h-[30px] flex items-center justify-center text-lg text-black transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 z-30 border border-gray-200"
        style={{ boxShadow: "0 4px 24px 0 #0001" }}
        aria-label="Previous Banner"
      >
        <FaChevronLeft />
      </button>
      {/* Banner Container */}
      <div className="relative w-full aspect-[4/1] max-h-[260px] rounded-2xl overflow-hidden shadow-lg">
        {/* Slide Track */}
        <div
          ref={trackRef}
          className={`absolute inset-0 w-full h-full flex ${
            transition ? "transition-transform duration-500 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedBanners.map((src, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <Image
                src={src}
                alt={`Banner ${idx}`}
                fill
                sizes="100vw"
                quality={100}
                unoptimized
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority={idx === current}
              />
            </div>
          ))}
        </div>
        {/* Indicators */}
        <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex gap-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
          {banners.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                idx === (current - 1 + total) % total
                  ? "bg-tosca scale-110"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Right Arrow (di luar container) */}
      <button
        onClick={next}
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[60%] bg-white shadow-lg rounded-full w-[30px] h-[30px] flex items-center justify-center text-lg text-black transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 z-30 border border-gray-200"
        style={{ boxShadow: "0 4px 24px 0 #0001" }}
        aria-label="Next Banner"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
