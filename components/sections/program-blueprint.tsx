"use client";

import { PackageCheck, Square } from "lucide-react";
import Objectives from "./program-blueprint/objectives";


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

export default function ProgramBlueprint() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center gap-4 px-8 py-20 ">
        <div className="flex flex-col gap-4 items-center mb-12">
          <h1 className="text-6xl font-extrabold text-[#154091] text-shadow-lg">
            Program Blueprint
          </h1>
          <div className="text-center max-w-4xl">
            Our roadmap outlining what we aim to achieve and the tools, people,
            and resources needed to make it happen.
          </div>
        </div>

        <div className="relative flex flex-row p-8 gap-8 border rounded-4xl shadow-2xl">
          <Objectives />






          {/* ------------ Resources Section ------------ */}
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
          {/* ------------ End of Resources Section ------------ */}



        </div>
      </div>
    </>
  );
}
