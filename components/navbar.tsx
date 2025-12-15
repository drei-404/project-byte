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


export function Navbar() {

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem className="transparent">
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent"
          )}>
            <Link href="/about">Home</Link>
          </NavigationMenuLink>

        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent"
          )}>
            <Link href="/about">News</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent"
          )}>
            <Link href="/about">Our Partners</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent"
          )}>
            <Link href="/about">Contact Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}