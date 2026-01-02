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
      <div className="flex flex-col flex-1 w-auto p-8">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-4xl font-medium text-[#154091] text-shadow-lg">
            Our Objectives
          </h1>
          <div className="text-sm">
            A set of strategic objectives aimed at strengthening ICT
            competencies, supporting workforce readiness, and enabling
            innovation across public and private sectors.
          </div>
        </div>

        <ul className="space-y-4">
          {objectives.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex-1">
                <div className="">
                  <li className="flex items-start gap-3 text-lg leading-relaxed text-justify">
                    <Icon className="h-6 w-6 mt-1.5 shrink-0 text-foreground border-2 rounded-4xl p-1" />
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
