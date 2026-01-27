import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProjectCards } from "./partials/project-cards";

export default function page() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-300 flex-col items-center justify-center gap-10 py-12 ">
        <div>
          <h1>Courses</h1>
        </div>
        <div className="grid grid-cols-3 w-full border">
          {/* Left */}
          <div className="col-span-2 flex flex-col px-4 gap-4 ">
            {/* Card */}
            <div className="bg-background p-3 shadow rounded-md border h-fit">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full md:w-5/12">
                    <div className="overflow-hidden cover course rounded-md">
                      <img src="/images/no-image-found.webp" alt="" />
                    </div>
                  </div>
                  {/* Title */}
                  <div className="w-full md:w-7/12">
                    <div className="flex justify-between items-start">
                      Lorem Ipsum Dolor
                    </div>
                    {/* Difficulty */}
                  <div className="text-sm flex items-center mt-2">Beginner</div>
                  {/* Tags */}
                  <div className="inline-block rounded-full text-xs font-semibold l-badge bg-outline-dark me-2">Linux</div>
                  </div>

                </div>
                {/* Context */}
                <div className="text-gray-400 text-sm mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, consectetur distinctio tempora rerum minus ipsa totam dolore eos odit error, cumque quia saepe corrupti, ad ea. Commodi ipsam molestiae cum!</div>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-1 flex flex-col px-4 gap-4">
            <h1>Projects</h1>
            <ProjectCards />
          </div>
        </div>
      </div>
    </>
  );
}
