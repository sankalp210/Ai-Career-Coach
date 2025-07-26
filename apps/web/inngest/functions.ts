import { gemini } from "inngest";
import { inngest } from "./client";
import { createAgent } from "@inngest/agent-kit";
import ImageKit from 'imagekit';

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

export const AiResumeAnalyzerAgent = createAgent({
  name : 'AiResumeAnalyzerAgent',
  description: 'AI Resume Analyzer Agent help to Return Report',
  system: `
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format. The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.

INPUT: I will provide a plain text resume.

GOAL: Output a a JSON report as per the schema below. The report should reflect:

overall_score: (0 - 100)

overall_feedback: (short message e.g. "Excellent", "Needs improvement")

summary_comment: (1 - 2 sentence evaluation summary)

Section scores for:

Contact Info

Experience

Education

Skills

Each section should include:

score: (as percentage)

Optional comment about that section

Tips for improvement (3-5 tips)

What's Good (1-3 strengths)

Needs improvement (1-3 weaknesses)

Output JSON Schema:

JSON

{
  "overall_score": 85,
  "overall_feedback": "Excellent",
  "summary_comment": "Your resume is strong, but there are areas to refine.",
  "sections": {
    "contact_info": {
      "score": 90,
      "comment": "Perfectly structured and complete."
    },
    "experience": {
      "score": 88,
      "comment": "Strong bullet points and impact."
    },
    "education": {
      "score": 78,
      "comment": "Consider adding relevant coursework."
    },
    "skills": {
      "score": 60,
      "comment": "Expand on specific skill proficiencies."
    }
  },
  "tips_for_improvement": [
    "Quantify achievements and metrics to your experience section to show impact.",
    "Integrate more industry-specific keywords relevant to your target roles.",
    "Start bullet points with strong action verbs to make your achievements stand out."
  ],
  "whats_good": [
    "Clean and professional formatting.",
    "Clear and concise contact information.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Attention to minor detail.",
    "Some experience bullet points could be stronger.",
    "Missing a professional summary/objective."
  ]
}






`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_kEY
  })
})

export const AiCareerAgent = inngest.createFunction(
  { id: "AiCareerAgent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const { userInput } = event.data;
    const result = await AiCareerChatAgent.run(userInput);
    return result;
  },
);

var imagekit = new ImageKit({
  //@ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  //@ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  //@ts-ignore
  urlEndpoint : process.env.IMAGEKIT_ENDPOINT_URL
});

export const AiResumeAgent = inngest.createFunction(
  { id: "AiResumeAgent" },
  { event: "AiResumeAgent" },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText } = event.data;

    const uploadImageUrl = await step.run("uploadImage", async () => {
      try {
        const imageKitFile = await imagekit.upload({
          file: base64ResumeFile,
          fileName: `${Date.now()}.pdf`,
          isPublished: true,
        });

        return imageKitFile.url;
      } catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw new Error("Failed to upload file to ImageKit.");
      }
    });

    const aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
    // @ts-ignore
    const rawContent = aiResumeReport.output[0].content;
    const rawContentJson = rawContent.replace('```json','').replace('```','');
    const parseJson = JSON.parse(rawContentJson);
    return parseJson;
  }
);


   
