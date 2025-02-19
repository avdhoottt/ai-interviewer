import { createLLM } from "../llm/setup";

export class InterviewAgent {
  private static instances: Map<string, InterviewAgent> = new Map();
  private memory: Array<{ role: string; content: string }> = [];
  private context: any;
  private llm: any;

  private constructor(context: any) {
    this.context = context;
    this.llm = createLLM();
  }

  static getInstance(context: any): InterviewAgent {
    const contextKey = JSON.stringify(context);
    if (!InterviewAgent.instances.has(contextKey)) {
      InterviewAgent.instances.set(contextKey, new InterviewAgent(context));
    }
    return InterviewAgent.instances.get(contextKey)!;
  }

  private async generateQuestion(): Promise<string> {
    const basePrompt = `You are an expert technical interviewer for ${
      this.context.role
    } positions.
Current context: Role - ${this.context.role}, Experience - ${
      this.context.yearsOfExperience
    } years
Skills required: ${this.context.keySkills}

Previous conversation:
${this.memory.map((m) => `${m.role}: ${m.content}`).join("\n")}

Generate a relevant technical interview question based on the context and previous responses. The question should be specific and focused on assessing technical skills.`;

    const response = await this.llm.invoke(basePrompt);
    return response;
  }

  private async generateFeedback(response: string): Promise<string> {
    const lastQuestion =
      this.memory.findLast((m) => m.role === "interviewer")?.content || "";

    const feedbackPrompt = `You are an expert technical interviewer for ${this.context.role} positions.
Current context: Role - ${this.context.role}, Experience - ${this.context.yearsOfExperience} years
Skills required: ${this.context.keySkills}

Question asked: ${lastQuestion}
Candidate's response: ${response}

Provide constructive feedback on the response. Include:
1. Technical accuracy
2. Clarity of explanation
3. Specific improvements if needed
Keep the feedback concise and actionable.`;

    const feedback = await this.llm.invoke(feedbackPrompt);
    return feedback;
  }

  async processResponse(response: string) {
    try {
      let feedback = null;

      if (response) {
        this.memory.push({ role: "candidate", content: response });

        const feedbackContent = await this.generateFeedback(response);
        feedback = feedbackContent;
        this.memory.push({ role: "feedback", content: feedbackContent });
      }
      const question = await this.generateQuestion();
      this.memory.push({ role: "interviewer", content: question });

      return {
        feedback,
        question,
      };
    } catch (error) {
      console.error("Error in InterviewAgent:", error);
      throw error;
    }
  }
}
