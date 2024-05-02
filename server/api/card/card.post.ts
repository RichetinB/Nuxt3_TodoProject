import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    let card = null

        card = await prisma.cards.create({
            data: {
                title: body.title,
                description: body.description,
                posY: body.posY,
                posX: body.posX,
                color: body.color,
                roomId: body.roomId
            },
        }).then((response) => {
            card = response
        })
    return {
        card: card
    }
})
