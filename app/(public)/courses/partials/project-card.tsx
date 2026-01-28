"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProjectCard() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-xl overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src="/images/no-image-found.webp"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardContent className="">
        <CardAction>
        </CardAction>
        <h3 className="text-foreground">WordPress Website Design</h3>
        <div className="flex justify-end mt-4">
          <Badge variant="outline"><span className="font-normal">Linux</span></Badge>
        </div>
      </CardContent>
    </Card>
  )
}
