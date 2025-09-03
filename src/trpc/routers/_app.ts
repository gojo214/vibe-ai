import { client } from '@/lib/prisma';
import { baseProcedure, createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/procedures';
import { projectsRouter } from '@/modules/projects/server/procedures';

export const appRouter = createTRPCRouter({
  message: messagesRouter,
  projects: projectsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;