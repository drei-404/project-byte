"use client";

import { ArrowRight } from "lucide-react";
import { HoverEffect } from "../../ui/card-hover-effect";

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
];

export default function LatestNews() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-[96rem] flex-col items-center justify-center gap-4 px-8 py-20">
        <div className="flex flex-col gap-4 items-center mb-6">
          <h1 className="text-6xl font-extrabold text-[#154091] text-shadow-lg">
            Latest <span className="text-[#edd153]">News</span>
          </h1>
          <div>
            Stay updated with the latest announcements, activities, and
            developments from the BYTE community.
          </div>
        </div>

        <button className="group inline-flex items-center gap-2 rounded-xl border border-[#071633]/20 bg-background px-6 py-3 font-medium text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#071633]/40 dark:border-foreground">
          Read More News
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        {/* -------------- Cards Section -------------- */}
        <HoverEffect items={news} />
        {/* -------------- End of Cards Section -------------- */}
      </div>
    </>
  );
}
