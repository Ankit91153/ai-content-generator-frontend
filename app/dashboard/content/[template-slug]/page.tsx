"use client";
import React, { useContext, useEffect, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_component/TemplateListSection";
import templates from "@/data/templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie
// import { TotalUsageContext } from "@/app/(store)/store";
import { toast } from "react-toastify";
import { useStore } from "@/store/store";
import { AI_CONTENT_GENERATOR } from "@/data/constant";
import { isTokenExpired } from "../../layout";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const Content = (props: PROPS) => {
  const token = Cookies.get("token");
  const router = useRouter();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<any>("");
  // const {totelUsage,setTotelUsage}=useContext(TotalUsageContext)
  const totelUsage = useStore((state) => state.totelUsage);
  const setTotelUsage = useStore((state) => state.setTotelUsage);
  const user = useStore((state) => state.user);

  const selectedTemplate: TEMPLATE | undefined = templates?.find(
    (item) => item?.slug === props?.params["template-slug"]
  );

  const GenerateAIContent = async (formData: any) => {
    if (totelUsage >= 10000 && !user.active) {
      toast.warning("Now you need upgrade  your plan to use this feature");
      router.push("/dashboard/billing");
      return;
    }
    setLoading(true);

    const selectPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + "," + selectPrompt;

    const result = await chatSession.sendMessage(FinalAIPrompt);
    const output = await result.response.text();

    setAiOutput(output);

    await SaveDv(formData, selectedTemplate?.slug, output);

    setLoading(false);
  };

  const SaveDv = async (formData: any, slug: any, aiOutput: any) => {
    const data = {
      aiResponse: aiOutput,
      templateSlugName: slug,
      formData: formData,
      userId: user._id,
    };
    const totalWords = aiOutput.split(/\s+/).length;
    try {
      if (isTokenExpired(token)) {
        router.push("/signin");
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${AI_CONTENT_GENERATOR}`,
        data,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      

      if (!user.active) {
        const newTotalUsage = (totelUsage || 0) + totalWords;
        setTotelUsage(newTotalUsage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10 bg-slate-100">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* FormSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(value: any) => GenerateAIContent(value)}
          loading={loading}
        />
        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} setAiOutput={setAiOutput} />
        </div>
      </div>
    </div>
  );
};

export default Content;
