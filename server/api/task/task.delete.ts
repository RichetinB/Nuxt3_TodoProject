import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

        const task = await prisma.tasks.delete({
            where: {
                id: body.id
            }
        })
        return task
    } 
)


