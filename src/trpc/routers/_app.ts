import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  createAI: baseProcedure.input(
    z.object({ 
      text: z.string(),
    }),
  ).query((opts) => {
    return {
      greetings: `hello ${opts.input.text}`
    }
  }),
  hello: baseProcedure.input(
    z.object({
      text: z.string(),
    })
  ).query((opts) => {
    return {
      greetings: `hello ${opts.input.text}`
    }
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;