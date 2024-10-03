"use client";
import templates from "@/data/templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import PuffLoader from "react-spinners/PuffLoader";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

const TemplateListSection = ({ userSearchInput }: any) => {
  const [templateList, setTemplateList] = useState(templates);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the search input changes
    const timer = setTimeout(() => {
      if (userSearchInput) {
        const filterData = templates.filter((item) =>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setTemplateList(filterData);
      } else {
        setTemplateList(templates);
      }
      setIsLoading(false); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [userSearchInput]);

  return (
    <div className="p-10 bg-slate-100">
      {isLoading ? (
       
        <div className="flex justify-center items-center h-32">
          <PuffLoader />
        </div>
      ) : templateList.length > 0 ? (
    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {templateList.map((item: TEMPLATE, index: number) => (
            <TemplateCard {...item} key={index} />
          ))}
        </div>
      ) : (
     
        <div className="text-center text-gray-500">
          <p>No templates found 😁😁 {userSearchInput}</p>
        </div>
      )}
    </div>
  );
};

export default TemplateListSection;
