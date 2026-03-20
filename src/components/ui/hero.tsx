import { ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full items-end justify-center">
      <div
        className="absolute inset-0 h-full bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1920&q=80)",
          backgroundPosition: "bottom",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70" />
      </div>

      <div className="relative z-10 w-full pb-20">
        <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10 flex items-end justify-between text-left">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-sans font-normal text-5xl text-white tracking-tighter md:text-7xl">
              Sustainable Solutions for a Better Future
            </h1>
            <p className="max-w-2xl font-light text-lg text-white/90 md:text-xl">
              Empowering businesses and communities to thrive in a low-carbon
              world through tailored clean energy solutions.
            </p>
          </div>

          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar
                    className="size-12 border-2 border-[#e1fcad] transition-all duration-300"
                    key={i}
                  >
                    <AvatarImage src={`https://i.pravatar.cc/48?img=${i + 10}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex flex-col font-normal text-sm text-white">
                <span className="text-base sm:text-lg">15,000+</span>
                <span>Teams Connected</span>
              </div>
            </div>

            <div className="flex w-fit gap-6">
              <Button
                variant="ghost"
                className="group mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent"
              >
                <span className="rounded-full bg-[#e1fcad] px-6 py-3 text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors">
                  Start a Project
                </span>
                <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-[#e1fcad] p-5 text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors">
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                </div>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
