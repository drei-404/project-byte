import CourseCard from "./partials/course-card";
import { ProjectCard } from "./partials/project-card";
import { Badge } from "@/components/ui/badge";

export default function page() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-300 flex-col items-start justify-center gap-10 py-12 ">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
        </div>
        <div className="container grid grid-cols-3 w-full">
          {/* Courses */}
          <div className="col-span-2 flex flex-col px-4 gap-4 ">
            <CourseCard />
          </div>

          {/* Projects */}
          <div className="container col-span-1 flex flex-col px-4 gap-4 items-center">
            <h1 className="text-2xl">Projects</h1>
            <ProjectCard />
          </div>
        </div>
      </div>
    </>
  );
}
