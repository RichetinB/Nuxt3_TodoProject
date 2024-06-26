import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const card = await prisma.cards.delete({
        where: {
            id: body.id
        }
    })

    const checklistnull = await prisma.checklist.deleteMany({
        where: {
            cardsId: null
        }
    })

    const tasknull = await prisma.tasks.deleteMany({
        where: {
            checklistId: null
        }
    })
    return card
})


