import { inngest } from "@/inngest/client";
import { pollRunOutput } from "../../../../../packages/shared/lib/aiCareer";

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();

    // Send input to inngest
    const resultIds = await inngest.send({
      name: "AiCareerAgent",
      data: { userInput },
    });

    // Extract runId from result
    const runId = Array.isArray(resultIds)
      ? resultIds[0]?.id
      : resultIds?.ids?.[0];

    if (!runId) {
      return new Response("Run ID not found", { status: 500 });
    }

    // Poll for output (with timeout protection)
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
        { status: 504 }
      );
    }

    if (!output) {
      return new Response(
        JSON.stringify({ error: "No assistant response received." }),
        { status: 502 }
      );
    }

    // Return final result
    return new Response(JSON.stringify({ result: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("API Error:", e);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
