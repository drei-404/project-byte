"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
} from "@/components/ui/card";

const projectItems = [
  {
    image: "/images/courses-and-projects/projects/wordpress-development.webp",
    title: "WordPress Development",
    tags: ["WordPress", "Elementor"],
  },
  {
    image: "/images/courses-and-projects/projects/local-ai-model.webp",
    title: "Building and Running AI Models Locally",
    tags: ["AI", "LLM"],
  },
  {
    image: "/images/courses-and-projects/projects/frontend-development.webp",
    title: "Frontend Development with Vite + React",
    tags: ["Vite", "React", "TypeScript"],
  },
  {
    image: "/images/courses-and-projects/projects/build-server-environment.webp",
    title: "Building a Functional Server Environment",
    tags: ["Linux Server", "Nginx", "Self Hosted Infrastructure"],
  },
];

export function ProjectCard() {
  return (
    <>
      {projectItems.map((item, index) => {
        return (
          <Card
            key={index}
            className="relative mx-auto w-full max-w-sm pt-0 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 z-30 aspect-video" />
            <img
              src={item.image}
              alt="Project"
              className="relative z-20 aspect-video w-full object-cover"
            />
            <CardContent className="">
              <CardAction></CardAction>
              <h1 className="text-foreground">{item.title}</h1>
              <div className="flex justify-end mt-4 gap-1">
                {item.tags.map((tag, tagIndex) => {
                  return (
                    <Badge key={tagIndex} variant="outline">
                      <span className="font-normal">{tag}</span>
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
