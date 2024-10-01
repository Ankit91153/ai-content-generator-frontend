"use client"
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { BookAudioIcon, BookDashedIcon, BookTemplate, ChartColumnBig, ChartColumnStacked } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter()
  return (
    <div>
      <Header />
      <div className="my-10">
        <div className="md:w-[40%] w-full md:mx-auto flex flex-col gap-3 text-center">
          <h1 className="text-3xl text-black font-bold">
            AI Content <span className="text-purple-700">Generator</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            maiores aut iusto, eius dolorem quo accusantium consectetur ad
            
          </p>

          <span>

          <Button onClick={()=>router.push("/dashboard")}>Get Started</Button>
          </span>
        </div>
      </div>

      <div className="container grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mx-auto">
          <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-5">
              <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center"><BookTemplate className="text-white"/></div>
              <h4 className="font-bold">25+ Templated</h4>
              <p className="text-slate-500 italic">Lorem ipsum dolor sit amet. nda andfndf ndfak</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-5">
              <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center"><ChartColumnStacked className="text-white"/></div>
              <h4 className="font-bold">25+ Templated</h4>
              <p className="text-slate-500 italic">Lorem ipsum dolor sit amet. nda andfndf ndfak</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-5">
              <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center"><BookAudioIcon className="text-white"/></div>
              <h4 className="font-bold">25+ Templated</h4>
              <p className="text-slate-500 italic">Lorem ipsum dolor sit amet. nda andfndf ndfak</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-5">
              <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center"><ChartColumnBig className="text-white"/></div>
              <h4 className="font-bold">25+ Templated</h4>
              <p className="text-slate-500 italic">Lorem ipsum dolor sit amet. nda andfndf ndfak</p>
          </div>
      </div>
    </div>
  );
}
