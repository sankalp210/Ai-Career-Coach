import { gemini } from "inngest";
import { inngest } from "./client";
import { createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const AiCareerChatAgent = createAgent({
  name: "AiCareerChatAgent",
  description: "An agent that helps with career-related questions using AI.",
  system: `You are an AI career coach. Your job is to help users with their career-related questions and provide guidance on job searching, resume building, interview preparation, and career development. You should be friendly, professional, and provide actionable advice.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiCareerAgent = inngest.createFunction(
  { id: "AiCareerAgent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const { userInput } = event.data;
    const result = await AiCareerChatAgent.run(userInput);
    return result;
  },
);
