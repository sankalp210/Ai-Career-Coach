"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation"; // ✅ FIXED
import { useState } from "react";
import ResumeUploadDialog from "./ResumeUploadDialog";

interface AiToolCardProps {
  tool: {
    name: string;
    description: string;
    icon: string;
    path: string;
    button: string;
  };
}

export const AiToolCard: React.FC<AiToolCardProps> = ({ tool }) => {
  const router = useRouter();
  const id = uuidv4();
  const [openResumeUpload, setOpenResumeUpload] = useState(false);

  const onClickButton = async () => {
    if (tool.name === "AI Resume Analyzer") {
      setOpenResumeUpload(true);
      return;
    }

    const result = await axios.post("/api/history", {
      recordId: id,
      content: {
        toolName: tool.name,
        description: tool.description,
        icon: tool.icon,
      },
    });
    console.log("History record created:", result.data);
    router.push(`${tool.path}/${id}`);
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
      <div className="flex items-center">
        <Image
          src={tool.icon}
          alt={tool.name}
          width={48}
          height={48}
          className="w-12 h-12 mr-4 rounded-full"
        />
        <div>
          <h3 className="text-lg text-gray-900 dark:text-white font-semibold">
            {tool.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
          <Button onClick={onClickButton}> {tool.button} </Button>
          <ResumeUploadDialog
            openResumeUpload={openResumeUpload}
            setOpenResumeDialog={setOpenResumeUpload}
            onResumeUploaded={() => router.push(`${tool.path}/${id}`)}
          />
        </div>
      </div>
    </div>
  );
};
