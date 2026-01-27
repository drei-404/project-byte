import { ProjectCards } from "./partials/project-cards";
import { Badge } from "@/components/ui/badge";

export default function page() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-300 flex-col items-start justify-center gap-10 py-12 ">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
        </div>
        <div className="container grid grid-cols-3 w-full">
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
                    <div className="flex justify-between items-start text-lg">
                      Lorem Ipsum Dolor
                    </div>
                    {/* Difficulty */}
                  <div className="text-sm flex items-center mt-2">Beginner</div>
                  {/* Tags */}
                  <div className="flex items-center mt-2">
                    <Badge variant="outline"><span className="font-normal">Linux</span></Badge>
                  </div>
                  </div>

                </div>
                {/* Context */}
                <div className="text-gray-400 text-sm mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, consectetur distinctio tempora rerum minus ipsa totam dolore eos odit error, cumque quia saepe corrupti, ad ea. Commodi ipsam molestiae cum!</div>
            </div>
          </div>

          {/* Projects */}
          <div className="container col-span-1 flex flex-col px-4 gap-4 items-center">
            <h1 className="text-2xl">Projects</h1>
            <ProjectCards />
          </div>
        </div>
      </div>
    </>
  );
}
