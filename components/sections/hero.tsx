"use client"

import { GridBackground } from "../grid-background";

export default function Hero() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-[96rem] flex-row items-center justify-center bg-background gap-10 px-8 py-20 ">
        <div className="flex-1">
        <h1 className="text-6xl font-extrabold text-[#154091] text-shadow-lg">Building Youth Through Technology Empowerment <span className="text-[#edd153]">Project</span></h1>
        <p className="my-4 text-lg">is a multi-sectoral collaboration that seeks to empower the youth through technology training. The partnership includes government and non-government organizations in Cebu that are at the forefront of technology development and community building. The training center is located at DOST7 Complex, Sudlon, Lahug, Cebu City.</p>
        </div>

        <div className="flex-1 rounded-4xl overflow-hidden">
          <GridBackground />
        </div>
      </div>
    </>
  );
}