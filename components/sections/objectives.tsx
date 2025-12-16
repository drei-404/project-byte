import { Cpu } from "lucide-react";
import React from "react";

export default function Objectives() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-screen flex-col items-center justify-center bg-transparent gap-4 px-8 pb-20 border">
        <h1 className="text-6xl font-extrabold text-[#154091] text-shadow-lg">
          Our Objectives
        </h1>
        <div className="border relative flex flex-row gap-8 p-8 w-screen">


          <div className="flex-1 border">
            <div className="border w-fit p-2 rounded-4xl bg-background">
              <Cpu />
            </div>
            <div className="bg-background border">
              <p className=""></p>
            </div>
          </div>


          <div className="flex-1 bg-background border"></div>
          <div className="flex-1 bg-background border"></div>
          <div className="flex-1 bg-background border"></div>
        </div>
      </div>
    </>
  );
}
