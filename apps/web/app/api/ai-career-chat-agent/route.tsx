// // import { inngest } from "@/inngest/client";
// // import axios from "axios";

// // console.log("🔔 /api/ai-career-chat-agent HIT");


// // export async function POST(req: Request) {
// //   try {
// //     const { userInput } = await req.json();

// //     const resultIds = await inngest.send({
// //       name: "AiCareerAgent",
// //       data: {
// //         userInput: userInput,
// //       },
// //     });
// //     console.log("Result IDs:", resultIds);

// //     const runId =
// //       Array.isArray(resultIds) && resultIds.length > 0
// //         ? resultIds[0]?.id
// //         : undefined;

// //     if (!runId) {
// //       return new Response(
// //         JSON.stringify({ error: "Failed to retrieve runId." }),
// //         { status: 500 }
// //       );
// //     }

// //     let runStatus;
// //     while (true) {
// //       const run = await getRuns(runId);
// //       runStatus = run.status;

// //       if (runStatus?.data[0]?.status === "completed") {
// //         const output = runStatus?.data[0]?.output;
// //         return new Response(JSON.stringify({ result: output }), {
// //           status: 200,
// //           headers: { "Content-Type": "application/json" },
// //         });
// //       }

// //       // Wait before polling again
// //       await new Promise((resolve) => setTimeout(resolve, 500));
// //     }
// //   } catch (err) {
// //     console.error("API Error:", err);
// //     return new Response(
// //       JSON.stringify({ error: "Internal Server Error" }),
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function getRuns(runId: string) {
// //   const result = await axios.get(
// //     `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
// //     {
// //       headers: {
// //         Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
// //       },
// //     }
// //   )
// //   return result.data;
// // }

// // 

// import { inngest } from "@/inngest/client";
// import axios from "axios";

// export async function POST(req: any) {
//   const { userInput } = await req.json();

//   const resultIds = await inngest.send({
//     name: 'AiCareerAgent',
//     data: {
//       userInput: userInput
//     }
//   });

//   const runId = resultIds.ids[0];

//   let runStatus;
// while (true) {
//   runStatus = await getRuns(runId);
//   if (runStatus?.data[0].status === 'Completed') {
//     break;
//   }

//   await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before next poll
// }

// }

// export async function getRuns(runId: string) {
//   const result = await axios.get(process.env.INNGEST_SERVER_HOST+'v1/events/'+{runId}+'/runs',
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
//       },
//     }
//   )
//   return result.data;
// }

import { inngest } from "@/inngest/client";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();
    console.log("📥 userInput:", userInput);

    const resultIds = await inngest.send({
      name: "AiCareerAgent",
      data: { userInput }
    });
    console.log("🚀 resultIds:", resultIds);

    const runId = Array.isArray(resultIds) ? resultIds[0]?.id : resultIds?.ids?.[0];
    console.log("🆔 runId:", runId);

    if (!runId) {
      return new Response(JSON.stringify({ error: "Failed to retrieve runId." }), { status: 500 });
    }

    let runStatus;
    while (true) {
      runStatus = await getRuns(runId);
      console.log("📡 runStatus:", runStatus?.data[0]);

      if (runStatus?.data[0]?.status === 'Completed' || runStatus?.data[0]?.status === 'completed') {
        const output = runStatus.data[0].output;
        return new Response(JSON.stringify({ result: output }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (err) {
    console.error("❌ API Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

async function getRuns(runId: string) {
  const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      "Content-Type": "application/json"
    }
  });
  return result.data;
}
