"use client";

export default function LatestNews() {
  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-screen flex-col items-center justify-center gap-4 px-8 py-20 border">
        <div className="flex flex-col gap-4 items-center mb-12">
          <h1 className="text-6xl font-extrabold text-[#154091] text-shadow-lg">
            Latest <span className="text-[#edd153]">News</span>
          </h1>
        </div>

        <div className="relative flex justify-center bg-[#b6c4dd]/70 h-50 w-80 -rotate-2 border-[#dce2ef] rounded-2xl">
          <div className="h-12 w-20 transition-colors bg-white/70 text-primary shadow-sm z-10 -m-5" />
        </div>
      </div>
    </>
  );
}
