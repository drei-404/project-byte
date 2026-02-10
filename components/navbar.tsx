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
    id: "home",
    title: "Home",
    link: "/"
  },
  {
    id: "news",
    title: "News",
    link: "/news"
  },
  {
    id: "organizations",
    title: "Organizations",
    link: "/organizations"
  },
  {
    id: "courses",
    title: "Courses",
    link: "/courses"
  },
  {
    id: "contact-us",
    title: "Contact Us",
    link: "/#footer"
  },
]


export function Navbar() {

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
       {navMenu.map((item) => {

        return (
        <NavigationMenuItem key={item.id} className="transparent">
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