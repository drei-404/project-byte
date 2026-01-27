import { Separator } from "@/components/ui/separator";
import React from "react";

export default function page() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-300 flex-col items-center justify-center gap-10 py-12 ">
        <div>
          <h1>Courses</h1>
        </div>
        <div className="grid grid-cols-3 w-full border">
          {/* Left */}
          <div className="col-span-2 flex flex-col px-4">
            <div className="bg-background shadow mb-10 rounded-md course-item w-full border ">
              Lorem
            </div>
          </div>

          {/* Right */}
          <div className="col-span-1 flex flex-col px-4 gap-4">
            <h1>Projects</h1>
            <div className="bg-background shadow mb-10 rounded-md course-item w-full border">
              Lorem
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
