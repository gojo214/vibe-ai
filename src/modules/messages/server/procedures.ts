import { inngest } from '@/inngest/client';
import { client } from '@/lib/prisma'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import z from 'zod'

export const messagesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const messages = await client.message.findMany({
            orderBy: {
                updatedAt: 'asc'
            },
            include: {
                fragment: true
            }
        })

        return messages;
    }),
    create: baseProcedure.input(
        z.object({
            value: z.string().min(1, { message: "Message is required" })
        })
    ).mutation(async ({ input }) => {
        const newMessages = await client.message.create({
            data: {
                content: input.value,
                role: "USER",
                type: "RESULT"
            }
        });


        await inngest.send({
            name: "code-agent/run",
            data: {
                value: input.value
            }
        })

        return newMessages;
    })  
})