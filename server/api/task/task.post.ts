import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    let tasks = null

        tasks = await prisma.tasks.create({
            data: {
                task: "",
                isFinished: false,
                checklistId: body.checklistId
            },
        })

    return {
        tasks
    }
})