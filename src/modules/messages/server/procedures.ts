import { inngest } from "@/inngest/client";
import { client } from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, { message: "Project ID is required" }),
      })
    )
    .query(async ({ input }) => {
      const messages = await client.message.findMany({
        where: {
          projectId: input.projectId,
        },
        include: {
          fragment: true
        },
        orderBy: {
          updatedAt: "asc",
        },
      });

      return messages;
    }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "value is required" }).max(10000, {
          message: "value is too long",
        }),
        projectId: z.string().min(1, { message: "Project ID is required" }),
      })
    )
    .mutation(async ({ input }) => {
      const newMessages = await client.message.create({
        data: {
          projectId: input.projectId,
          content: input.value,
          role: "USER",
          type: "RESULT",
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
        },
      });

      return newMessages;
    }),
});
