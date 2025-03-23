'use client';
import ChatBox from "@/components/ChatBox";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  


  return (
    <div className=" bg-barbieBg bg-repeat bg-contain bg-center h-screen w-screen flex flex-col items-center justify-center">
      <ChatBox />
    </div>
  );
}
