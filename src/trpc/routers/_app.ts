import { client } from '@/lib/prisma';
import { baseProcedure, createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/procedures';

export const appRouter = createTRPCRouter({
  message: messagesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;