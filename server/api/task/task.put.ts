import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.task != null){
        const task = await prisma.tasks.update({
            where: {
                id: body.id
            },
            data: {
                task: body.task,
            }
        })
        return task
    } else if (body.isFinished != null) {
        const task = await prisma.tasks.update({
            where: {
                id: body.id
            },
            data: {
                isFinished: body.isFinished,
            }
        })
        return task
    } 
})
