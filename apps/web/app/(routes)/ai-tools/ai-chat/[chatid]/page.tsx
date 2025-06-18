"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { EmptyState } from "../_components/EmptyState";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";

// Define the message type once
type Message = {
  role: "user" | "assistant";
  content: string;
};

function AiChat() {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatid = useParams();
  console.log(chatid);

  const onSend = async () => {
    if (!userInput?.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: userInput.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const result = await axios.post("/api/ai-career-chat-agent", {
        userInput: userInput.trim(),
      });

      if (result.status === 200) {
        const cleanedContent = result.data.result.replace(/\n{3,}/g, "\n\n");
        const assistantMessage: Message = {
          role: "assistant",
          content: cleanedContent || "Sorry, no response.",
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (e) {
      console.error("API error", e);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48 py-10 flex flex-col gap-6 h-full">
      <div>
        <h1 className="text-2xl font-bold mb-3">AI Career Q&A Chat</h1>
        <p className="text-gray-600 mb-3">
          Ask questions about AI careers and get expert advice.
        </p>
        <Button>+ Chat</Button>
      </div>

      <div className="flex flex-col gap-2 mt-4 overflow-y-auto">
          {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
            msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800 self-start mr-auto"
          }`}
  >
    {msg.role === "assistant" ? (
      <div className="prose max-w-none">
        <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="mb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mb-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-base font-semibold mb-1" {...props} />,
        }}
      >
        {msg.content}
      </ReactMarkdown>
       </div> 
    ) : (
      msg.content
    )}
  </div>
))}
</div>


        <div className="flex items-center gap-2 justify-between mt-4">
          <Input
            placeholder="Type here..."
            className="flex-1"
            autoFocus
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend();
            }}
          />
          <Button onClick={onSend} disabled={loading}>
            <Send />
          </Button>
        </div>
      </div>
  );
}

export default AiChat;
