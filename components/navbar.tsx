"use client"

import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

const navMenu = [
  {
    title: "Home",
    link: "/"
  },
  {
    title: "News",
    link: "/news"
  },
  {
    title: "Courses",
    link: "/courses"
  },
  {
    title: "Contact Us",
    link: "/#footer"
  },
]


export function Navbar() {

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
       {navMenu.map((item, index) => {

        return (
        <NavigationMenuItem key={index} className="transparent">
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent"
          )}>
            <Link href={item.link}>{item.title}</Link>
          </NavigationMenuLink>

        </NavigationMenuItem>
        );
        })}

      </NavigationMenuList>
    </NavigationMenu>
  )
}