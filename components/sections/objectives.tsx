"use client";

import { Blocks, Cpu, GlobeLock, Server } from "lucide-react";

const objectives = [
  {
    icon: Cpu,
    context:
      "Establish an ICT training center to develop technology skills primarily for Out-of-School Youth (OSY). The skills that will be developed will initially cover Linux and network administration, security, and cloud services setup and configuration.",
  },
  {
    icon: Blocks,
    context:
      "Build a common service facility that will allow OSY trainees to practice and hone their technology skills and work virtually.",
  },
  {
    icon: GlobeLock,
    context:
      "Build an incubation center for ICT skills and competencies tailored for specific needs of private institutions and government organizations.",
  },
  {
    icon: Server,
    context: "Build an innovation and R&D development center.",
  },
];

export default function Objectives() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-screen flex-col items-center justify-center bg-transparent gap-4 px-8 pb-20">
        <h1 className="text-6xl font-extrabold text-[#154091] text-shadow-lg">
          Our Objectives
        </h1>

        <div className="relative flex flex-row gap-8 p-8 w-screen">
          {objectives.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex-1">
                <div className="flex flex-col items-center">
                  <div className="border w-fit p-2 rounded-4xl bg-background z-1 -mb-5 shadow-lg shadow-amber-300 dark:shadow-none">
                    <Icon />
                  </div>
                  <div className="w-full rounded-xl pt-10 pb-8 px-6 bg-background text-justify border">
                    <p>{item.context}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
