import { NextRequest } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import { pollRunOutput } from "../../../../../packages/shared/lib/aiCareer";

export async function POST(req: NextRequest) {
  try {
    const FormData = await req.formData();
    const resumeFile = FormData.get("resumeFile") as File;
    const recordId = FormData.get("recordId") as string;

    if (!resumeFile || !recordId) {
      return new Response(JSON.stringify({ error: "Missing file or record ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Load PDF text using WebPDFLoader
    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();

    // Convert to base64
    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Send input to inngest
    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId: recordId,
        base64ResumeFile: base64,
        pdfText: docs[0]?.pageContent,
      },
    });

    // Extract runId
    const runId = Array.isArray(resultIds)
      ? resultIds[0]?.id
      : resultIds?.ids?.[0];

    if (!runId) {
      return new Response("Run ID not found", { status: 500 });
    }

    // Poll for output
    let output: string | null = null;
    try {
      output = await pollRunOutput(
        runId,
        process.env.INNGEST_SERVER_HOST!,
        process.env.INNGEST_SIGNING_KEY!
      );
    } catch (e) {
      console.error("Polling error:", e);
      return new Response(
        JSON.stringify({ error: "Polling timed out or failed." }),
        { status: 504, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!output) {
      return new Response(
        JSON.stringify({ error: "No assistant response received." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ result: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("API Error:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
