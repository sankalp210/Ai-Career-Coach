// apps/web/app/api/ai-career-chat-agent/route.tsx

import { inngest } from "@/inngest/client";
import { pollRunOutput } from '../../../../../packages/shared/lib/aiCareer'

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();

    const resultIds = await inngest.send({
      name: "AiCareerAgent",
      data: { userInput },
    });

    const runId = Array.isArray(resultIds) ? resultIds[0]?.id : resultIds?.ids?.[0];
    if (!runId) return new Response("Run ID not found", { status: 500 });

    const output = await pollRunOutput(runId, process.env.INNGEST_SERVER_HOST!, process.env.INNGEST_SIGNING_KEY!);

    return new Response(JSON.stringify({ result: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
