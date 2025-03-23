import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
const llm = new Ollama({
  model: "llama3.2",
  temperature: 0,
  maxRetries: 2,
});

export async function POST(req: NextRequest) {
 try{
    const { prompt } = await req.json();
    const pTemplate = ChatPromptTemplate.fromTemplate(`
      You are an AI Barbie Chatbot. I need you to act like Barbie and answer the following messages in a Barbie-like manner.
      Mesasges: {message}`);
    const formattedPrompt = await pTemplate.format({ message: prompt });
  
    const response = await llm.invoke(formattedPrompt);
  
      return NextResponse.json({
          message: response,
          }, {
          status: 200,
      })
    
 }catch(e){
    return NextResponse.json({
        message: "Something went wrong"
    }, {status: 500})
 }
}
