import { Ollama } from "@langchain/community/llms/ollama";

export const createLLM = () => {
  return new Ollama({
    baseUrl: "http://localhost:11434",
    model: "mistral",
    callbacks: [
      {
        handleLLMStart(llm: any, prompts: string[]) {
          console.log("LLM Started:", prompts);
        },
        handleLLMEnd(output: any) {
          console.log("LLM Ended:", output);
        },
        handleLLMError(err: Error) {
          console.error("LLM Error:", err);
        },
      },
    ],
  });
};
