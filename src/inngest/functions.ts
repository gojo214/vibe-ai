import { Agent, openai, createAgent } from '@inngest/agent-kit'
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "Code Agent",
      system: "You are an expert next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets.",
      model: openai({ model: "gpt-4o" , apiKey: process.env.OPENAI_API_KEY })
    })

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    )
    return {
     output
    }
  }
);
