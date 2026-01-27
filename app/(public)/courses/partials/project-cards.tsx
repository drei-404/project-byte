"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProjectCards() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-xl overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src="/images/no-image-found.webp"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
      </CardHeader>
      <CardFooter className="justify-end">
        <Badge variant="outline">Linux</Badge>
      </CardFooter>
    </Card>
  )
}
