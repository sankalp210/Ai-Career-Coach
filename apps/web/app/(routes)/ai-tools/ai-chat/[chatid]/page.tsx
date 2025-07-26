"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface AiChatProps {
  tool: {
    name: string;
    description: string;
    icon: string;
    path: string;
  };
}

function AiChat({tool}: AiChatProps) {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const params = useParams();
  const router = useRouter();
  const chatid = params.chatid as string; // ✅


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

  const updatedMessageList = useCallback(async () => {
  if (!chatid) return;
  try {
    await axios.put("/api/history", {
      content: messages,
      recordId: chatid,
    });
  } catch (err) {
    console.error("Failed to update chat history", err);
  }
}, [messages, chatid]);

const GetMessageList = async () => {
  try {
    const result = await axios.get('/api/history?recordId=' + chatid);
    const content = result.data.content;

    // Ensure messages is an array
    if (Array.isArray(content)) {
      setMessages(content);
    } else {
      setMessages([]); // or setMessages([{ role: "assistant", content: "Start your chat..." }])
    }
  } catch (err) {
    console.error("Failed to fetch messages", err);
    setMessages([]);
  }
};


const onNewChat = async () => {
  const id = uuidv4();
      
        const result = await axios.post('/api/history', {
            recordId: id,
            content: {
                toolName: tool.name,
                description: tool.description,
                icon: tool.icon,
            }});    
            console.log("History record created:", result.data);
            router.replace(`${tool.path}/${id}`);

    }


  useEffect(() => {
    if (chatid) {
      chatid && GetMessageList();
    } 
  }, [chatid]);


  useEffect(() => {
  if (messages.length > 0) {
    updatedMessageList();
  }
}, [messages, updatedMessageList]);


  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48 py-10 flex flex-col gap-6 h-full">
      <div>
        <h1 className="text-2xl font-bold mb-3">AI Career Q&A Chat</h1>
        <p className="text-gray-600 mb-3">
          Ask questions about AI careers and get expert advice.
        </p>
        <Button onClick={onNewChat}>+ Chat</Button>
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
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5 mb-2" {...props} />
                    ),
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    h1: ({ node, ...props }) => (
                      <h1 className="text-xl font-bold mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-lg font-semibold mb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-base font-semibold mb-1" {...props} />
                    ),
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
