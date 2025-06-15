"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { EmptyState } from "./_components/EmptyState";
import { useState } from "react";
import axios from "axios";

function AiChat(){

  const [userInput,setUserInput] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSend = async () => {
  if (!userInput?.trim()) return; // Don't send empty or whitespace-only strings

  setLoading(true);
  try {
    const result = await axios.post('/api/ai-career-chat-agent', {
      userInput: userInput.trim(),
    });

    if (result.status === 200) {
      console.log("Response:", result.data);
    } else {
      console.error("Error:", result.statusText);
    }

  } catch (err) {
    console.error("Request failed:", err);
  } finally {
    setLoading(false);
    setUserInput("");
  }
};




  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48 py-10 flex flex-col gap-6 h-full">
        <div>
          <div>
            <h1 className="text-2xl font-bold mb-3">AI Career Q&A Chat</h1>
            <p className="text-gray-600 mb-3">
              Ask questions about AI careers and get expert advice.
            </p>
          </div>
        <Button>+ Chat</Button>    
        </div> 
        <div className="flex flex-col gap-4 mt-1 h-[calc(87vh-200px)]">
          <div>

          </div>
          <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-gray-50">
            <EmptyState selectedQuestion={(question: string) => setUserInput(question)} />
          </div>
          <div className="flex items-center gap-2 justify-between mt-4">
            <Input placeholder="Type Here..." className="flex-1"
            autoFocus 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            />
            <Button onClick={onSend} disabled={loading}><Send /></Button>
          </div>
        </div>

    </div>
  );
}

export default AiChat;