import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const card = await prisma.cards.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            description: body.description,
            posX: body.posX,
            posY: body.posY,
            color: body.color
        }
    })
    return card
})