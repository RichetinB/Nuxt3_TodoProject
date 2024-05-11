import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const checklist = await prisma.checklist.delete({
        where: {
            id: body.id
        }
    })

    const tasknull = await prisma.tasks.deleteMany({
        where: {
            checklistId: null
        }
    })
    return checklist
})


