"use client";

import Objectives from "./objectives";
import ResourcesNeeded from "./resources-needed";

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
          <ResourcesNeeded />
        </div>
      </div>
    </>
  );
}
