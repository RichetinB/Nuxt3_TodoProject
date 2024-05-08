import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const card = await prisma.cards.delete({
        where: {
            id: body.id
        }
    })
    return card
})


