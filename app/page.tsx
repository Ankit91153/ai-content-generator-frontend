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
           
          The AI Content Generator creates high-quality written content automatically based on user input and topics provided.            
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
              <p className="text-slate-500 italic">Access over 25 professionally designed content templates.</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-5">
              <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center"><ChartColumnStacked className="text-white"/></div>
              <h4 className="font-bold">10,000 Words Free</h4>
              <p className="text-slate-500 italic">Generate up to 10,000 words at no cost.</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-5">
              <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center"><BookAudioIcon className="text-white"/></div>
              <h4 className="font-bold">Optimize Content</h4>
              <p className="text-slate-500 italic">Enhance your content for better engagement and SEO.</p>
          </div>
          <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-5">
              <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center"><ChartColumnBig className="text-white"/></div>
              <h4 className="font-bold"> Easy to Use</h4>
              <p className="text-slate-500 italic">User-friendly interface for seamless content generation.</p>
          </div>
      </div>
    </div>
  );
}
