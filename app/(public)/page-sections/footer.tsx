"use client";

import { AnimatedTooltip } from "../../../components/ui/animated-tooltip";
import { Facebook, Mail, Smartphone } from "lucide-react";

const partners = [
  {
    id: 1,
    name: "DOST",
    designation: "Lead agency; funds and oversees.",
    image: "images/partners-logo/dost-logo.webp",
  },
  {
    id: 2,
    name: "PROCESS-Bohol",
    designation: "Community partner; supports outreach and participation.",
    image: "images/partners-logo/process-bohol-logo.jpg",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="container mx-auto px-6 pb-8 pt-12 md:pb-2 ">
        <div className="grid gap-8 pb-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-2xl font-bold">Our Partners</span>
              <p className="text-xs leading-relaxed text-foreground sm:text-sm">
                Working together with partners to create meaningful
                opportunities through technology.
              </p>
            </div>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
              <AnimatedTooltip items={partners} />
            </div>
          </div>

          <div className="hidden lg:block"></div>

          <div id="contact" className="flex flex-col space-y-6">
            <h3 className="text-2xl font-medium">
              Contact Us <span className="text-[#edd153]">Here!</span>
            </h3>
            <p className="text-xs leading-relaxed text-foreground sm:text-sm">
              Aspiring BYTE participants may apply through the provided channel
              and contact us here for further details and support.
            </p>
            <div className="">
              <a href="mailto:support@ishare.com.ph">
                <div className="relative flex flex-row gap-4 text-[#154091] hover:text-[#0d2657] dark:hover:text-[#dce2ef]">
                  <Mail className="h-4 w-4 mt-1.5" />
                  <span className="font-medium">support@ishare.com.ph</span>
                </div>
              </a>
              <a href="tel:+639178794554">
                <div className="relative flex flex-row gap-4 text-[#154091] hover:text-[#0d2657] dark:hover:text-[#dce2ef]">
                  <Smartphone className="h-4 w-4 mt-1.5" />
                  <span className="font-medium">+63 917-8794-554</span>
                </div>
              </a>
            </div>
            <a href="https://www.facebook.com/cvisnet" className="w-fit">
              <div className="border-2 border-[#154091] w-fit rounded-full p-2 text-white bg-[#154091]/70 hover:bg-[#dce2ef] hover:border-[#b6c4dd] hover:text-[#b6c4dd]! z-10">
                <Facebook className="h-6 w-6" />
              </div>
            </a>
          </div>
        </div>

        {/* ---------------- Copyright Section ---------------- */}

        <hr className="mt-12 hidden border-t border-dashed border-gray-200 pt-4 sm:block" />
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <p className="text-xs text-muted-foreground/60 sm:text-sm pb-2">
            Copyright © 2025 - Project BYTE
          </p>
        </div>
      </div>
    </footer>
  );
}
