import { inngest } from "@/inngest/client";
import { client } from "@/lib/prisma";
import { generateSlug } from "random-word-slugs";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const projects = await client.project.findMany({
      orderBy: {
        updatedAt: "asc",
      },
    });

    return projects;
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "value is required" }).max(10000, {
          message: "value is too long",
        }),
      })
    )
    .mutation(async ({ input }) => {
      const createdProjects = await client.project.create({
        data: {
          name: generateSlug(2, { format: "kebab"}),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT"
            }
          }
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProjects.id,
        },
      });

      return createdProjects;
    }),
});
