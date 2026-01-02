"use client";

import { Blocks, CircleCheck, Cpu, GlobeLock, PackageCheck, Server, Square } from "lucide-react";

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



          {/* ------------ Objectives Section ------------ */}
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
          {/* ------------ End of Objectives Section ------------ */}




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
