import { runningTextData, RunningTextItem } from "../../data/runningText";
import Image from "next/image";
import React from "react";

export default function RunningText() {
  // Duplikasi array 6x untuk memastikan looping seamless tanpa gap
  const repeat = 6;
  const items = Array(repeat).fill(runningTextData).flat();

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Bar 1: abu-abu, kiri ke kanan */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 z-0"
        style={{ width: "120vw" }}
      >
        <div className="w-full overflow-hidden bg-white py-2 rounded-md flex items-center">
          <div
            className="flex gap-10 animate-infinite-scroll-reverse items-center min-w-max"
            style={{ width: "max-content" }}
          >
            {items.map((item: RunningTextItem, idx: number) => (
              <span
                key={idx}
                className="flex items-center gap-2 text-black font-extrabold text-2xl md:text-3xl"
              >
                <Image
                  src={item.icon}
                  alt="icon"
                  width={32}
                  height={32}
                  className="inline-block"
                />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Bar 2: tosca, kanan ke kiri */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-6 z-10"
        style={{ width: "120vw" }}
      >
        <div className="w-full overflow-hidden bg-tosca py-2 rounded-md flex items-center">
          <div
            className="flex gap-10 animate-infinite-scroll items-center min-w-max"
            style={{ width: "max-content", direction: "ltr" }}
          >
            {items.map((item: RunningTextItem, idx: number) => (
              <span
                key={idx}
                className="flex gap-2 items-center text-white font-extrabold text-2xl md:text-3xl"
              >
                <Image
                  src={item.icon}
                  alt="icon"
                  width={32}
                  height={32}
                  className="inline-block filter invert"
                />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
