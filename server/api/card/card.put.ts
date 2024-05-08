import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.title != null){
        const card = await prisma.cards.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
            }
        })
        return card
    } else if (body.description != null) {
        const card = await prisma.cards.update({
            where: {
                id: body.id
            },
            data: {
                description: body.description,
            }
        })
        return card
    } else if (body.posX != null && body.posY != null) {
        const card = await prisma.cards.update({
            where: {
                id: body.id
            },
            data: {
                posX: body.posX,
                posY: body.posY
            }
        })
        return card
    } else if (body.color != null) {
        const card = await prisma.cards.update({
            where: {
                id: body.id
            },
            data: {
                color: body.color,
            }
        })
        return card
    }
})


// const card = await prisma.cards.update({
//     where: {
//         id: body.id
//     },
//     data: {
//         title: body.title,
//         description: body.description,
//         posX: body.posX,
//         posY: body.posY,
//         color: body.color
//     }
// })
// return card