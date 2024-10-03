"use client"
import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
interface  Props {
  aiOutput:string
  setAiOutput: (value: string) => void;
}

const OutputSection = ({aiOutput,setAiOutput}:Props) => {
  const editorRef: any = useRef();
  const [copyStatus, setCopyStatus] = useState(false); 

  useEffect(()=>{
    const  editor = editorRef.current.getInstance();
    editor.setMarkdown(aiOutput);

  },[aiOutput])
  const handleCopy = () => {
    //  const editorInstance = editorRef.current.getInstance();
    // const htmlContent = editorInstance.getHTML(); 
    navigator.clipboard.writeText(editorRef.current.getInstance().getMarkdown()).then(() => {
      setCopyStatus(true); // Set copy status to true on successful copy
      setTimeout(() => {
        setCopyStatus(false); // Reset copy status after 500ms
      }, 500);
    });
  };

  
  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="text-black font-medium text-lg">Your Result</h2>
        <Button  disabled={!aiOutput}  className="flex gap-2 text-black"
        onClick={handleCopy}
        >
           {copyStatus ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copyStatus ? "Copied" : "Copy"}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
       
      />
    </div>
  );
};

export default OutputSection;
