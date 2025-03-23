import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
const llm = new Ollama({
  model: "llama3.2",
  temperature: 0,
  maxRetries: 2,
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const pTemplate = ChatPromptTemplate.fromTemplate(`
    You are an AI Barbie Chatbot. I need you to act like Barbie and answer the following messages in a Barbie-like manner.
    Mesasges: {message}`);
  const formattedPrompt = await pTemplate.format({ message: prompt });

  const response = await llm.stream(formattedPrompt);

  // return NextResponse.json({
  //   message: response,
  // }, {
  //   status: 200,
  // })
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
        );
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
