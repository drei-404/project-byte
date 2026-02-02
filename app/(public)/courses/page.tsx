import Link from "next/link";
import CourseCard from "./partials/course-card";
import { ProjectCard } from "./partials/project-card";

export default function page() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-300 flex-col items-start justify-center gap-10 pb-12 ">
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex flex-col text-center gap-4">
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="px-20">
              This course provides an introduction to the concepts, theories and
              components that serve as the bases for the design of classical and
              modern operating systems. Topics include process and memory
              management, process synchronization and file management.
            </p>
          </div>
          <Link
            href="/#footer"
            className="group inline-flex items-center gap-2 rounded-xl border px-6 py-3 w-fit font-medium transition-all hover:-translate-y-0.5"
          >
            Apply for BYTE
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
        <div className="container grid grid-cols-3 w-full">
          {/* Courses */}
          <div className="col-span-2 flex flex-col px-4 gap-4 ">
            <CourseCard />
          </div>

          {/* Projects */}
          <div className="container col-span-1 flex flex-col px-4 gap-4 items-center">
            <h1 className="text-2xl font-bold">Projects</h1>
            <ProjectCard />
          </div>
        </div>
      </div>
    </>
  );
}
