import { ModeToggle } from "@/components/mode-toogle";
import { Navbar } from "@/components/navbar";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* ================ Navbar Section ================ */}
      <LiquidGlassCard
        borderRadius="0px"
        shadowIntensity="none"
        glowIntensity="none"
        className="relevant col-span-2 p-6 bg-background/8 sticky top-0 z-50 w-full"
        draggable={false}
      >
        <div className="flex justify-between sticky top-0 z-20">
          <h1 className="flex items-center text-xl text-[#154091] font-bold">
            <img
              src={"/images/byte-logo-raw-nobg.png"}
              className="h-12 w-12"
              alt="BYTE Logo"
            />
            BYTE
          </h1>

          <div className="flex gap-4 items-center">
            <Navbar />
            <ModeToggle />
          </div>
        </div>
      </LiquidGlassCard>
      {children}
    </>
  );
};

export default Layout;
