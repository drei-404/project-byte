"use client";

import { HoverEffect } from "../ui/card-hover-effect";

const news = [
  {
    image: "images/placeholder.jpg",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolores vitae. Dolores ipsa totam deserunt modi voluptas possimus labore fuga non praesentium veniam natus itaque quibusdam, minima sequi neque quidem.",
    link: "test.com",
  },
  {
    image: "images/placeholder.jpg",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolores vitae. Dolores ipsa totam deserunt modi voluptas possimus labore fuga non praesentium veniam natus itaque quibusdam, minima sequi neque quidem.",
    link: "test1.com",
  },
  {
    image: "images/placeholder.jpg",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolores vitae. Dolores ipsa totam deserunt modi voluptas possimus labore fuga non praesentium veniam natus itaque quibusdam, minima sequi neque quidem.",
    link: "test2.com",
  },
  {
    image: "images/placeholder.jpg",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolores vitae. Dolores ipsa totam deserunt modi voluptas possimus labore fuga non praesentium veniam natus itaque quibusdam, minima sequi neque quidem.",
    link: "test3.com",
  },
  {
    image: "images/placeholder.jpg",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolores vitae. Dolores ipsa totam deserunt modi voluptas possimus labore fuga non praesentium veniam natus itaque quibusdam, minima sequi neque quidem.",
    link: "test4.com",
  },
  {
    image: "images/placeholder.jpg",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolores vitae. Dolores ipsa totam deserunt modi voluptas possimus labore fuga non praesentium veniam natus itaque quibusdam, minima sequi neque quidem.",
    link: "test5.com",
  },
];

export default function LatestNews() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-screen flex-col items-center justify-center gap-4 px-8 py-20">
        <div className="flex flex-col gap-4 items-center mb-12">
          <h1 className="text-6xl font-extrabold text-[#154091] text-shadow-lg">
            Latest <span className="text-[#edd153]">News</span>
          </h1>
        </div>

        {/* -------------- Cards Section -------------- */}
        <HoverEffect items={news} />
        {/* -------------- End of Cards Section -------------- */}
      </div>
    </>
  );
}
