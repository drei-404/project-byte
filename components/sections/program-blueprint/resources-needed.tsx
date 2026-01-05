"use client";

import { PackageCheck, Square } from "lucide-react";

const resources = [
  {
    context: "Computers, laptops, and peripherals",
  },
  {
    context: "Funding for internet connectivity for the center and for the trainees.",
  },
  {
    context: "Funding for utilities for the training center.",
  },
  {
    context: "Funding support for allowance of each OSY scholar including food, fare, uniforms, and training supplies.",
  },
  {
    context: "Funding support for the operation of the center including the personnel and trainers.",
  },
  {
    context: "More partners and stakeholders.",
  },
];

export default function ResourcesNeeded() {
  return (
    <>
      <div className="flex flex-col flex-1 w-auto p-8 bg-[#fafbfb] rounded-3xl border dark:bg-accent/50">
        <div className="flex gap-2 mb-4">
          <PackageCheck className="h-6 w-6 mt-1.5 shrink-0 text-foreground border border-foreground/20 rounded-full p-1" />
          <h1 className="text-2xl font-medium text-[#154091]">
            Resources Needed
          </h1>
        </div>

        <ul className="space-y-4">
          {resources.map((item, index) => {
            return (
              <div key={index} className="flex-1">
                <div className="ml-6 ">
                  <li className="flex items-start gap-3 text-lg leading-relaxed text-justify">
                    <Square className="h-4 w-4 mt-2 shrink-0 " />
                    {item.context}
                  </li>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
