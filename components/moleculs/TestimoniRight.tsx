"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { cardTestimonialsData } from "../../data/cardTestimonials";

export default function Testimoni() {
  const testimonials = cardTestimonialsData.map((item) => ({
    quote: item.description,
    name: item.name,
    title: item.year,
  }));
  return (
    <div className=" flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
